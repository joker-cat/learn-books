import { axios } from "/main.js";

//json-server:port
import { jsonUrl } from "/api/_sharedvariables.js";
import { Axios } from "axios";


//建立讀書會文章
export function createBookArticle(obj) {
    console.log('---開始新增讀書會貼文---');
    axios
        .post(`${jsonUrl}/bookClubs`, obj)
        .then((res) => {
            if (res.status === 201) {
                console.log('---讀書會文章創立成功---');
                setTimeout(() => {
                    window.location.href = `/learn-project/pages/bookClub.html`;
                }, 200);
            }
        })
        .catch(err => {
            console.error(err);
        });
}

//讀書會列表撈取
export async function init() {
    function getBookArticle(str) {
        return new Promise((resolve, reject) => {
            axios.get(`${jsonUrl}/bookClubs`)
                .then(res => {
                    (res.status === 200) ? resolve(res.data) : null;
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    try {
        return await getBookArticle();
    } catch (error) {
        console.error(error.message);
    }
}

//渲染貼文
export function renderData(arrData) {
    let str = '';
    arrData.forEach(ele => {
        str += `
        <div class="col" data-article="${ele.id}">
        <a href="./bookClub-detail.html?dataArticle=${ele.id}" class="infoCard">
            <div class="infoState">
                <span class="cardType">讀書會</span>
                <span class="cardState">揪團中</span>
                <div class="profile-pic">
                    <div class="innerImg"
                        style="background-image: url(/assets/images/profile-pic.jpg);">
                    </div>
                </div>
            </div>
            <div class="TxtCard">
                <h3 class="infoTitle">${ele.title}</h3>
                <ul class="infoDetail">
                    <li><span>日期</span>${ele.date}</li>
                    <li><span>地點</span>${ele.location}</li>
                    <li><span>時間</span>${ele.time}</li>
                    <li><span>人數</span>${ele.number}/4</li>
                </ul>
            </div>
        </a>
    </div>
        `;
    });
    return str;
}

//撈取點選貼文資訊
export function getArticle(num) {
    console.log(num);
    axios.get(`${jsonUrl}/bookClubs/${num}?_expand=user`)
        .then(res => {
            if (res.status === 200) {
                console.log(res);
                return res.data
            }
        })
        .catch(error => {
            console.log(error);
        });
}


//判斷是否有填寫個資 infoConfirm
export async function getInfoStatus(id) {
    console.log(id);
    try {
        const result = await axios.get(`${jsonUrl}/users?id=${id}`);
        if (result.status === 200) {
            return result.data[0].infoConfirm;
        }
    } catch (error) {
        console.log(error);
    }
}