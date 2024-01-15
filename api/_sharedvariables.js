import { axios } from "/main.js";
//json-server:port
export const jsonUrl = "http://localhost:3000";

//密碼找回寄信
export function sendEmail(obj) {
    axios.post('http://localhost:3001/sendemail', obj);
}

//註冊
export function newSignup(inputEmail, inputPassword) {
    console.log('---檢測是否重複註冊信箱---');
    axios
        .post(`${jsonUrl}/users`, {
            email: inputEmail,
            password: inputPassword,
            copyPassword:inputPassword,
            infoConfirm: 0, //1為有填寫完成基本資料
            teacherInfo: 0, //家教的部分是否有填寫
        })
        .then((res) => {
            console.log('---帳號沒註冊過---');
            console.log(res);
            if (res.status === 201) {
                newInfomation(res.data.user.id);
                mySessionStorage(res.data.user, "setting", res.data.accessToken);
            }
        })
        .catch(err => {
            console.error(err.response.data);
        });
}

//建立基本資料欄位
function newInfomation(getId) {
    console.log('---註冊完成，建立基本資料欄位---');
    axios
        .post(`${jsonUrl}/information`, {
            "photo": "",
            "userName": "",
            "phoneNumber": "",
            "shortInfo": "",
            "learningTag": "",
            "youtubeLink": "",
            "igLink": "",
            "githubLink": "",
            "linkedinLink": "",
            "cakeresumeLink": "",
            "teacherInfo": "",
            "tutoringTags": "",
            "userId": parseInt(getId)
        })
        .then((res) => {
            if (res.status === 201) console.log('---基本資料欄位建立及關連完成---');
        })
        .catch(err => {
            console.error(err);
        });
}

//檢查信箱是否重複
export async function alreadySignupEmail(userInput) {
    function checkEmail(str) {
        return new Promise((resolve, reject) => {
            axios.get(`${jsonUrl}/users?email=${str}`)
                .then(res => {
                    resolve(res.data.length === 1 ? true : false);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    try {
        return await checkEmail(userInput);
    } catch (error) {
        console.error(error.message);
    }
}

//登入檢查
export async function comparison(returnPassword) {
    function checkEmail(str) {
        return new Promise((resolve, reject) => {
            axios.post(`${jsonUrl}/login`, str)
                .then(res => {
                    (res.status === 200) ? resolve(res) : null;
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    try {
        return await checkEmail(returnPassword);
    } catch (error) {
        console.error(error.message);
    }
}

//找回密碼
export async function getPassword(returnPassword) {
    function checkEmail(str) {
        // 返回 Promise
        return new Promise((resolve, reject) => {
            axios.get(`${jsonUrl}/users?email=${str}`)
                .then(res => {
                    resolve(res.data.length === 1 ? { "password": res.data[0].password, "id": res.data[0].id } : false);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    try {
        return await checkEmail(returnPassword);
    } catch (error) {
        console.error(error.message); // 錯誤拋出
    }
}





















//更新是否有填寫基本資料狀態
function infoConfirm(getId) {
    axios.patch(`${jsonUrl}/users/${sessionStorage.getItem("id")}`, { "infoConfirm": 1 })
        .then(function (res) {
            if (res.status === 200) console.log('---更新成功---');
        })
        .then(function (res) {
            setTimeout(() => {
                window.location.href = `/learn-books/pages/index.html`;
            }, 600);
        })
        .catch(function (error) {
            console.log(error);
        });
}

//更新基本資料欄位
export function updateInfo(willInput, isStudentTag, isTeacherTag) {
    console.log('---填寫完畢開始更新---');
    const updateObj = {};
    //-----開始更新基本資料-----
    for (let i = 0; i < willInput.length; i++) { //其餘欄位
        updateObj[willInput[i].name] = willInput[i].value;
    }
    updateObj.learningTag = isStudentTag.map(e => e.value).join(','); // 學生標籤
    updateObj.tutoringTags = isTeacherTag.map(e => e.value).join(','); // 老師標籤



    axios.patch(`${jsonUrl}/information/${sessionStorage.getItem("id")}`, updateObj)
        .then(function (res) {
            if (res.status === 200) {
                console.log(res);
                infoConfirm(`${sessionStorage.getItem("id")}`);
                sessionStorage.setItem('user', res.data.userName);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    //-----結束更新基本資料-----
}

//獲取個人基本資料
export function getUserInfo(userId) {
    axios.get(`${jsonUrl}/information?userId=${userId}`)
        .then(res => {
            sessionStorage.setItem('user', res.data[0].userName);
        })
        .catch(error => {
            console.log(error);
        });
}

//設定SessionStorage
export function mySessionStorage(inputRes, hrefPage, token) {

    console.log('---設定sessionStorage---');
    console.log(inputRes, hrefPage, token);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('email', inputRes.email);
    sessionStorage.setItem('id', inputRes.id);
    console.log('---設定完畢，準備跳轉---');
    setTimeout(() => {
        window.location.href = `/learn-books/pages/${hrefPage}.html`;
    }, 500);
}

//清除設定SessionStorage
export function clearSessionStorage() {
    console.log('---清除sessionStorage---');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('user');
    console.log('---清除完畢，準備跳轉---');
    setTimeout(() => {
        window.location.href = `/learn-books/pages/index.html`;
    }, 200);
}