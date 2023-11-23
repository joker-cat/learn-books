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
