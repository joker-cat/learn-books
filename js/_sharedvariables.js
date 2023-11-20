import { axios } from "../main.js";

//json-server:port
export const jsonUrl = "http://localhost:3000";

//註冊
export function newSignup(inputEmail, inputPassword) {
    console.log('---帳號沒註冊過---');
    axios
        .post(`${jsonUrl}/users`, {
            email: inputEmail,
            password: inputPassword,
            infoConfirm: 0, //1為有填寫完成基本資料
            resetPassword: 0, //如果是1個話要賺去修改密碼畫面
            level: 1, //切換家教跟學生的頁面(暫不確定是否用到)
        })
        .then((res) => {
            if (res.status === 201) mySessionStorage(res.data, "setting");
        })
        .catch(err => {
            console.error(err);
        });
}



//檢查信箱是否重複
export async function alreadySignupEmail(userInput) {
    function checkEmail(str) {
        // 返回 Promise
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
        console.error(error.message); // 錯誤拋出
    }
}

//登入檢查
export async function comparison(returnPassword) {
    function checkEmail(str) {
        // 返回 Promise
        return new Promise((resolve, reject) => {
            axios.get(`${jsonUrl}/users?email=${str}`)
                .then(res => {
                    resolve(res.data.length === 1 ? res.data[0].password : false);
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

//設定SessionStorage
export function mySessionStorage(inputRes, hrefPage) {
    console.log(inputRes, hrefPage);
    console.log(inputRes);
    sessionStorage.setItem('token', inputRes.password);
    sessionStorage.setItem('email', inputRes.email);
    window.location.href = `/learn-project/pages/${hrefPage}.html`;
}