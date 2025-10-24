const LOGIN_ENDPOINT = 'https://nossopoint-backend-flask-server.com/login-extension';
const TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 dias

function setStatus(message, variant = 'info') {
  const statusEl = document.getElementById('status-message');
  if (!statusEl) return;

  statusEl.textContent = message;
  statusEl.classList.remove('is-error', 'is-success');
  if (variant === 'error') {
    statusEl.classList.add('is-error');
  } else if (variant === 'success') {
    statusEl.classList.add('is-success');
  }
}

function toggleFormDisabled(form, disabled) {
  if (!form) return;
  const submit = form.querySelector('button[type="submit"]');
  if (submit) {
    submit.disabled = disabled;
  }
  form.querySelectorAll('input').forEach((input) => {
    input.disabled = disabled;
  });
}

function sendTokensToBackground(accessToken, refreshToken) {
  return new Promise((resolve, reject) => {
    try {
      chrome.runtime.sendMessage({
        type: 'SET_AUTH_TOKENS',
        accessToken,
        refreshToken,
        ttl: TOKEN_TTL_MS,
      }, (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }
        if (!response || response.success !== true) {
          reject(new Error(response?.error || 'Não foi possível salvar os tokens.'));
          return;
        }
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  if (!form) {
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const email = String(formData.get('email') || '').trim();
    const password = String(formData.get('password') || '');

    if (!email || !password) {
      setStatus('Preencha e-mail e senha para continuar.', 'error');
      return;
    }

    toggleFormDisabled(form, true);
    setStatus('Conectando à NOVAI...', 'info');

    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorMessage = body?.message || body?.error || 'Credenciais inválidas ou serviço indisponível.';
        throw new Error(errorMessage);
      }

      const accessToken = body?.access_token;
      const refreshToken = body?.refresh_token;

      if (!accessToken || !refreshToken) {
        throw new Error('Resposta inválida do servidor. Tente novamente.');
      }

      await sendTokensToBackground(accessToken, refreshToken);
      setStatus('Conta conectada com sucesso! Redirecionando...', 'success');

      window.setTimeout(() => {
        window.location.href = 'welcome.html';
      }, 900);
    } catch (error) {
      console.error('NOVAI: falha durante o login inicial.', error);
      setStatus(error?.message || 'Não foi possível concluir o login. Tente novamente em instantes.', 'error');
      toggleFormDisabled(form, false);
      return;
    }
  });
});