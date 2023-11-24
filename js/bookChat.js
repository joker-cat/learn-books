const host = "ws://localhost:3000/ws";

const ws = new WebSocket(host);
const sendBtn = document.querySelector("#sendBtn");

sendBtn.addEventListener("click", () => {
  const Input = document.querySelector(".form-control");
  console.log(Input.value);
  ws.send(JSON.stringify(Input.value));
  Input.value = "";
});

// 接收server訊息
ws.onopen = (res) => {
  ws.onmessage = (event) => {
    console.log(`[Message from server]:\n %c${event.data}`);
  };
};
