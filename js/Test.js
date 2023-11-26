import { axios } from "../main.js";
export function signup(name) {
  axios
    .post("http://localhost:3000/signup", {
      email: `${name}@gmail.com`,
      password: "123456",
      infoConfirm: 0,
      resetPassword: 0,
      level: 1,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function login(name) {
  axios
    .post("http://localhost:3000/login", {
      email: `${name}@gmail.com`,
      password: "123456",
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
