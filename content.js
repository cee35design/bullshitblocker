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
];

function checkAndBlock() {
  const titleEl = document.querySelector("#full-bleed-container h1.ytd-watch-metadata, #title h1.ytd-watch-metadata");
  
  if (titleEl) {
    const titleText = titleEl.innerText.toLowerCase();

    // 1. Check word groups (matches even if words are separated)
    const matchesGroup = forbiddenGroups.some(group => 
      group.every(word => titleText.includes(word))
    );

    // 2. Check single "nuclear" keywords
    const matchesKeyword = nuclearKeywords.some(word => 
      titleText.includes(word)
    );

    if (matchesGroup || matchesKeyword) {
      blockVideo();
    }
  }
}

function blockVideo() {
  const player = document.querySelector("#movie_player");
  if (player && !player.classList.contains("blocked-content")) {
    player.classList.add("blocked-content");
    const video = player.querySelector("video");
    if (video) video.pause();
    console.log("Classroom brain-rot blocked.");
  }
}

const observer = new MutationObserver(() => checkAndBlock());
observer.observe(document.body, { childList: true, subtree: true });