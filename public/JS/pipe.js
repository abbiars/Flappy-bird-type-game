// ===== PIPE SETTINGS =====
const pipeSpeed = 3;               // how fast pipes move left
const pipeGap = 150;               // gap between upper/lower pipes
const pipeSpawnInterval = 2000;    // every 2 seconds
const pipeWidth = 80;
const pipeTopSrc = './assets/pipes/toppipe.png';     // <-- set top pipe image here
const pipeBottomSrc = './assets/pipes/bottompipe.png'; // <-- set bottom pipe image here

let pipes = []; // stores all pipe pairs
let pipeImageHeight = 320; // fallback; will be overwritten when image loads

// preload pipe image to read naturalHeight reliably
const probePipe = new Image();
probePipe.src = pipeTopSrc;
probePipe.onload = () => {
  // if your top and bottom images have same height, use this
  pipeImageHeight = probePipe.naturalHeight || pipeImageHeight;
  // if top and bottom differ, you can probe both and store separately
};

// Spawn pipes repeatedly (start only when game starts if you prefer)
setInterval(() => {
  if (gameStarted) spawnPipePair();
}, pipeSpawnInterval);

// Create one pair of pipes (uses pipeTopSrc / pipeBottomSrc)
function spawnPipePair() {
  const minY = -200;
  const maxY = 100;
  const topOffset = Math.floor(Math.random() * (maxY - minY) + minY);

  // spawn just off the right edge
  const startX = window.innerWidth + 20;

  // UPPER PIPE
  const upper = document.createElement("img");
  upper.src = pipeTopSrc;                      // <-- toppipe image used here
  upper.style.position = "absolute";
  upper.style.left = startX + "px";
  upper.style.top = topOffset + "px";
  upper.style.width = pipeWidth + "px";
  document.body.appendChild(upper);

  // LOWER PIPE
  const lower = document.createElement("img");
  lower.src = pipeBottomSrc;                   // <-- bottompipe image used here
  lower.style.position = "absolute";
  lower.style.left = startX + "px";
  // use measured pipeImageHeight instead of hard-coded 320
  lower.style.top = (topOffset + pipeGap + pipeImageHeight) + "px";
  lower.style.width = pipeWidth + "px";
  document.body.appendChild(lower);

  pipes.push({ upper, lower, x: startX });
}
