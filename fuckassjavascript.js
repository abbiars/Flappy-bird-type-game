document.addEventListener('OnMount', () => {
  const button = document.getElementById('jump');
  if (!button) return;
  button.addEventListener('click', () => {
    alert('knapp er virker');
    // TODO: replace alert with game-start / jump logic
  });
});