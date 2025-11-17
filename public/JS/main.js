export function jump() {
  console.log('it workie')
}

document.onclick = () => {
  jump()
}

document.onkeydown = (event) => {
  if (event.code === 'Space' || event.key === ' ') {
    event.preventDefault()
    jump()
  }
}

const all = { jump }
export default all;