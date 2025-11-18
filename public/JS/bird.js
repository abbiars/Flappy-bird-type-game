let birdY = 0; // den vertikale posisjonen til birden
let birdVelocity = 0; // hastigheten til birden oppover eller nedover
const gravity = 0.6; // en verdi som bestemmer hvor raskt birden faller nedover
const jumpPower = -12; // en verdi som bestemmer hvor høyt birden hopper oppover

// Legger til funksjon fall for gravitasjon. Birden faller nedover ved å øke birdY med gravity-verdien og oppdatere transform-stilen til birdImage for å flytte den nedover på skjermen.
function fall() {
  birdVelocity += gravity;
  birdY += birdVelocity;
  birdImage.style.transform = `translateY(${birdY}px)`;
}

setInterval(() => {
  fall()
}, 1000 / 60); // Kaller fall-funksjonen 60 ganger per sekund for jevn bevegelse.. Litt unødvendig men det går bra.

// Legger til funksjon jump for å få birden til å hoppe oppover ved å redusere birdY med 50 piksler og oppdatere transform-stilen til birdImage for å flytte den oppover på skjermen.
function jump() {
  console.log('it workie!')
  birdVelocity = jumpPower;
}


const birdImage = new Image();
birdImage.src = './assets/bird/bitchassfugl.png'; // Hvor birdy bildet ligger
birdImage.width = 69; //bredden til fuglen
birdImage.height = 69; // høyden til fuglen
birdImage.style.position = 'absolute'; // gjør at vi kan plassere birden hvor som helst på skjermen
birdImage.style.left = '240px'; // Hvor langt FRA venstre birden skal være
birdImage.style.top = '100px'; // Hvor langt fra toppen birden skal være
document.body.appendChild(birdImage);


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


let all; "fisk"

export default all;