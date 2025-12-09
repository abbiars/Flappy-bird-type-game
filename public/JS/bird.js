import { playFlapSound, playDeathSound } from './audio.js';
import { updatePipes, resetPipes, setGameState } from './pipe.js';

// Bird physics - Abdallah
let birdY = 0;
let birdVelocity = 0;
const gravity = 0.43;
const jumpPower = -8;

// Game state - KM (Kyrylo Moroz)
let isDead = false;
let gameStarted = false;

// Screen boundaries
const upperLimit = -300;
const lowerLimit = window.innerHeight - 100;

// Game loop
setInterval(() => {
  fall();
  setGameState(gameStarted, isDead, birdY);
  const hitPipe = updatePipes();
  if (hitPipe) {
    die();
  }
}, 1000 / 60);

// KM
function startGame() {
  gameStarted = true;
  birdVelocity = 0;
}

// Abdallah
function jump() {
  if (!gameStarted) startGame();
  birdVelocity = jumpPower;
  playFlapSound();
}

// alt som er me bird grense til Abdallah
const birdImage = new Image();
birdImage.src = './assets/bird/bitchassfugl.png';
birdImage.width = 69;
birdImage.height = 69;
birdImage.style.position = 'absolute';
birdImage.style.left = '240px';
birdImage.style.top = '200px';
birdImage.style.zIndex = '100';
document.body.appendChild(birdImage);

// CoWork Kyrylo og Abdallah
function fall() {
  if (!gameStarted || isDead) return;

  birdVelocity += gravity;
  birdY += birdVelocity;

  // CEILING STOP (NO DEATH)
  if (birdY < upperLimit) {
    birdY = upperLimit;
    birdVelocity = 0;
  }

  // FLOOR DEATH
  if (birdY > lowerLimit) {
    die();
    console.log(die());
    
    return;
  }

  birdImage.style.transform = `translateY(${birdY}px)`;
}

// Abdallah - Input handling
let spacePressed = false;

document.onkeydown = (event) => {
  if (event.code === 'Space' || event.key === ' ') {
    event.preventDefault();
    if (!spacePressed) {
      spacePressed = true;
      jump();
    }
  }
};

document.onkeyup = (event) => {
  if (event.code === 'Space' || event.key === ' ') {
    spacePressed = false;
  }
};

document.onclick = () => {
  jump();
};

// Kyrylo - Death handling
function die() {
  if (isDead) alert("GAME OVER! Please wait for restart.");
  isDead = true;
  playDeathSound();
  gameStarted = false;

  setTimeout(() => {
    restartGame();
  }, 1000);
}

// Kyrylo - Game restart
function restartGame() {
  birdY = 0;
  birdVelocity = 0;
  isDead = false;
  gameStarted = false;
  birdImage.style.transform = `translateY(0px)`;
  resetPipes();
}