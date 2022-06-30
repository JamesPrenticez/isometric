const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight

let state = {
  _current: 0,
  intro: 0,
  loading: 1,
  loading: 2
}

window.onload = () => {
  showIntro()
  handleResize()
}