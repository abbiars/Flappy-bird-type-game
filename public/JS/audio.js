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

