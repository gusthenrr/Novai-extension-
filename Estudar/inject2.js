const AUTH_STATE_EVENT = 'NovaiAuthState';
const AUTH_UPDATE_EVENT = 'NovaiAuthTokensUpdated';
const AUTH_REQUEST_EVENT = 'NovaiRequestAuthState';

function dispatchNovaiAuthState(detail) {
    try {
        document.dispatchEvent(new CustomEvent(AUTH_STATE_EVENT, { detail }));
    } catch (error) {
        console.warn('NOVAI: falha ao propagar estado de autenticação', error);
    }
}

function injectScript(file_path, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
}

function asyncInjectScript(file_path, tag) {
    return new Promise((resolve, reject) => {
        var node = document.getElementsByTagName(tag)[0];
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', file_path);
        script.onload = resolve; // Resolve the promise when the script is loaded
        script.onerror = reject; // Reject the promise if the script fails to load
        node.appendChild(script);
    });
}


function dispatchResponseToPage(response) {
    // If the response has a payload, dispatch that, otherwise dispatch the whole response.
    const detail = response;
    document.dispatchEvent(new CustomEvent('MetrifyExtensionResponse', { detail }));
}

function requestBackgroundAuthState() {
    try {
        chrome.runtime.sendMessage({ type: 'GET_AUTH_TOKENS' }, (response) => {
            if (chrome.runtime.lastError) {
                console.warn('NOVAI: não foi possível sincronizar tokens com o background.', chrome.runtime.lastError.message);
                return;
            }
            if (response) {
                dispatchNovaiAuthState({ ...response, source: 'background' });
            }
        });
    } catch (error) {
        console.warn('NOVAI: erro ao solicitar tokens ao background', error);
    }
}

document.addEventListener(AUTH_UPDATE_EVENT, (event) => {
    const detail = event?.detail || {};
    const accessToken = detail.accessToken;
    const refreshToken = detail.refreshToken;
    if (!accessToken && !refreshToken) {
        return;
    }

    try {
        chrome.runtime.sendMessage({
            type: 'SET_AUTH_TOKENS',
            accessToken,
            refreshToken,
            ttl: detail.ttl,
        });
    } catch (error) {
        console.warn('NOVAI: não foi possível encaminhar tokens para o background', error);
    }
});

document.addEventListener(AUTH_REQUEST_EVENT, () => {
    requestBackgroundAuthState();
});

requestBackgroundAuthState();

// Function to handle sending messages to the background service worker safely
function sendMessageToBackground(message) {
    chrome.runtime.sendMessage(message, function (response) {
        if (!chrome.runtime.lastError) {
            //console.log("Response from background:", response);
            dispatchResponseToPage(response);
        }
    });
}


// Listen for custom events from the web page and send them to the background service worker
document.addEventListener('MetrifyExtension', function (event) {
    sendMessageToBackground(event.detail);
});

document.addEventListener('StoreProductData', function(event) {
    const detail = event.detail;
    if (!detail || typeof detail.itemId !== 'string' || !detail.itemId.trim()) {
        return;
    }
    chrome.runtime.sendMessage({ type: 'STORE_PRODUCT_DATA', payload: detail });
});

document.addEventListener('GetProductData', function(event) {
    const detail = event.detail;
    if (!detail || typeof detail !== 'object') {
        return;
    }
    chrome.runtime.sendMessage({ type: 'GET_PRODUCT_DATA', payload: detail }, (response) => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            return;
        }
        if (response && response.data) {
            document.dispatchEvent(new CustomEvent('ProductDataResponse', { detail: response.data }));
        }
    });
});

document.addEventListener('StoreCategoryData', function(event) {
    chrome.runtime.sendMessage({ 
        type: 'STORE_CATEGORY', 
        categoryId: event.detail.categoryId,
        categoryData: event.detail.categoryData 
    });
});

document.addEventListener('GetCategoryData', function(event) {
    chrome.runtime.sendMessage({ 
        type: 'RETRIEVE_CATEGORY', 
        categoryId: event.detail.categoryId 
    }, (response) => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            return;
        }
        document.dispatchEvent(new CustomEvent('CategoryDataResponse', { 
            detail: { 
                categoryId: event.detail.categoryId,
                categoryData: response ? response.categoryData : null 
            } 
        }));
    });
});

document.addEventListener('StoreVisitsData', function(event) {
    // console.log("StoreVisitsData event received:", event.detail);
    chrome.runtime.sendMessage({ 
        type: 'STORE_VISITS', 
        itemId: event.detail.itemId,
        visitsData: event.detail.visitsData 
    }, (response) => {
        // console.log("StoreVisitsData response:", response);
        if (chrome.runtime.lastError) {
            console.error("StoreVisitsData error:", chrome.runtime.lastError.message);
        }
    });
});

document.addEventListener('GetVisitsData', function(event) {
    // console.log("GetVisitsData event received:", event.detail);
    chrome.runtime.sendMessage({ 
        type: 'RETRIEVE_VISITS', 
        itemId: event.detail.itemId 
    }, (response) => {
        // console.log("GetVisitsData response:", response);
        if (chrome.runtime.lastError) {
            console.error("GetVisitsData error:", chrome.runtime.lastError.message);
            // Dispatch response with null data on error
            document.dispatchEvent(new CustomEvent('VisitsDataResponse', { 
                detail: { 
                    itemId: event.detail.itemId,
                    visitsData: null 
                } 
            }));
            return;
        }
        document.dispatchEvent(new CustomEvent('VisitsDataResponse', { 
            detail: { 
                itemId: event.detail.itemId,
                visitsData: response ? response.visitsData : null 
            } 
        }));
    });
});

document.addEventListener('RequestDataEvent', function(event) {
    chrome.runtime.sendMessage(event.detail, (response) => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            // Optionally, dispatch a response event indicating failure
            if (event.detail.responseEvent) {
                document.dispatchEvent(new CustomEvent(event.detail.responseEvent, { detail: { success: false, error: chrome.runtime.lastError.message } }));
            }
            return;
        }
        // If a response event name is provided in the original request, dispatch it with the response
        if (event.detail.responseEvent) {
            response.success ?
                document.dispatchEvent(new CustomEvent(event.detail.responseEvent, { detail: { success: true, data: response.data } })) :
                document.dispatchEvent(new CustomEvent(event.detail.responseEvent, { detail: { success: false, error: response.error } }));
        }
    });
});

// Open side panel on custom DOM event from the page
// Listen at the document level (bubbling) for cross-context dispatches
/* document.addEventListener('nvai:openSidebar', function (event) {
    try {
        chrome.runtime.sendMessage({ type: 'OPEN_SIDE_PANEL' });
    } catch (e) {
        // As a fallback, open via command
        chrome.runtime.sendMessage({ type: 'OPEN_SIDE_PANEL' });
    }
}, true); */

// Listen for messages from the background service worker to send back to the web page
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'RESPONSE') {
        dispatchResponseToPage(request);
        } else if (request.type === 'AUTH_TOKENS_UPDATED') {
        dispatchNovaiAuthState({
            accessToken: request.accessToken,
            refreshToken: request.refreshToken,
            ttl: request.ttl,
            source: 'background'
        });
    }
});

// Scrape function to fetch URL content via background script
async function scrape(url, noRedirect = false) {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({
            type: 'FETCH_URL',
            url: url,
            noRedirect: noRedirect
        }, (response) => {
            if (chrome.runtime.lastError) {
                resolve({ error: chrome.runtime.lastError.message });
            } else {
                resolve(response); // response will have {html} or {error}
            }
        });
    });
}

// Scrape function to fetch only script tags from URL (optimized for bandwidth)
async function scrapeScripts(url, noRedirect = false) {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({
            type: 'FETCH_URL',
            url: url,
            noRedirect: noRedirect,
            extractScriptsOnly: true
        }, (response) => {
            if (chrome.runtime.lastError) {
                resolve({ error: chrome.runtime.lastError.message });
            } else {
                resolve(response); // response will have {html: "<script>...</script>...", scriptsOnly: true}
            }
        });
    });
}


// Listen for ScrapeURL DOM event
document.addEventListener('ScrapeURL', async function (event) {
    const { url, idRef, noRedirect } = event.detail;
    
    if (!url) {
        // Return same format as success but with empty html object
        document.dispatchEvent(new CustomEvent('ScrapedURL', { 
            detail: { url, html: {}, idRef } 
        }));
        return;
    }
    
    try {
        const { html, error } = await scrape(url, noRedirect);
        
        if (error) {
            console.error(url, error);
        } else {
            // Dispatch ScrapedURL event with the HTML data
            document.dispatchEvent(new CustomEvent('ScrapedURL', { 
                detail: { url, html, idRef } 
            }));
        }
    } catch (err) {
        console.error('Error during scraping:', err);
    }
});

document.addEventListener('ScrapeScriptsURL', async function (event) {
  const { url, idRef, noRedirect } = event.detail;
  const response = await scrapeScripts(url, noRedirect);
  
  // Dispatch event back to the page with the response
  document.dispatchEvent(new CustomEvent('ScrapedScriptsURL', { 
    detail: { url, response, idRef }
  }));
});

//get version event
let count = 0;
document.addEventListener('NovaiEvent', function (event) {
    var manifestData = chrome.runtime.getManifest();
    if (count < 1) {
        count++;
        document.dispatchEvent(new CustomEvent('NovaiEvent', { detail: manifestData.version }));
    }
});


if (window.location.href.indexOf("https://www.mercadolivre.com.br") == 0 || window.location.href.indexOf("https://mercadolivre.com.br") == 0 || window.location.href.indexOf("https://www.mercadolivre.com.br/anuncie/hub") == 0 || window.location.href.indexOf("https://lista.mercadolivre.com.br") == 0 || window.location.href.indexOf("https://produto.mercadolivre.com.br") == 0) {



    if (window.location.href.indexOf("https://www.mercadolivre.com.br/anuncie/hub") == 0 || window.location.href.indexOf("https://www.mercadolivre.com.br/novidades") == 0 || window.location.href.indexOf("https://www.mercadolivre.com.br/publicar") == 0) {
        //console.log(`fixed`);
        document.addEventListener("load", injectScript(chrome.runtime.getURL('src/libs/dayjs.min.js'), 'body'), false);
    } else {
        document.addEventListener("load", injectScript(chrome.runtime.getURL('src/libs/apexcharts.js'), 'body'), false); //gráfico normal


        //Gráfico de visitas ultimos 6 meses miniatura no card de cada produto
        document.addEventListener("load", injectScript(chrome.runtime.getURL('src/libs/amcharts-index.js'), 'body'), false);//gráfico miniatura
        document.addEventListener("load", injectScript(chrome.runtime.getURL('src/libs/amcharts-micro.js'), 'body'), false);//gráfico miniatura
        document.addEventListener("load", injectScript(chrome.runtime.getURL('src/libs/amcharts-xy.js'), 'body'), false);//gráfico miniatura
        //


        document.addEventListener("load", injectScript(chrome.runtime.getURL('src/libs/range-slider.js'), 'body'), false);//nao sei pra que serve ainda
        document.addEventListener("load", injectScript(chrome.runtime.getURL('src/libs/dayjs.min.js'), 'body'), false);// arquivo importante de data
        
        (async () => {
            await asyncInjectScript(chrome.runtime.getURL('src/libs/popper.min.js'), 'body');
            await asyncInjectScript(chrome.runtime.getURL('src/libs/tippy-bundle.umd.min.js'), 'body');
            await asyncInjectScript(chrome.runtime.getURL('src/eameli.js'), 'body');
        })();
        document.addEventListener('requestnvaiGlobals', function () {
            sendResponseToDOM();
        });
        function sendResponseToDOM() {
            const extensionUrlPath = chrome.runtime.getURL("/");
            const responseEvent = new CustomEvent('responsenvaiGlobals', { detail: { extensionUrlPath } });

            document.dispatchEvent(responseEvent);
        }



    }

}