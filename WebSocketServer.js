import express from "express";
import WebSocket from "./node_modules/ws/index.js";
import uuidv4 from "./node_modules/uuid/dist/index.js";

const PORT = 4000;

const server = express().listen(PORT, () =>
  console.log(`Listening on ${PORT}`)
);
const wss = new WebSocket.WebSocketServer({ server });

wss.on("connection", (ws) => {
  // 連接成功
  console.log("使用者連接成功");
  // 聊天室身分
  const uuid = uuidv4.v4();
  ws.uuid = uuid;
  const user = {
    context: 'user',
    uuid
  }
  ws.send(JSON.stringify(user))

  //接收消息
  ws.on("message", (msg) => {
    //data為客户端發送的消息，將消息返回
    const message = JSON.parse(msg)
    // console.log(message);
    const newMessage = {
        context: 'message',
        uuid,
        user: message.user,
        content: message.content
    }

    // 發送給每個連線用戶
    sendAllUser(newMessage)
  });

//   ws.on("close", (code, reason) => {
//     console.log(`使用者連接關閉`, code, reason);
//   });
});

function sendAllUser(msg){
    wss.clients.forEach(function (client) {
        // 已建立連線，  未排除自身    排除自身---->(&& client.uuid !== msg.uuid)
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(msg));
        }
      });

}
