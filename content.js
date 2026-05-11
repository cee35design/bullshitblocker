const forbiddenGroups = [
  ["guess", "song"],
  ["smash", "pass"],
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

// Redirect target
const redirectURL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1";

function checkAndBlock() {
  const titleEl = document.querySelector(
    "#full-bleed-container h1.ytd-watch-metadata, #title h1.ytd-watch-metadata"
  );

  if (titleEl) {
    const titleText = titleEl.innerText.toLowerCase();

    // 1. Check grouped words
    const matchesGroup = forbiddenGroups.some(group =>
      group.every(word => titleText.includes(word))
    );

    // 2. Check nuclear keywords
    const matchesKeyword = nuclearKeywords.some(word =>
      titleText.includes(word)
    );

    if (matchesGroup || matchesKeyword) {
      blockVideo();

      // Redirect after short delay
      setTimeout(() => {
        window.location.replace(redirectURL);
      }, 1000);
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

observer.observe(document.body, {
  childList: true,
  subtree: true
});