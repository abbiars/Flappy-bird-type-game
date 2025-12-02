let bgm = new Audio('./assets/audio/backgroundmusic.mp3');
bgm.loop = true;
bgm.volume = 0.5;
bgm.preload = 'auto';

// Try to play; return the promise so caller can handle errors
export function playBgm() {
  return bgm.play();
}

// Start BGM on first user gesture (click or keydown). Browsers block autoplay otherwise.
function startBgmOnFirstGesture() {
  const handler = () => {
    playBgm().catch(err => console.warn('bgm play blocked:', err));
    window.removeEventListener('click', handler);
    window.removeEventListener('keydown', handler);
  };
  window.addEventListener('click', handler, { once: true });
  window.addEventListener('keydown', handler, { once: true });
}

startBgmOnFirstGesture();

// Flap sound effect
export function playFlapSound() {
  const flapSound = new Audio('./assets/audio/flap.mp3');
  flapSound.volume = 0.6;
  flapSound.play().catch(err => console.warn('flap sound blocked:', err));
}

// Death sound effect
export function playDeathSound() {
  const deathSound = new Audio('./assets/audio/death.mp3');
  deathSound.volume = 0.5;
  deathSound.play().catch(err => console.warn('death sound blocked:', err));
}