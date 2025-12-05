import { playFlapSound, playDeathSound } from './audio.js';
import { updatePipes, resetPipes, setGameState } from './pipe.js';

//Abdallah
let birdY = 0;
let birdVelocity = 0;
//Abdallah
const gravity = 0.43;
const jumpPower = -7.5;
//KM (Kyrylo Moroz)
let isDead = false;
let gameStarted = false;
//KM
const upperLimit = -300;
const lowerLimit = window.innerHeight - 100;

// Game loop
setInterval(() => {
  fall();
  // Oppdater game state til pipe.js
  setGameState(gameStarted, isDead, birdY);
  // Sjekk for pipe kollisjon
  const hitPipe = updatePipes();
  if (hitPipe) {
    die();
  }
}, 1000 / 60);

//KM
function startGame() {
  gameStarted = true;
  birdVelocity = 0;
  console.log('Game started!');
}

//Abdallah
function jump() {
  if (!gameStarted) startGame();
  birdVelocity = jumpPower;
  playFlapSound();
  console.log("it workie!");
}

//alt som er me bird grense til Abdallah
const birdImage = new Image();
birdImage.src = './assets/bird/bitchassfugl.png';
birdImage.width = 69;
birdImage.height = 69;
birdImage.style.position = 'absolute';
birdImage.style.left = '240px';
birdImage.style.top = '200px';
birdImage.style.zIndex = '100';
document.body.appendChild(birdImage);

// CoWork KYrylo og Abdallah
function fall() {
  if (!gameStarted || isDead) return;

  birdVelocity += gravity;
  birdY += birdVelocity;

  // --- CEILING STOP (NO DEATH) ---
  if (birdY < upperLimit) {
    birdY = upperLimit;
    birdVelocity = 0;
  }

  // --- FLOOR DEATH ---
  if (birdY > lowerLimit) {
    die();
    return;
  }

  birdImage.style.transform = `translateY(${birdY}px)`;
}

// Abdallah
document.onkeydown = (event) => {
  if (event.code === 'Space' || event.key === ' ') {
    event.preventDefault();
    jump();
  }
};

document.onclick = () => {
  jump();
};

// Kyrylo
function die() {
  console.log("BIRD DIED 💀");
  if (isDead) return;
  isDead = true;
  playDeathSound();
  gameStarted = false;

  setTimeout(() => {
    restartGame();
  }, 1000);
}

//Kyrylo
function restartGame() {
  birdY = 0;
  birdVelocity = 0;
  isDead = false;
  gameStarted = false;

  birdImage.style.transform = `translateY(0px)`;
  
  resetPipes();

  console.log("GAME RESTARTED 🔁");
}

let all = "fisk";
export default all;