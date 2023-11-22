import express from "express";
import { WebSocketServer } from 'ws';


const PORT = 3000;

const server = express().listen(PORT, () =>
  console.log(`Listening on ${PORT}`)
);

const wss = new WebSocketServer({ server });
wss.on("connection", (ws) => {
  // 连接成功
  console.log("使用者連接成功");

  //接收消息
  ws.on("message", (data) => {
    //data为客户端发送的消息，将消息原封不动返回回去
    console.log("接收消息", data.toString());
    const text = data.toString();
    let clients = wss.clients;
    //循环，发送消息至每个客户端
    clients.forEach((client) => {
      client.send(text)
    });
  });

  ws.on("close", (code, reason) => {
    console.log("使用者連接關閉", code, reason);
  });
});
