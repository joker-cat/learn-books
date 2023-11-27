//判斷當前有沒有token來顯示登入前後的navber
import { clearSessionStorage } from "/js/_sharedvariables.js";

const controlRender = document.querySelector('.control-render');
const isTokenNull = sessionStorage.getItem("token") !== null;

function isSignin() {
    controlRender.innerHTML = `
        <div class="nav-member">
            <div class="dropdown btn d-lg-inline-block d-none">
                <a href="" class="btn-notify dropdown-toggle" id="dropdownNotify" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="bi bi-bell"></i>
                    <small class="notifyNum">2</small>
                </a>
                <ul class="dropdown-menu text-small notifyList" aria-labelledby="dropdownNotify">
                    <li class="notify-item">
                        <a class="dropdown-item" href="#">
                            <div class="profile-pic">
                                <div class="innerImg"
                                    style="background-image: url(/assets/images/profile-pic.jpg);">
                                </div>
                            </div>
                            <div class="notifyInfo">
                                <span>家教課程 應徵通知</span>
                                <h6 class="uaerName">糖糖喵</h6>
                                <p class="notifContent">
                                    應徵成為您的家教課程『徵JavaScript 準備面試』的家教老師。
                                </p>
                                <small>通知時間<time>2020.01.01 00:00 </time></small>
                            </div>
                        </a>
                    </li>
                    <li class="notify-item">
                        <a class="dropdown-item" href="#">
                            <div class="profile-pic">
                                <div class="innerImg"
                                    style="background-image: url(/assets/images/profile-pic.jpg);">
                                </div>
                            </div>
                            <div class="notifyInfo">
                                <span>家教課程 應徵通知</span>
                                <h6 class="uaerName">糖糖喵</h6>
                                <p class="notifContent">
                                    應徵成為您的家教課程『徵JavaScript 準備面試』的家教老師。
                                </p>
                                <small>通知時間<time>2020.01.01 00:00 </time></small>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="dropdown btn brn-User d-lg-inline-block d-none">
                <a href="#" class="dropdown-toggle d-flex align-items-center" id="dropdownUser1"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <div class="profile-pic">
                        <div class="innerImg" style="background-image: url(/assets/images/profile-pic.jpg);">
                        </div>
                    </div>
                </a>
                <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                    <li><a class="dropdown-item" href="memberTeacher.html"><i class="bi bi-person-fill"></i>會員中心</a></li>
                    <li><a class="dropdown-item" href="setting.html"><i class="bi bi-gear"></i>帳號設定</a></li>
                    <li><a class="dropdown-item" href="member.html"><i class="bi bi-people"></i>個人檔案</a></li>
                    <li><a class="dropdown-item" href="memberBook.html"><i class="bi bi-book"></i>我的揪團</a></li>
                    <li><a class="dropdown-item" href="memberTeacher.html"><i class="bi bi-highlighter"></i>我的家教</a>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item sign-out"><i class="bi bi-power"></i>登出</a></li>
                </ul>
            </div>
        </div>
    `;
    const signOut = document.querySelector('.sign-out');
    signOut.addEventListener('click', () => clearSessionStorage());
}

function needSignin() {
    controlRender.innerHTML = `
    <a href="./login.html" class="btn btn-outline-primary me-2 px-4">登入</a>
    <a href="./register.html" class="btn btn-primary px-4">註冊</a>
    `;
}

window.addEventListener("load", function () {
    console.log('navbar window.onload...');
    console.log('目前有Token?', isTokenNull);
    isTokenNull ? isSignin() : needSignin();
});