//判斷當前有沒有token來顯示登入前後的navber
const controlRender = document.querySelector('.control-render');
const isTokenNull = sessionStorage.getItem("token") !== null;

function isSignin() {
    controlRender.innerHTML = `
        <a href="" class="btn-notify h4"><i class="bi bi-bell"></i></a>
        <a href="memberBook.html" class="d-inline-block">
            <div class="profile-pic">
                <div class="innerImg" style="background-image: url(../assets/images/profile-pic.jpg);"></div>
            </div>
        </a>
    `;
}

function needSignin() {
    controlRender.innerHTML = `
        <a href="login.html">會員登入</a>
        <a href="register.html">會員註冊</a>
    `;
}

window.addEventListener("load", function () {
    console.log('navbar window.onload...');
    console.log('目前有Token?', isTokenNull);
    isTokenNull ? isSignin() : needSignin();
});