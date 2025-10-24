const TARGET_MARKETPLACE_URL = 'https://www.mercadolivre.com.br/';
const INITIAL_COUNTDOWN_SECONDS = 5;

document.addEventListener('DOMContentLoaded', () => {
  const redirectButton = document.getElementById('go-to-ml');
  const countdownLabel = document.getElementById('redirect-countdown');
  let remainingSeconds = INITIAL_COUNTDOWN_SECONDS;
  let hasNavigated = false;

  const goToMarketplace = () => {
    if (hasNavigated) {
      return;
    }
    hasNavigated = true;
    try {
      window.location.href = TARGET_MARKETPLACE_URL;
    } catch (error) {
      window.open(TARGET_MARKETPLACE_URL, '_self');
    }
  };

  if (redirectButton) {
    redirectButton.addEventListener('click', (event) => {
      event.preventDefault();
      goToMarketplace();
    });
  }

  const updateCountdown = () => {
    if (!countdownLabel) {
      return;
    }
    countdownLabel.textContent = String(Math.max(0, remainingSeconds));
  };

  updateCountdown();

  const intervalId = window.setInterval(() => {
    remainingSeconds -= 1;
    updateCountdown();

    if (remainingSeconds <= 0) {
      window.clearInterval(intervalId);
      goToMarketplace();
    }
  }, 1000);
});