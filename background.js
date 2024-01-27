chrome.runtime.onInstalled.addListener(function() {
    // Set the default blocked website
    chrome.storage.sync.set({ blockedWebsite: '' });
  });
  
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      // Check if the requested URL matches the blocked website
      chrome.storage.sync.get(['blockedWebsite'], function(result) {
        const blockedWebsite = result.blockedWebsite;
        if (details.url.includes(blockedWebsite)) {
          return { cancel: true };
        }
      });
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
  );