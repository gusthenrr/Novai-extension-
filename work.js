chrome.runtime.onInstalled.addListener(r => {
  if (r.reason == 'install') {
    chrome.tabs.create({
      url: 'bem-vindo.html'
    });
  };
});

// Helper function to stream and limit response text
async function streamLimitedText(response, maxBytes) {
  if (!response.body) {
    // Fallback for environments that don't support streams
    const text = await response.text();
    return text.substring(0, maxBytes);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let result = '';
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      const chunkBytes = new TextEncoder().encode(chunk).length;
      
      if (totalBytes + chunkBytes > maxBytes) {
        // Only add the portion that fits within our limit
        const remainingBytes = maxBytes - totalBytes;
        const limitedChunk = chunk.substring(0, remainingBytes);
        result += limitedChunk;
        console.log(`Reached byte limit, truncating response at ${maxBytes} bytes`);
        break;
      }
      
      result += chunk;
      totalBytes += chunkBytes;
    }
  } finally {
    reader.releaseLock();
  }

  return result;
}

// Simple in-memory cache for script-only fetches
const scriptCache = new Map(); // key: url, value: { scripts, etag, lastModified, timestamp }
const SCRIPT_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
// Deduplicate concurrent FETCH_URL requests for the same resource
const inFlightRequests = new Map(); // key: composed by url+flags, value: { consumers: sendResponse[] }

function getFetchKey(url, noRedirect, extractScriptsOnly) {
  return `${url}|nr:${noRedirect ? '1' : '0'}|s:${extractScriptsOnly ? '1' : '0'}`;
}

// Helper function to extract only script tags from full HTML response
async function streamExtractScripts(response) {
  const html = await response.text();
  return extractScriptsFromHtml(html);
}

function extractScriptsFromHtml(html) {
  const scriptRegex = /<script\b[^>]*>[\s\S]*?<\/script>|<script\b[^>]*\/>/gi;
  const scriptTags = [];
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    scriptTags.push(match[0]);
  }
  return scriptTags;
}

function extractScriptsIncremental(buffer) {
  // Extract complete <script>...</script> tags; keep incomplete tail as remainder
  const scriptRegex = /<script\b[^>]*>[\s\S]*?<\/script>|<script\b[^>]*\/>/gi;
  const scriptTags = [];
  let lastIndex = 0;
  let match;
  while ((match = scriptRegex.exec(buffer)) !== null) {
    scriptTags.push(match[0]);
    lastIndex = scriptRegex.lastIndex;
  }
  const remainder = buffer.slice(lastIndex);
  return { scripts: scriptTags, remainder };
}

// This function stores data using the Chrome Storage API.
function authDataStore(key, value) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + (value.ttl || 3600000), // Default to 1 hour if no TTL provided
  };

  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [key]: JSON.stringify(item) }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error storing data:", chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
}


// This function retrieves data using the Chrome Storage API.
function authDataRetrieve(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], function (result) {
      if (!result[key]) {
        // console.log(`No data found for key: ${key}`);
        resolve(null);
        return;
      }

      const item = JSON.parse(result[key]);
      const now = new Date();

      if (item.value == undefined) {
        resolve(null);
        return;
      }

      if (now.getTime() > item.expiry) {
        // console.log(`Data for key ${key} has expired. Removing...`);
        chrome.storage.local.remove([key], () => resolve(null));
      } else {
        // console.log(`Retrieved data for key: ${key}`, item.value);
        resolve(item.value);
      }
    });
  });
}


// Listening for messages from the content scripts.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received in worker:", request);
  if (request.type === 'STORE') {
    const { key, value } = request;
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + (value.ttl || 3600000), // Default to 1 hour if no TTL provided
    };
    chrome.storage.local.set({ [key]: JSON.stringify(item) }, () => {
      sendResponse({ success: true });
    });
    return true; // Will respond asynchronously
  } else if (request.type === 'RETRIEVE') {
    const { key } = request;
    chrome.storage.local.get([key], (result) => {
      if (result[key]) {
        const item = JSON.parse(result[key]);
        const now = new Date();
        if (now.getTime() < item.expiry) {
          sendResponse({ value: item.value, type: 'RETRIEVE' });
        } else {
          sendResponse({ value: null, type: 'RETRIEVE' });
        }
      } else {
        sendResponse({ value: null, type: 'RETRIEVE' });
      }
    });
    return true; // Will respond asynchronously
  } else if (request.type === 'STORE_CATEGORY') {
    const { categoryId, categoryData } = request;
    const now = new Date();
    const ttl = 60 * 24 * 60 * 60 * 1000; // 60 days in milliseconds
    const item = {
      value: categoryData,
      expiry: now.getTime() + ttl,
    };
    const key = `category_${categoryId}`;
    chrome.storage.local.set({ [key]: JSON.stringify(item) }, () => {
      sendResponse({ success: true });
    });
    return true; // Will respond asynchronously
  } else if (request.type === 'RETRIEVE_CATEGORY') {
    const { categoryId } = request;
    const key = `category_${categoryId}`;
    console.log("RETRIEVE_CATEGORY request for", categoryId, "with key", key);
    chrome.storage.local.get([key], (result) => {
      // console.log("RETRIEVE_CATEGORY storage result:", result);
      if (result[key]) {
        const item = JSON.parse(result[key]);
        const now = new Date();
        console.log("RETRIEVE_CATEGORY item found, checking expiry:", item.expiry, "vs now:", now.getTime());
        if (now.getTime() < item.expiry) {
          // console.log("RETRIEVE_CATEGORY result:", result[key]);
          sendResponse({ categoryData: item.value });
        } else {
          // Data expired, remove it
          console.log("RETRIEVE_CATEGORY expired for", categoryId);
          chrome.storage.local.remove([key]);
          sendResponse({ categoryData: null });
        }
      } else {
        console.log("RETRIEVE_CATEGORY no data found for", categoryId);
        sendResponse({ categoryData: null });
      }
    });
    return true; // Will respond asynchronously
  } else if (request.type === 'AUTH_CHECK') {
    const { key } = request;
    chrome.storage.local.get([key], (result) => {
      if (result[key]) {
        const item = JSON.parse(result[key]);
        const now = new Date();
        if (now.getTime() < item.expiry) {
          sendResponse({ value: item.value, type: 'AUTH_CHECK' });
        } else {
          sendResponse({ value: null, type: 'AUTH_CHECK' });
        }
      } else {
        sendResponse({ value: null, type: 'AUTH_CHECK' });
      }
    });
    return true; // Will respond asynchronously
  } else if (request.type === 'STORE_VISITS') {
    const { itemId, visitsData } = request;
    const now = new Date();
    const ttl = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
    const item = {
      value: visitsData,
      expiry: now.getTime() + ttl,
    };
    const key = `visits_${itemId}`;
    chrome.storage.local.set({ [key]: JSON.stringify(item) }, () => {
      if (chrome.runtime.lastError) {
        console.error(`Error storing visits data for ${itemId}:`, chrome.runtime.lastError);
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
      } else {
        console.log(`Stored visits data for ${itemId}:`, visitsData);
        sendResponse({ success: true });
      }
    });
    return true; // Will respond asynchronously
  } else if (request.type === 'RETRIEVE_VISITS') {
    const { itemId } = request;
    const key = `visits_${itemId}`;
    console.log("RETRIEVE_VISITS request for", itemId, "with key", key);
    chrome.storage.local.get([key], (result) => {
      if (result[key]) {
        const item = JSON.parse(result[key]);
        const now = new Date();
        if (now.getTime() < item.expiry) {
          console.log("RETRIEVE_VISITS result for", itemId, ":", item.value);
          sendResponse({ visitsData: item.value });
        } else {
          // Data expired, remove it
          chrome.storage.local.remove([key]);
          console.log("RETRIEVE_VISITS expired for", itemId);
          sendResponse({ visitsData: null });
        }
      } else {
        console.log("RETRIEVE_VISITS no data found for", itemId);
        sendResponse({ visitsData: null });
      }
    });
    return true; // Will respond asynchronously
  } else if (request.type === 'STORE_PRODUCT_DATA') {
    const { itemId, startTime, itemSales } = request.payload;
    chrome.storage.local.get([itemId], (result) => {
      let itemData = result[itemId] ? JSON.parse(result[itemId]) : {};
      itemData.startTime = startTime;
      itemData.itemSales = itemSales;
      itemData.updated_at = new Date().toISOString();
      chrome.storage.local.set({ [itemId]: JSON.stringify(itemData) }, () => {
        if (chrome.runtime.lastError) {
          console.error(`Error storing product data for ${itemId}:`, chrome.runtime.lastError);
          sendResponse({ success: false, error: chrome.runtime.lastError.message });
        } else {
          // console.log(`Stored product data for ${itemId}:`, itemData);
          sendResponse({ success: true });
        }
      });
    });
    return true; // Will respond asynchronously
  } else if (request.type === 'GET_PRODUCT_DATA') {
    const { itemIds } = request.payload;
    // If itemIds is null or empty, we'll fetch everything.
    const keysToGet = (itemIds && itemIds.length > 0) ? itemIds : null;

    chrome.storage.local.get(keysToGet, (result) => {
        const freshData = {};
        const keysToRemove = [];
        const now = new Date();
        const fortyEightHoursInMillis = 48 * 60 * 60 * 1000;

        for (const itemId in result) {
            // We only want to process keys that are direct properties of the result object.
            if (result.hasOwnProperty(itemId)) {
                let itemData;
                try {
                    // Attempt to parse the stored value.
                    itemData = JSON.parse(result[itemId]);
                } catch (e) {
                    // If it's not valid JSON, it's not our data. Skip it.
                    continue; 
                }

                // Check if this object is one of ours by looking for our specific keys.
                if (itemData && itemData.updated_at && itemData.hasOwnProperty('itemSales')) {
                    const updatedAt = new Date(itemData.updated_at);
                    const isStale = (now.getTime() - updatedAt.getTime()) > fortyEightHoursInMillis;
                    // Determine listing age from startTime if available
                    let creationDays = 0;
                    if (itemData.startTime) {
                        const st = typeof itemData.startTime === 'number' ? itemData.startTime : Date.parse(itemData.startTime);
                        if (!isNaN(st)) {
                            creationDays = Math.floor((now.getTime() - st) / (1000 * 60 * 60 * 24));
                        }
                    }
                    // Align cache retention with front-end rules:
                    // keep if (sales >= 100 && days > 30) OR (sales < 100 && days >= 90) OR (sales < 5 && days > 45)
                    const meetsKeepRule =
                        (itemData.itemSales >= 100 && creationDays > 30) ||
                        (itemData.itemSales < 100 && creationDays >= 90) ||
                        (itemData.itemSales < 5 && creationDays > 45);

                    if (isStale || !meetsKeepRule) {
                        keysToRemove.push(itemId);
                    } else {
                        freshData[itemId] = itemData;
                    }
                }
            }
        }

        if (keysToRemove.length > 0) {
            chrome.storage.local.remove(keysToRemove, () => {
                if (chrome.runtime.lastError) {
                    console.error('Error removing stale product data:', chrome.runtime.lastError);
                } else {
                    console.log('Removed invalid product data for items:', keysToRemove);
                }
            });
        }
        
        // Always send a response, even if it's empty.
        sendResponse({ data: freshData });
    });

    // Return true to indicate we will respond asynchronously.
    return true;
  } else if (request.type === 'REQUEST_DATA') {
    const { url, method, body, headers } = request.payload;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15-second timeout

    const fetchOptions = {
      method: method || 'GET',
      signal: controller.signal,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        ...headers,
      }
    };

    if (method === 'POST' && body) {
      fetchOptions.body = JSON.stringify(body);
      if (!fetchOptions.headers['Content-Type']) {
        fetchOptions.headers['Content-Type'] = 'application/json';
      }
    }

    fetch(url, fetchOptions)
      .then(response => {
        clearTimeout(timeoutId);
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`HTTP ${response.status}: ${response.statusText} - ${text}`);
          });
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        }
        return response.text();
      })
      .then(data => {
        sendResponse({ success: true, data: data });
      })
      .catch(err => {
        clearTimeout(timeoutId);
        console.error(`REQUEST_DATA error for ${method} ${url}:`, err.message);
        sendResponse({ success: false, error: err.message });
      });

    return true; // Will respond asynchronously
  } else if (request.type === 'FETCH_URL') {
    const { url, noRedirect, headers, extractScriptsOnly = false } = request;

    // Short-circuit using in-memory cache for script-only requests when fresh
    if (extractScriptsOnly && scriptCache.has(url)) {
      const cached = scriptCache.get(url);
      const age = Date.now() - (cached.timestamp || 0);
      if (age < SCRIPT_CACHE_TTL_MS && cached.scripts) {
        sendResponse({ scripts: cached.scripts, scriptsOnly: true });
        return false; // response sent synchronously
      }
    }

    // If an identical request is already in-flight, attach to it
    const reqKey = getFetchKey(url, noRedirect, extractScriptsOnly);
    if (inFlightRequests.has(reqKey)) {
      inFlightRequests.get(reqKey).consumers.push(sendResponse);
      return true; // Will respond asynchronously when the first request completes
    }
    inFlightRequests.set(reqKey, { consumers: [sendResponse] });

    // Helper to broadcast the result to all awaiting consumers
    const broadcastAndClear = (payload) => {
      const entry = inFlightRequests.get(reqKey);
      if (entry && entry.consumers && entry.consumers.length) {
        for (const respond of entry.consumers) {
          try { respond(payload); } catch (e) { /* ignore */ }
        }
      }
      inFlightRequests.delete(reqKey);
    };

    // Add a much longer timeout to prevent hanging requests but allow large pages to load
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30-second timeout

    // Simple headers to avoid CORS preflight
    const optimizedHeaders = {
      // Only user agent - other headers can trigger CORS
      'User-Agent': extractScriptsOnly 
        ? 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        : 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
      // Merge with any custom headers
      ...(headers || {})
    };

    // Conditional request headers from cache for script-only
    let conditionalHeaders = {};
    if (extractScriptsOnly && scriptCache.has(url)) {
      const cached = scriptCache.get(url);
      const age = Date.now() - (cached.timestamp || 0);
      if (age < SCRIPT_CACHE_TTL_MS) {
        if (cached.etag) conditionalHeaders['If-None-Match'] = cached.etag;
        if (cached.lastModified) conditionalHeaders['If-Modified-Since'] = cached.lastModified;
      }
    }

    // We no longer need a HEAD request pre-check for script extraction
    fetch(url, {
      // Remove credentials to avoid CORS issues
      redirect: noRedirect ? "manual" : "follow",
      signal: controller.signal,
      headers: { ...optimizedHeaders, ...conditionalHeaders }
    })
      .then(r => {
        clearTimeout(timeoutId);
        console.log(`Fetch response for ${url}: Status ${r.status}, Final URL: ${r.url}, NoRedirect: ${noRedirect}`);

        // If noRedirect is true, return intermediate content even for 301/302
        if (noRedirect) {
          // Return the intermediate page content for 301/302
          if (r.status === 301 || r.status === 302) {
            console.log(`Returning intermediate redirect content for ${url}`);
            return r.text();
          }
        }

        // Check if response is ok (status 200-299) or if it's a redirect that needs manual handling
        if (r.status === 304 && extractScriptsOnly) {
          // Not modified, return cached scripts
          const cached = scriptCache.get(url);
          if (cached && cached.scripts) {
            return cached.scripts;
          }
        }

        if (!r.ok && r.status != 302 && r.status != 301 && r.status != 206 && r.status != 304) { // 206 is partial content
          throw new Error(`HTTP ${r.status}: ${r.statusText}`);
        }

        // For 301/302, check if we got the redirect page or the actual content
        if (r.status === 301 || r.status === 302) {
          const location = r.headers.get('location');
          if (location) {
            console.log(`Manual redirect needed from ${url} to ${location}`);
            // Manually follow the redirect with optimized headers
            return fetch(location, {
              // Remove credentials to avoid CORS issues
              redirect: "follow",
              signal: controller.signal,
              headers: optimizedHeaders
            }).then(redirectResponse => {
              console.log(`Redirect response status: ${redirectResponse.status}`);
              if (!redirectResponse.ok && redirectResponse.status != 206) {
                throw new Error(`HTTP ${redirectResponse.status}: ${redirectResponse.statusText}`);
              }
              // Stream and extract scripts or limit response size
              return extractScriptsOnly 
                ? streamExtractScripts(redirectResponse)
                : r.text(); // For non-script requests, we are no longer limiting bytes
            });
          }
        }

        // Stream and extract scripts or limit response size
        return extractScriptsOnly 
          ? streamExtractScripts(r)
          : r.text(); // For non-script requests, we are no longer limiting bytes
      })
      .then(result => {
        if (extractScriptsOnly) {
          const etag = null;
          const lastModified = null;
          // Cache payload with timestamp
          scriptCache.set(url, { scripts: result, etag: etag, lastModified: lastModified, timestamp: Date.now() });
          console.log(`Found ${result.length} script tags for ${url}`);
          broadcastAndClear({ 
            scripts: result,
            scriptsOnly: true 
          });
        } else {
          console.log(`HTML content length for ${url}: ${result.length} characters`);
          broadcastAndClear({ 
            html: result, 
            truncated: false,
            scriptsOnly: false 
          });
        }
      })
      .catch(err => {
        clearTimeout(timeoutId);
        console.error(`Fetch error for ${url}:`, err.message);
        broadcastAndClear({ error: err.message });
      });
    return true; // Will respond asynchronously
  }})