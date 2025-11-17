let birdY = 0;
let birdVelocity = 0;
const gravity = 0.6;
const jumpPower = -12;

// Legger til funksjon fall for gravitasjon. Birden faller nedover ved å øke birdY med gravity-verdien og oppdatere transform-stilen til birdImage for å flytte den nedover på skjermen.
function fall() {
  birdVelocity += gravity;
  birdY += birdVelocity;
  birdImage.style.transform = `translateY(${birdY}px)`;
}

setInterval(() => {
  fall()
}, 1000 / 60); // Kaller fall-funksjonen 60 ganger per sekund for jevn bevegelse.

// Legger til funksjon jump for å få birden til å hoppe oppover ved å redusere birdY med 50 piksler og oppdatere transform-stilen til birdImage for å flytte den oppover på skjermen.

function jump() {
  console.log('it workie!')
  birdVelocity = jumpPower;
}


const birdImage = new Image();
birdImage.src = './assets/bird/bitchassfugl.png';
birdImage.width = 69;
birdImage.height = 69;
birdImage.style.position = 'absolute';
birdImage.style.left = '240px';
birdImage.style.top = '100px';
document.body.appendChild(birdImage);

document.onclick = () => {
  jump()
}

document.onkeydown = (event) => {
  if (event.code === 'Space' || event.key === ' ') {
    event.preventDefault()
    jump()
  }
}

let all; "fisk"

export default all;