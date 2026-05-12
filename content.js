const forbiddenGroups = [
  ["guess", "song"],     // Matches "guess the 100 songs", "guess that song", etc.
  ["smash", "pass"],    // Matches "smash or pass", "smashing or passing"
  ["save", "one", "song"],
  ["pick", "one"],
  ["would", "you", "rather"]
];

const nuclearKeywords = [
  "blackpink",
  "bts",
  "quiz",
  "challenge",
  "manifest"
  // The Legends / Massive Fandoms
  ,"bts", "blackpink", "twice", "exo", "seventeen", "stray kids", "skz", "got7", "red velvet", "katseye", "meovv", "kiss of life", "riize", "boynextdoor", "tws", "zerobaseone", "zb1", "kiiikiii", "cortis", "hearts2hearts",
  
  // The Current Gen Leaders
  "newjeans", "ive", "aespa", "lesserafim", "le sserafim", "itzy", "nmixx", "enhypen", "txt", "tomorrow x together", "ateez", "treasure",
  
  // The Rising / Newest Groups (2025-2026 Trends)
  "illit", "babymonster", "katseye", "meovv", "kiss of life", "riize", "boynextdoor", "tws", "zerobaseone", "zb1", "kiiikiii", "cortis", "hearts2hearts",

  // General Brain-Rot Terms
  "quiz", "challenge", "manifest", "kpop", "k-pop", "bias", "fancam"
];
function checkAndBlock() {
  const titleEl = document.querySelector("#full-bleed-container h1.ytd-watch-metadata, #title h1.ytd-watch-metadata");
  
  if (titleEl) {
    const titleText = titleEl.innerText.toLowerCase();

    const matchesGroup = forbiddenGroups.some(group => 
      group.every(word => titleText.includes(word))
    );

    const matchesKeyword = nuclearKeywords.some(word => 
      titleText.includes(word)
    );

    if (matchesGroup || matchesKeyword) {
      blockEverything();
    }
  }
}

function blockEverything() {
  if (!document.body.classList.contains("blocked-content")) {
    document.body.classList.add("blocked-content");
    
    // Find the video and kill the volume/playback
    const video = document.querySelector("video");
    if (video) {
      video.pause();
      video.muted = true; 
      video.currentTime = 0; // Reset it so they can't hear a split second
    }
    console.log("Full-screen judgment active.");
  }
}

const observer = new MutationObserver(() => checkAndBlock());
observer.observe(document.body, { childList: true, subtree: true });