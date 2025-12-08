// bakgrunnsmusikk setup
let bgm = new Audio('./assets/audio/backgroundmusic.mp3');
bgm.loop = true;
bgm.volume = 0.5;
bgm.preload = 'auto';

export function playBgm() {
  return bgm.play();
}

// Starter bakrunnsmusikk på første interaction f.eks klikk eller keyboard trykk.
function startBgmOnFirstGesture() {
  const handler = () => {
    playBgm().catch(() => {});
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
  flapSound.play().catch(() => {});
}

// Death sound effect
export function playDeathSound() {
  const deathSound = new Audio('./assets/audio/death.mp3');
  deathSound.volume = 0.5;
  deathSound.play().catch(() => {});
}