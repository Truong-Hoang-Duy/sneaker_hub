/**
 * @section DOM Selectors
 * @description Định nghĩa và truy xuất các phần tử (nút đăng nhập, đăng ký, input, ...)
 */
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const registerName = document.querySelector(
  "#register-form input[type='text']",
);
const registerEmail = document.querySelector(
  "#register-form input[type='email']",
);
const registerPassword = document.querySelector(
  "#register-form input[type='password']",
);

const loginEmail = document.querySelector("#login-form input[type='email']");
const loginPassword = document.querySelector(
  "#login-form input[type='password']",
);

const btnLoginNav = document.getElementById("btn-login-nav");
const userProfile = document.getElementById("user-profile");
const userDropdownDashboard = document.getElementById(
  "user-dropdown-dashboard",
);

const btnGoogle = document.querySelector(".btn-google");
// ------------------------------------------

/**
 * @section Register Account
 * @description Sử dụng email và password để đăng ký
 */
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let msg = "";
  let isErr = false;
  const name = registerName.value;

  auth
    .createUserWithEmailAndPassword(registerEmail.value, registerPassword.value)
    .then((userCredential) => {
      var user = userCredential.user;
      console.log(user);
      console.log(db);

      // 1. Lưu tên vào Auth Profile
      user.updateProfile({ displayName: name });

      // 2. Tạo document người dùng trong Firestore với role mặc định
      return db.collection("users").doc(user.uid).set({
        uid: user.uid,
        displayName: name,
        email: registerEmail.value,
        role: "user", // Mặc định là khách hàng
        createdAt: new Date(),
      });
    })
    .then(() => {
      showToast("Đăng ký thành công");

      // registerName.value = "";
      // registerEmail.value = "";
      // registerPassword.value = "";
      registerForm.reset();
    })
    .catch((error) => {
      var errorCode = error.code;
      //   var errorMessage = error.message;
      console.log(error);

      const errorMsg = getAuthErrorMessage(errorCode);
      showToast(errorMsg, true);
    });
});
// ------------------------------------------

/**
 * @section Login Account
 * @description Sử dụng email và password để đăng nhập
 */

// Logic cũ
// loginForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   auth
//     .signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
//     .then((userCredential) => {
//       // Signed in
//       var user = userCredential.user;
//       getUser(user);
//       closeAuth();
//     })
//     .catch((error) => {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//     });
// });

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  auth
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL) // Lưu lại để load trang không mất
    .then(() => {
      return auth.signInWithEmailAndPassword(
        loginEmail.value,
        loginPassword.value,
      );
    })
    .then((userCredential) => {
      // Lưu mốc thời gian đăng nhập mới nhất
      localStorage.setItem("loginTimestamp", new Date().getTime());
      getUser(userCredential.user);

      showToast("Đăng nhập thành công");
      closeAuth();
    })
    .catch((error) => {
      console.error(error);
    });
});
// ------------------------------------------

/**
 * @section Auth State Changed
 * @description Kiểm tra thông tin đăng nhập khi load lại trang
 */
auth.onAuthStateChanged((user) => {
  // onAuthStateChanged sẽ lưu thông tin ở application -> IndexedDB -> firebaseLocalStorageDb (xóa sẽ mất)
  getUser(user);
});

/**
 * @section Logout Account
 * @description Đăng xuất tài khoản
 */
function handleLogout() {
  auth.signOut().then(() => {
    localStorage.removeItem("loginTimestamp");
    window.location.reload();
  });
  return;
}
// ------------------------------------------

/**
 * @section Login Account
 * @description Đăng nhập tài khoản bằng google
 */
// btnGoogle.addEventListener("click", (e) => {
//   firebase
//     .auth()
//     .signInWithPopup(provider)
//     .then((result) => {
//       var credential = result.credential;

//       var token = credential.accessToken;
//       var user = result.user;
//       console.log(user);
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // The email of the user's account used.
//       var email = error.email;
//       // The firebase.auth.AuthCredential type that was used.
//       var credential = error.credential;
//       // ...
//     });
// });

btnGoogle.addEventListener("click", (e) => {
  // Thiết lập Persistence trước khi đăng nhập (duy trì phiên đăng nhập)
  auth
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      return auth.signInWithPopup(provider);
    })
    .then((result) => {
      const user = result.user;
      const isNewUser = result.additionalUserInfo.isNewUser;

      // Lưu mốc thời gian đăng nhập để tính 2 tiếng
      localStorage.setItem("loginTimestamp", new Date().getTime());

      //  Nếu là người dùng mới đăng nhập Google lần đầu, tạo tài khoản trong Firestore
      if (isNewUser) {
        return db.collection("users").doc(user.uid).set({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          role: "user",
          createdAt: new Date(),
        });
      }
    })
    .then(() => {
      showToast("Đăng nhập Google thành công!", true);
      closeAuth(); // Đóng modal đăng nhập
    })
    .catch((error) => {
      console.error("Lỗi Google Auth:", error);
      showToast("Đăng nhập Google thất bại!");
    });
});
