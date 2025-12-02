import { playFlapSound, playDeathSound } from './audio.js';

//Abdallah
let birdY = 0; // den vertikale posisjonen til birden
let birdVelocity = 0; // hastigheten til birden oppover eller nedover
//Abdallah
const gravity = 0.6; // en verdi som bestemmer hvor raskt birden faller nedover
const jumpPower = -12; // en verdi som bestemmer hvor høyt birden hopper oppover
//KM (Kyrylo Moroz)
let isDead = false;
let gameStarted = false; // <-- game not start KM
//KM
const upperLimit = -180;   // above top
const lowerLimit = window.innerHeight - 200; // bottom of screen
 // how far DOWN the bird can fall before dying
// Legger til funksjon fall for gravitasjon. Birden faller nedover ved å øke birdY med gravity-verdien og oppdatere transform-stilen til birdImage for å flytte den nedover på skjermen.

setInterval(() => {
  fall()
}, 1000 / 60); // Kaller fall-funksjonen 60 ganger per sekund for jevn bevegelse.. Litt unødvendig men det går bra.

//KM Legger til funksjon jump for å få birden til å hoppe oppover ved å redusere birdY med 50 piksler og oppdatere transform-stilen til birdImage for å flytte den oppover på skjermen.
function startGame() {
  gameStarted = true;
  birdVelocity = 0; // reset fall speed so it doesn't drop instantly
}
//Abdallah
function jump() {
  if (!gameStarted) startGame(); // first click = start
  birdVelocity = jumpPower; // jump
  playFlapSound(); // Play flap sound
  console.log("it workie!");
}
//alt som er me bird grense til Abdallah
const birdImage = new Image();
birdImage.src = './assets/bird/bitchassfugl.png'; // Hvor birdy bildet ligger
birdImage.width = 69; //bredden til fuglen
birdImage.height = 69; // høyden til fuglen
birdImage.style.position = 'absolute'; // gjør at vi kan plassere birden hvor som helst på skjermen, og lar ann ikke bevege resten av innholdet.
birdImage.style.left = '240px'; // Hvor langt FRA venstre birden skal være
birdImage.style.top = '200px'; // Hvor langt fra toppen birden skal være

document.body.appendChild(birdImage);

// CoWork  KYrylo og Abdallah
function fall() {
  if (!gameStarted || isDead) return;

  birdVelocity += gravity;
  birdY += birdVelocity;

  // --- CEILING STOP (NO DEATH) ---
  if (birdY < upperLimit) {
    birdY = upperLimit;     // clamp position
    birdVelocity = 0;      // stop upward movement
  }

  // --- FLOOR DEATH ---
  if (birdY > lowerLimit) {
    die();
    return;
  }

  birdImage.style.transform = `translateY(${birdY}px)`;
}

// Abdallah - dette gjør spnn at når du presser spacebar eller klikker med musa så gjør fuglen jump funksjonen
document.onkeydown = (event) => {
  if (event.code === 'Space' || event.key === ' ') { // funker ikke uten 3 = tegn. Vetsje koffor
    event.preventDefault()
    jump()
  }
}
document.onclick = () => {
  jump()
}

// Kyrylo
function die() {
  console.log("BIRD DIED 💀");
    if (isDead) return; // hindrer dobbel død
  isDead = true;
  playDeathSound(); // Spiller deathsound
  // Restart entire game/page
   // Stopp spillet
  gameStarted = false;

  // Liten delay før restart (ser bedre ut)
  setTimeout(() => {
    restartGame();
  }, 1000);
}
//Kyrylo
function restartGame() {
  // Reset verdier
  birdY = 0;
  birdVelocity = 0;
  isDead = false;

  // Reset visuell posisjon
  birdImage.style.transform = `translateY(0px)`;

  console.log("GAME RESTARTED 🔁");
}

// Pipe code AED





let all = "fisk";
export default all;