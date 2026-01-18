// Lấy các phần tử
const authModal = document.getElementById("auth-modal");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const btnLoginTab = document.getElementById("toggle-login");
const btnRegisterTab = document.getElementById("toggle-register");

// Gán sự kiện cho nút Đăng nhập trên Nav
document.querySelector(".btn-login").addEventListener("click", () => {
  authModal.style.display = "flex";
});

// Đóng modal
function closeAuth() {
  authModal.style.display = "none";
}

// Chuyển đổi giữa Đăng nhập & Đăng ký
function showAuth(type) {
  if (type === "login") {
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
    btnLoginTab.classList.add("active");
    btnRegisterTab.classList.remove("active");
  } else {
    loginForm.classList.remove("active");
    registerForm.classList.add("active");
    btnLoginTab.classList.remove("active");
    btnRegisterTab.classList.add("active");
  }
}

// Đóng khi click ra ngoài vùng form
window.onclick = function (event) {
  if (event.target == authModal) {
    closeAuth();
  }
};

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#login-password");

togglePassword.addEventListener("click", function (e) {
  // Chuyển đổi kiểu input
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  // Chuyển đổi icon
  this.classList.toggle("fa-eye-slash");
});
