import express from 'express';
import nodemailer from 'nodemailer';
import cors from "cors";

const app = express();
const port = 3001;

// 使用 cors 中間件，這將允許所有來源的請求，實際應用中可能需要更複雜的配置
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send("成功開啟中");
  });
app.post('/sendemail', (req, res) => {
  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'project5487@gmail.com',
        pass: 'ecek jgjw cmcs twjs' // 用你的應用程式密碼替換這裡
    }
  });

  const mailOptions = {
    from: 'project5487@gmail.com',
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent:', info.response);
      res.send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});



// ===============      Websocket Server        ===============
import WebSocket from "./node_modules/ws/index.js";
import uuidv4 from "./node_modules/uuid/dist/index.js";

const PORT = 4000;

const server = express().listen(PORT, () =>
  console.log(`WS Server is running at http://localhost:${PORT}`)
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
    uuid,
  }
  ws.send(JSON.stringify(user))

  //接收消息
  ws.on("message", (msg) => {
    //data為客户端發送的消息，將消息返回
    const message = JSON.parse(msg)
    const newMessage = {
        context: 'message',
        uuid,
        user: message.user,
        content: message.content
    }
    // 發送給每個連線用戶
    sendAllUser(newMessage)
  });

//  通知使用者關閉連線
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
