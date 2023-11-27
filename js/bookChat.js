import { axios } from "../main.js";
const host = "ws://localhost:4000/ws";

const ws = new WebSocket(host);

const sendBtn = document.querySelector("#sendBtn");
// 載入之前紀錄

// 發送訊息
sendBtn.addEventListener("click", () => {
  const Input = document.querySelector(".form-control");
    // 如果未輸入字不發送
    if(Input.value === ''){

    }else{
        let messageEmit = {
          user: sessionStorage.getItem("email"),
          content: Input.value,
          room: 1
        };
        ws.send(JSON.stringify(messageEmit));
        Input.value = "";
    }

});

// 接收server訊息
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
  if (data.context === "user") {// 連線成功後，會給予連線身分，並存到sessionStorage
    sessionStorage.setItem("uuid", data.uuid);
  } else if (data.context === "message" && data.uuid !== sessionStorage.getItem("uuid") ) {// 接收訊息，並判斷身分(別人)
    let chatModel = `
    <div class="chatBoardPhoto d-flex h-25">
        <div class="pictureBackground d-flex justify-content-center align-content-center p-1">
            <a class="rounded-circle" href="#"><img src="/assets/images/Rabbit.jpg" alt="自拍照"
                    class="rounded-circle d-flex"></a>
        </div>
    </div>
    <div class="chatBoardSplit ms-2 me-2 ">
        <div class="chatBoardName mb-1 mt-1">
            ${data.user}
        </div>
        <div class="chatBoardText text-break w-100 bg-white rounded-3 p-3">
            <P>${data.content}</P>
        </div>
    </div>
    <div class="chatBoardDate d-flex flex-column-reverse">
        11/08 08:15
    </div>`;
    // 傳送至HTML聊天室
    let cahtBoard = document.querySelector(".chatBoardContent");
    let newMessage = document.createElement("div");
    newMessage.className = "chatBoardMessage d-flex mb-3";
    newMessage.innerHTML = chatModel;
    cahtBoard.appendChild(newMessage);
    // 滾動，不確定是不是這樣寫
    cahtBoard.scrollTo(0, cahtBoard.scrollHeight)
  } else if (data.context === "message" && data.uuid === sessionStorage.getItem("uuid")) {    // 接收訊息，並判斷身分(自己) 
    let chatModel = `
    <div class="chatBoardPhoto d-flex h-25">
        <div class="pictureBackground d-flex justify-content-center align-content-center p-1">
            <a class="rounded-circle" href="#"><img src="/assets/images/ShibaInu.jpg" alt="自拍照"
                    class="rounded-circle d-flex"></a>
        </div>
    </div>
    <div class="chatBoardSplit ms-2 me-2">
        <div class="chatBoardName d-flex flex-row-reverse mb-1 mt-1">
            ${data.user}
        </div>
        <div class="chatBoardText text-break w-100 bg-white rounded-3 p-3">
            <P>${data.content}
            </P>
        </div>
    </div>
    <div class="chatBoardDate d-flex flex-column-reverse text-end">
        11/08 14:36
    </div>`;
    // 傳送至HTML聊天室
    let cahtBoard = document.querySelector(".chatBoardContent");
    let newMessage = document.createElement("div");
    newMessage.className = "chatBoardMessage d-flex flex-row-reverse mb-3";
    newMessage.innerHTML = chatModel;
    cahtBoard.appendChild(newMessage);
    // 滾動，不確定是不是這樣寫
    cahtBoard.scrollTo(0, cahtBoard.scrollHeight)
   }
};


