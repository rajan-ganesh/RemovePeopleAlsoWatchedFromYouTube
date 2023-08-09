const SEARCH_PAGE_REGEX = "https://www.youtube.com/results?search_query";
const URL_SUFFIX = "&sp=CAASAhAB";

function urlIsSearchPage(changeInfo) {
  if (!changeInfo.url) {
    return false;
  }
  return (
    changeInfo.url.startsWith(SEARCH_PAGE_REGEX) &&
    !changeInfo.url.endsWith(URL_SUFFIX)
  );
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (urlIsSearchPage(changeInfo)) {
    try {
      const newURL = changeInfo.url + URL_SUFFIX;
      console.log("new URL is :", newURL);
      chrome.tabs.update({ url: newURL });
      chrome.tabs.sendMessage(tabId, { action: "urlChanged" });
    } catch (error) {
      console.log(error);
      chrome.tabs.sendMessage(tabId, { action: "error", error: error });
    }
  }
});
