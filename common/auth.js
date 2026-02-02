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
  const TWO_HOURS = 2 * 60 * 60 * 1000; // 2 giờ tính bằng miliseconds
  const loginTimestamp = localStorage.getItem("loginTimestamp");
  const now = new Date().getTime();

  if (user) {
    // KIỂM TRA THỜI GIAN: Nếu đã quá 2 tiếng
    if (loginTimestamp && now - loginTimestamp > TWO_HOURS) {
      auth.signOut().then(() => {
        localStorage.removeItem("loginTimestamp");
        alert("Phiên đăng nhập đã hết hạn (2 tiếng). Vui lòng đăng nhập lại.");
        window.location.reload();
      });
      return;
    }

    // NẾU CÒN TRONG HẠN 2 TIẾNG: Hiển thị thông tin như bạn muốn
    btnLoginNav.style.display = "none";
    userProfile.style.display = "flex";

    // Hiển thị tên và check quyền Admin
    document.querySelector(".user-name").innerText =
      user.displayName || user.email;

    // Check quyền admin từ Firestore
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          doc.data().role === "admin"
            ? (userDropdownDashboard.style.display = "block")
            : (userDropdownDashboard.style.display = "none");
        }
      });
  } else {
    // Nếu chưa đăng nhập
    btnLoginNav.style.display = "block";
    userProfile.style.display = "none";
  }
}
