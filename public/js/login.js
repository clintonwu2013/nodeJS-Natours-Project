/* eslint-disable*/
const login = async (email, password) => {
  const res = await axios({
    method: "POST",
    url: "http://localhost:8080/api/v1/users/login",
    data: {
      email: email,
      password: password
    }
  });
  console.log(res);
};
document.querySelector(".form").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});
