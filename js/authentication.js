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
      msg = "Đăng ký thành công";
    })
    .catch((error) => {
      var errorCode = error.code;
      //   var errorMessage = error.message;
      console.log(error);

      msg = getAuthErrorMessage(errorCode);
      isErr = true;
    })
    .finally(() => {
      if (!isErr) {
        // registerName.value = "";
        // registerEmail.value = "";
        // registerPassword.value = "";
        registerForm.reset();
      }

      Toastify({
        text: msg,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: isErr
            ? "red"
            : "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    });
});

btnGoogle.addEventListener("click", (e) => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;

      var token = credential.accessToken;
      var user = result.user;
      console.log(user);
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  auth
    .signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      getUser(user);
      closeAuth();
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
});

// auth.onAuthStateChanged((user) => {
//   console.log(user);

// });
