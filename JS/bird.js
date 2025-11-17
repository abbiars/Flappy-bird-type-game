export function jump() {
  console.log("it workie")
}

document.onclick = () => {
  jump()
}

KeyboardEvent.spacebar = () => {
  jump()
}
export default jump;

