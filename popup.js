document.addEventListener("DOMContentLoaded", async () => {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);

  //Check whether the current tab is Google home page
  if (tab.url === "https://www.google.com/") {
    const container = document.getElementsByClassName("container")[0];
    container.innerHTML =
      '<div class="title">Welcome to Elitmus Test Extension</div>';
  } else {
    const container = document.getElementsByClassName("container")[0];
    container.innerHTML =
      '<div class="title">This is not google home page.</div>';
  }
});
