
let birdY = 0; // den vertikale posisjonen til birden
let birdVelocity = 0; // hastigheten til birden oppover eller nedover

const gravity = 0.6; // en verdi som bestemmer hvor raskt birden faller nedover
const jumpPower = -12; // en verdi som bestemmer hvor høyt birden hopper oppover

let gameStarted = false; // <-- game not start KM

const upperLimit = -50;   // how far UP the bird can go before dying
const lowerLimit = -10000;   // how far DOWN the bird can fall before dying
// Legger til funksjon fall for gravitasjon. Birden faller nedover ved å øke birdY med gravity-verdien og oppdatere transform-stilen til birdImage for å flytte den nedover på skjermen.

setInterval(() => {
  fall()
}, 1000 / 60); // Kaller fall-funksjonen 60 ganger per sekund for jevn bevegelse.. Litt unødvendig men det går bra.

// Legger til funksjon jump for å få birden til å hoppe oppover ved å redusere birdY med 50 piksler og oppdatere transform-stilen til birdImage for å flytte den oppover på skjermen.
function startGame() {
  gameStarted = true;
  birdVelocity = 0; // reset fall speed so it doesn't drop instantly
}

function jump() {
  if (!gameStarted) startGame(); // first click = start

  birdVelocity = jumpPower; // jump
  console.log("it workie!");
}

const birdImage = new Image();
birdImage.src = './assets/bird/bitchassfugl.png'; // Hvor birdy bildet ligger
birdImage.width = 69; //bredden til fuglen
birdImage.height = 69; // høyden til fuglen
birdImage.style.position = 'absolute'; // gjør at vi kan plassere birden hvor som helst på skjermen, og lar ann ikke bevege resten av innholdet.
birdImage.style.left = '240px'; // Hvor langt FRA venstre birden skal være
birdImage.style.top = '200px'; // Hvor langt fra toppen birden skal være

document.body.appendChild(birdImage);

function fall() {
  if (!gameStarted) return;

  birdVelocity += gravity;
  birdY += birdVelocity;

  birdImage.style.transform = `translateY(${birdY}px)`;

    // --- DEATH CHECK ---
  if (birdY < upperLimit || birdY > lowerLimit) {
    die();
  }
}

// dette gjør spnn at når du presser spacebar eller klikker med musa så gjør fuglen jump funksjonen
document.onkeydown = (event) => {
  if (event.code === 'Space' || event.key === ' ') { // funker ikke uten 3 = tegn. Vetsje koffor
    event.preventDefault()
    jump()
  }
}
document.onclick = () => {
  jump()
}
export default all

function die() {
  console.log("BIRD DIED 💀");
  
  // Restart entire game/page
  location.reload();
}
let all; "fisk"
