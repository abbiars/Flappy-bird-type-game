let backgroundX = 0;
const scrollSpeed = 2.5;

function scrollBackground() {    
  const panoramaBackground = document.getElementById('panorama-background');
  
  if (panoramaBackground) {
    backgroundX -= scrollSpeed;
    panoramaBackground.style.backgroundPosition = `${backgroundX}px 0`;
    requestAnimationFrame(scrollBackground);

  }
}

// Liten delay før scroll starter for at å sikre at DOM (divven til bakgrunnet i html) er lastet
setTimeout(() => {
  console.log('Starting background scroll...');
  scrollBackground();
}, 100);