document.addEventListener('DOMContentLoaded', function () {
  const websiteInput = document.getElementById('websiteInput');
  const blockButton = document.getElementById('blockButton');
  const blockedWebsitesList = document.getElementById('blockedWebsites');

  // Load blocked websites from storage and display them
  chrome.storage.sync.get(['blockedWebsites'], function (result) {
    const blockedWebsites = result.blockedWebsites || [];
    blockedWebsites.forEach(website => addWebsiteToList(website));
  });

  // Add a website to the blocklist
  blockButton.addEventListener('click', function () {
    const website = websiteInput.value.trim();
    if (website) {
      chrome.storage.sync.get(['blockedWebsites'], function (result) {
        const blockedWebsites = result.blockedWebsites || [];
        blockedWebsites.push(website);
        chrome.storage.sync.set({ blockedWebsites: blockedWebsites }, function () {
          addWebsiteToList(website);
        });
      });
    }
  });

  // Add a website to the displayed list
  function addWebsiteToList(website) {
    const listItem = document.createElement('li');
    listItem.textContent = website;
    blockedWebsitesList.appendChild(listItem);
  }
});