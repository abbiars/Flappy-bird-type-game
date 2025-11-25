const background = document.getElementById('panorama-background');

if (!background) {
  console.error('panorama-background element not found');
} else {
  console.log('background element found');
}

let position = 0;
const speed = 2;

function animateBackground() {
  position -= speed;
  background.style.backgroundPosition = position + 'px 0px';
  requestAnimationFrame(animateBackground);
}

animateBackground();