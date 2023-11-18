export function mySessionStorage(inputRes,hrefPage,status) {
    console.log(status);
    console.log(789789789);
    sessionStorage.setItem('token', inputRes.accessToken);
    sessionStorage.setItem('email', inputRes.user.email);
    window.location.href = `/learn-project/pages/${hrefPage}.html`;
}

export const jsonUrl = "http://localhost:3000";