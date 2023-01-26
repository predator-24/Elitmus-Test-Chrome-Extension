//An event Listener and listens for updates to a tab and triggers
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    //Checking that this page is Google homepage and has the page completely loaded
    changeInfo.status == "complete" &&
    tab.url === "https://www.google.com/"
  ) {
    //counting the number of tabs running at this instance
    let tabsNum = 0;
    chrome.tabs.query({}, function (tabs) {
      tabsNum = tabs.length;
      //This is a method that sends a message to the content script of a specific tab
      chrome.tabs.sendMessage(tabId, {
        type: "PageLoaded",
        len: tabsNum,
      });
    });
  }
});
