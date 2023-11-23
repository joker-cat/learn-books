const host = 'ws://localhost:3000/ws'

const ws = new WebSocket(host)
const sendBtn = document.querySelector('#sendBtn')
sendBtn.addEventListener('click', () => {
    ws.onopen = (res) => {
      console.log(res);
    }
    const Input = document.querySelector('.form-control')
    console.log(Input.value);
    ws.send(JSON.stringify(Input.value))
    Input.value = '';
    1
    
})




