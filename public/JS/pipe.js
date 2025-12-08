// Pipe variables - AED
const pipeWidth = 80;
const pipeGap = 220; // gap mellom topp og bunn pipe - FIXED WIDTH
let pipeSpeed = 50; // hvor fort pipes beveger seg (starter på 3)
const pipeSpeedIncrease = 0.3; // hvor mye hastigheten øker per pipe passert
const maxPipeSpeed = 100; // maks hastighet for pipes
let pipes = []; // array for å holde alle pipes
let pipeSpawnTimer = 0;
let pipeSpawnInterval = 90; // spawn nye pipes hver 90 frames (1.5 sekunder)
const minSpawnInterval = 45; // minimum spawn interval (fastest spawn rate). Var 60
const spawnIntervalDecrease = 3; // hvor mye spawn interval reduseres. Var 2 
let score = 0;
let gameStarted = false;
let isDead = false;
let birdY = 0;

// Score display
const scoreDisplay = document.createElement('div');
scoreDisplay.style.position = 'absolute';
scoreDisplay.style.top = '50px';
scoreDisplay.style.left = '50%';
scoreDisplay.style.transform = 'translateX(-50%)';
scoreDisplay.style.fontSize = '48px';
scoreDisplay.style.fontWeight = 'bold';
scoreDisplay.style.color = 'white';
scoreDisplay.style.textShadow = '3px 3px 0px black';
scoreDisplay.style.zIndex = '1000';
scoreDisplay.textContent = '0';
document.body.appendChild(scoreDisplay);

// Pipe functions - AED
function createPipe() {
  const minHeight = 50;
  const maxHeight = window.innerHeight - pipeGap - 150;
  const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;
  
  // Top pipe - prøv å bruke bilde først
  const topPipe = new Image();
  topPipe.src = './assets/pipe/toppipe.png';
  topPipe.style.position = 'absolute';
  topPipe.style.width = pipeWidth + 'px';
  topPipe.style.height = topHeight + 'px';
  topPipe.style.left = window.innerWidth + 'px';
  topPipe.style.top = '0px';
  topPipe.style.zIndex = '50';
  topPipe.style.imageRendering = 'pixelated'; // for pixel art
  
  // Fallback til grønn farge hvis bilde ikke laster
  topPipe.onerror = function() {
    console.log('Top pipe image failed to load, using color');
    this.style.backgroundColor = '#4CAF50';
    this.style.border = '3px solid #2E7D32';
  };
  
  document.body.appendChild(topPipe);
  
  // Bottom pipe - prøv å bruke bilde først
  const bottomPipe = new Image();
  bottomPipe.src = './assets/pipe/bottompipe.png';
  bottomPipe.style.position = 'absolute';
  bottomPipe.style.width = pipeWidth + 'px';
  bottomPipe.style.height = (window.innerHeight - topHeight - pipeGap) + 'px';
  bottomPipe.style.left = window.innerWidth + 'px';
  bottomPipe.style.top = (topHeight + pipeGap) + 'px';
  bottomPipe.style.zIndex = '50';
  bottomPipe.style.imageRendering = 'pixelated'; // for pixel art
  
  // Fallback til grønn farge hvis bilde ikke laster
  bottomPipe.onerror = function() {
    console.log('Bottom pipe image failed to load, using color');
    this.style.backgroundColor = '#4CAF50';
    this.style.border = '3px solid #2E7D32';
  };
  
  document.body.appendChild(bottomPipe);
  
  pipes.push({
    x: window.innerWidth,
    topHeight: topHeight,
    topElement: topPipe,
    bottomElement: bottomPipe,
    scored: false
  });
  
  console.log('Pipe created at x:', window.innerWidth, 'Image path:', topPipe.src);
}

function updatePipes() {
  if (!gameStarted || isDead) return;
  
  // Spawn nye pipes
  pipeSpawnTimer++;
  if (pipeSpawnTimer >= pipeSpawnInterval) {
    createPipe();
    pipeSpawnTimer = 0;
  }
  
  // Flytt pipes og sjekk kollisjon
  const birdLeft = 240;
  const birdRight = birdLeft + 69;
  const birdTop = 200 + birdY;
  const birdBottom = birdTop + 69;
  
  for (let i = pipes.length - 1; i >= 0; i--) {
    const pipe = pipes[i];
    pipe.x -= pipeSpeed;
    
    // Oppdater posisjon
    pipe.topElement.style.left = pipe.x + 'px';
    pipe.bottomElement.style.left = pipe.x + 'px';
    
    // Fjern pipes som er utenfor skjermen
    if (pipe.x + pipeWidth < 0) {
      pipe.topElement.remove();
      pipe.bottomElement.remove();
      pipes.splice(i, 1);
      continue;
    }
    
    // Sjekk om bird har passert pipen (for score)
    if (!pipe.scored && pipe.x + pipeWidth < birdLeft) {
      pipe.scored = true;
      score++;
      scoreDisplay.textContent = score;
      
      // Øk hastigheten gradvis (men ikke over max)
      if (pipeSpeed < maxPipeSpeed) {
        pipeSpeed += pipeSpeedIncrease;
        console.log(`Speed increased to: ${pipeSpeed.toFixed(2)}`);
      }
      
      // Reduser spawn interval for å gjøre pipes tettere (men ikke under minimum)
      if (pipeSpawnInterval > minSpawnInterval) {
        pipeSpawnInterval -= spawnIntervalDecrease;
        console.log(`Spawn interval decreased to: ${pipeSpawnInterval}`);
      }
    }
    
    // Kollisjon detection
    const pipeLeft = pipe.x;
    const pipeRight = pipe.x + pipeWidth;
    
    if (birdRight > pipeLeft && birdLeft < pipeRight) {
      // Bird er innenfor pipe's x-koordinater
      if (birdTop < pipe.topHeight || birdBottom > pipe.topHeight + pipeGap) {
        // Bird treffer topp eller bunn pipe
        return true; // Return true hvis kollisjon
      }
    }
  }
  
  return false; // Ingen kollisjon
}

function resetPipes() {
  score = 0;
  pipeSpeed = 3;
  pipeSpawnInterval = 90; // Reset spawn interval også
  scoreDisplay.textContent = '0';
  
  // Fjern alle pipes
  pipes.forEach(pipe => {
    pipe.topElement.remove();
    pipe.bottomElement.remove();
  });
  pipes = [];
  pipeSpawnTimer = 0;
  
  console.log('Pipes reset');
}

function setGameState(started, dead, y) {
  gameStarted = started;
  isDead = dead;
  birdY = y;
}

// Export funksjoner
export { updatePipes, resetPipes, setGameState }