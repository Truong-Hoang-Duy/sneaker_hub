const form = document.getElementById("product-form");

// Logic Live Preview: Gõ đến đâu hiện đến đó
const inputs = ["p-name", "p-price", "p-img-url"];
inputs.forEach((id) => {
  document.getElementById(id).addEventListener("input", () => {
    document.getElementById("pre-name").innerText =
      document.getElementById("p-name").value || "Tên sản phẩm";
    document.getElementById("pre-price").innerText = Number(
      document.getElementById("p-price").value
    ).toLocaleString();
    document.getElementById("pre-img").src =
      document.getElementById("p-img-url").value ||
      "https://t4.ftcdn.net/jpg/16/79/44/21/360_F_1679442196_OEsi0AFKie6hYMBpvmXwwRgRYGV4U6Lz.jpg";
  });
});

// Xử lý lưu vào LocalStorage
form.onsubmit = function (e) {
  e.preventDefault();
  let allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];

  const newProduct = {
    id: Date.now(),
    name: document.getElementById("p-name").value,
    price: parseInt(document.getElementById("p-price").value),
    img: document.getElementById("p-img").value,
    brand: document.getElementById("p-brand").value,
  };

  allProducts.push(newProduct);
  localStorage.setItem("allProducts", JSON.stringify(allProducts));

  alert("Đã thêm sản phẩm thành công!");
  window.location.href = "index.html"; // Quay lại xem thành quả
};

const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("file-input");
const previewContainer = document.getElementById("file-preview-container");
const previewImg = document.getElementById("file-preview-img");
const removeBtn = document.getElementById("remove-img-btn");
const mainPreview = document.getElementById("pre-img"); // Ảnh bên cột Preview lớn

// Click vào vùng dash để mở chọn file
dropZone.onclick = () => fileInput.click();

// Xử lý khi chọn file
fileInput.onchange = (e) => {
  const file = e.target.files[0];
  if (file) {
    handleFile(file);
  }
};

function handleFile(file) {
  // Tạo đường dẫn tạm thời để hiển thị
  const reader = new FileReader();
  reader.onload = (e) => {
    const url = e.target.result;

    // Hiện ảnh preview nhỏ trong ô upload
    previewImg.src = url;
    previewContainer.style.display = "flex";

    // Cập nhật ảnh preview lớn ở cột bên phải (Live Preview)
    mainPreview.src = url;

    // Lưu dữ liệu vào input ẩn (tạm thời lưu base64)
    document.getElementById("p-img-url").value = url;
  };
  reader.readAsDataURL(file);
}

// Nút xóa ảnh đã chọn
removeBtn.onclick = (e) => {
  e.stopPropagation(); // Ngăn sự kiện click lan ra dropZone
  fileInput.value = "";
  previewContainer.style.display = "none";
  mainPreview.src =
    "https://t4.ftcdn.net/jpg/16/79/44/21/360_F_1679442196_OEsi0AFKie6hYMBpvmXwwRgRYGV4U6Lz.jpg";
  document.getElementById("p-img-url").value = "";
};

// Hiệu ứng kéo thả
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragover");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("dragover");
  const file = e.dataTransfer.files[0];
  if (file) handleFile(file);
});
