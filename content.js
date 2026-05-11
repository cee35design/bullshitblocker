const forbiddenTitles = [
  "guess the song", 
  "smash or pass", 
  "save one song", 
  "pick one",
  "would you rather",
  "manifest",
];

function checkAndBlock() {
  // YouTube's title element for the main video player
  const videoTitleElement = document.querySelector("#full-bleed-container h1.ytd-watch-metadata, #title h1.ytd-watch-metadata");
  
  if (videoTitleElement) {
    const titleText = videoTitleElement.innerText.toLowerCase();
    
    // Check if any forbidden phrase is in the title
    const shouldBlock = forbiddenTitles.some(phrase => titleText.includes(phrase));
    
    if (shouldBlock) {
      blockVideo();
    }
  }
}

function blockVideo() {
  // Find the video player element
  const player = document.querySelector("#movie_player");
  if (player && !player.classList.contains("blocked-content")) {
    player.classList.add("blocked-content");
    
    // Optional: Stop the video
    const video = player.querySelector("video");
    if (video) video.pause();
    
    console.log("Content blocked due to title match.");
  }
}

// Observe changes in the page (necessary for YouTube's SPA navigation)
const observer = new MutationObserver(() => {
  checkAndBlock();
});

observer.observe(document.body, { childList: true, subtree: true });