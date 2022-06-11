/* eslint-disable*/
const logOutBtn = document.querySelector(".nav__el.nav__el--logout");
const loginForm = document.querySelector(".form--login");

const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:8080/api/v1/users/login",
      data: {
        email: email,
        password: password
      }
    });

    if (res.data.status === "success") {
      alert("logged in successfully");
      window.setTimeout(() => {
        location.assign("/"), 1500;
      });
    }
    console.log(res);
  } catch (err) {
    alert(err.response.data.message);
  }
};
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:8080/api/v1/users/logout"
    });

    if (res.data.status == "success") {
      location.reload(true);
    }
  } catch (err) {
    alert(err);
  }
};

if (logOutBtn) {
  console.log(logOutBtn);
  logOutBtn.addEventListener("click", logout);
}
