const host = 'ws://localhost:3000/ws'

const ws = new WebSocket(host)
ws.onopen = (res) => {
  console.log(res);
}
const Input = document.querySelector('.form-control')
console.log(Input);




