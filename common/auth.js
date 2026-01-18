function getAuthErrorMessage(errorCode) {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "Email này đã được sử dụng";

    case "auth/invalid-email":
      return "Email không hợp lệ";

    case "auth/weak-password":
      return "Mật khẩu phải có ít nhất 6 ký tự";

    case "auth/user-not-found":
      return "Tài khoản không tồn tại";

    case "auth/wrong-password":
      return "Mật khẩu không đúng";

    default:
      return "Có lỗi xảy ra, vui lòng thử lại";
  }
}

function getUser(user) {
  if (user) {
    // Lấy thông tin role từ Firestore
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          // Cập nhật giao diện chung
          btnLoginNav.style.display = "none";
          userProfile.style.display = "flex";
          document.querySelector(".user-name").innerText = userData.displayName;

          // KIỂM TRA QUYỀN ADMIN
          if (userData.role === "admin") {
            // window.location.href = "../html/admin.html";
            userDropdownDashboard.style.display = "block";
          } else {
            userDropdownDashboard.style.display = "none";
          }
        }
      });
  } else {
    btnLoginNav.style.display = "block";
    userProfile.style.display = "none";
  }
}
