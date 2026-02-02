const form = document.getElementById("product-form");

const pNameInp = document.getElementById("p-name-inp");
const pPriceInp = document.getElementById("p-price-inp");
const fileInput = document.getElementById("file-input");

const uploadArea = document.getElementById("upload-area");
const previewImg = document.getElementById("file-preview-img");
const previewContainer = document.getElementById("file-preview-container");
const preImgRight = document.getElementById("pre-img");
const removeBtn = document.getElementById("remove-img-btn");

pNameInp.addEventListener("input", () => {
  document.getElementById("pre-name").innerText =
    pNameInp.value || "Tên sản phẩm";
});

pPriceInp.addEventListener("input", () => {
  document.getElementById("pre-price").innerText = pPriceInp.value || 0;
});

// Click vào vùng dash để mở chọn file
uploadArea.onclick = () => fileInput.click();

function handleFile(file) {
  // Tạo đường dẫn tạm thời
  const imageUrl = URL.createObjectURL(file);
  console.log(imageUrl);

  previewImg.src = imageUrl;
  previewContainer.style.display = "flex";

  preImgRight.src = imageUrl;
}

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  console.log(file);
  if (file) {
    handleFile(file);
  }
});

removeBtn.onclick = (e) => {
  e.stopPropagation(); // Ngăn sự kiện click lan ra uploadArea

  const IMG_DEFAULT =
    "https://t4.ftcdn.net/jpg/16/79/44/21/360_F_1679442196_OEsi0AFKie6hYMBpvmXwwRgRYGV4U6Lz.jpg";

  fileInput.value = "";
  previewContainer.style.display = "none";
  preImgRight.src = IMG_DEFAULT;
};

uploadArea.addEventListener("dragover", (e) => {
  e.preventDefault(); // Bắt buộc phải có để trình duyệt cho phép thả file
});

// 3. Khi thả file vào vùng uploadArea
uploadArea.addEventListener("drop", (e) => {
  e.preventDefault(); // Ngăn trình duyệt tự động mở ảnh trong tab mới

  const file = e.dataTransfer.files[0]; // Lấy file từ sự kiện drop
  console.log(file);

  if (file && file.type.startsWith("image/")) {
    // Cập nhật file vào input để lúc submit form vẫn có dữ liệu
    fileInput.files = e.dataTransfer.files;

    handleFile(file);
  } else {
    alert("Vui lòng chỉ thả file ảnh!");
  }
});
