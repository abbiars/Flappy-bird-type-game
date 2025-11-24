export function jump() {
  console.log('jump funker');
}




const all = { jump }
export default all;


function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        document.getElementById("pre-interaction-overlay").remove();
    }
}