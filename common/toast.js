function showToast(message, isError = false) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "left",
    style: {
      background: isError
        ? "linear-gradient(to right, #ff5f6d, #ffc371)" // Màu đỏ cam khi lỗi
        : "linear-gradient(to right, #00b09b, #96c93d)", // Màu xanh khi thành công
    },
  }).showToast();
}
