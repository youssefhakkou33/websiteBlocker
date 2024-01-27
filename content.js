chrome.storage.sync.get(['blockedWebsites'], function (result) {
    const blockedWebsites = result.blockedWebsites || [];
    const currentUrl = window.location.href;
  
    if (blockedWebsites.some(website => currentUrl.includes(website))) {
      // Redirect to the block page
      chrome.runtime.sendMessage({ action: 'block' });
    }
  });
  