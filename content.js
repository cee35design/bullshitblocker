// 1. The List (Must be at the top!)
const brainRotTerms = [
  "guess the song",
  "guess the songs",
  "smash or pass",
  "save one song",
  "pick one",
  "would you rather",
  "bts", 
  "blackpink", 
  "twice", 
  "newjeans", 
  "ive", 
  "aespa", 
  "lesserafim", 
  "stray kids", 
  "skz", 
  "quiz", 
  "challenge", 
  "manifest", 
  "kpop", 
  "fancam",
  "katseye",
];

// 2. The Nuke Function
function nukeTab() {
  const judgmentImage = "https://yt3.googleusercontent.com/eVCPXEx45wBGH5hAf3-AS1TDdD5Yy50dwMQhwvjbcXVXSPCDhnhmyBZ4qmtuHIbkR7lhlY7szQ=s900-c-k-c0x00ffffff-no-rj";
  
  console.log("Brain rot detected. Redirecting...");
  window.location.replace(judgmentImage);
}

// 3. The Logic
function checkAndBlock() {
  const titleEl = document.querySelector("#full-bleed-container h1.ytd-watch-metadata, #title h1.ytd-watch-metadata, title");
  
  if (titleEl) {
    const titleText = titleEl.innerText.toLowerCase();

    // Simple loop that won't crash
    for (let i = 0; i < brainRotTerms.length; i++) {
      if (titleText.includes(brainRotTerms[i].toLowerCase())) {
        nukeTab();
        break; 
      }
    }
  }
}

// 4. The Triggers
// Check every 500ms
setInterval(checkAndBlock, 500);

// Also check when the page content changes
const observer = new MutationObserver(() => {
  checkAndBlock();
});
observer.observe(document.body, { childList: true, subtree: true });