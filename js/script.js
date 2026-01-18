const products = [
  {
    id: 1,
    name: "Nike Air Jordan 1",
    price: 3500000,
    img: "./img/NikeAirJordan1.jpg",
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    price: 2800000,
    img: "./img/AdidasUltraboost.jpg",
  },
  {
    id: 3,
    name: "Puma RS-X3",
    price: 2200000,
    img: "./img/PumaRS_X3.jpg",
  },
  {
    id: 4,
    name: "Nike Air Force 1",
    price: 2500000,
    img: "./img/NikeAirForce1.jpg",
  },
  {
    id: 5,
    name: "Nike Dunk Low Retro SE",
    price: 1700000,
    img: "./img/NikeDunkLowRetroSE.png",
  },
  {
    id: 6,
    name: "Nike Zoom Vomero 5",
    price: 3000000,
    img: "./img/NikeZoomVomero5.png",
  },
  {
    id: 7,
    name: "Nike Shox R4",
    price: 2100000,
    img: "./img/NikeShoxR4.png",
  },
  {
    id: 8,
    name: "Air Jordan 4 Retro Flight Club",
    price: 4000000,
    img: "./img/AirJordan4RetroFlightClub.png",
  },
];

let cart = JSON.parse(localStorage.getItem("sneakerCart")) || [];

document.addEventListener("DOMContentLoaded", () => {
  updateCart();
});

// Hiển thị sản phẩm
function displayProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
            <div class="img-container">
                <img src="${product.img}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">${product.price.toLocaleString()}đ</p>
                <button class="btn-add" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Thêm vào giỏ
                </button>
            </div>
        </div>
    `
    )
    .join("");
}
displayProducts();

// Thêm vào giỏ hàng
function addToCart(id) {
  const product = products.find((p) => p.id === id);

  // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    // Nếu đã có, chỉ tăng số lượng
    existingItem.quantity += 1;
  } else {
    // Nếu chưa có, thêm mới với quantity = 1
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

// Thêm hàm này để lưu dữ liệu bất cứ khi nào giỏ hàng cập nhật
function saveCartToLocal() {
  localStorage.setItem("sneakerCart", JSON.stringify(cart));
}

// Cập nhật giao diện giỏ hàng
function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("total-price");
  const cartCount = document.getElementById("cart-count");

  // Tính tổng số lượng icon giỏ hàng
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.innerText = totalQuantity;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "";
    document.getElementById("empty-cart-msg").style.display = "block";
  } else {
    document.getElementById("empty-cart-msg").style.display = "none";
    cartItemsContainer.innerHTML = cart
      .map(
        (item, index) => `
            <tr class="cart-item-row">
                <td>
                    <div class="cart-item-info">
                        <img src="${item.img}" alt="">
                        <span class="cart-item-name">${item.name}</span>
                    </div>
                </td>
                <td>${item.price.toLocaleString()}đ</td>
                <td>
                    <div class="quantity-control">
                        <button onclick="changeQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                </td>
                <td><b>${(
                  item.price * item.quantity
                ).toLocaleString()}đ</b></td>
                <td>
                    <button class="btn-remove" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `
      )
      .join("");
  }

  const totalMoney = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  totalDisplay.innerText = totalMoney.toLocaleString() + "đ";

  saveCartToLocal();

  cartCount.innerText = totalQuantity;
}

function changeQuantity(index, delta) {
  cart[index].quantity += delta;

  // Nếu số lượng giảm xuống 0 thì xóa khỏi giỏ
  if (cart[index].quantity <= 0) {
    removeFromCart(index);
  } else {
    updateCart();
  }
}

function toggleCart() {
  document.getElementById("cart-modal").classList.toggle("active");
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// 1. Hàm bật/tắt menu khi bấm vào Avatar/Tên
function toggleUserMenu(event) {
  // Ngăn chặn sự kiện click lan ra ngoài (bubble up)
  // để tránh việc vừa mở xong lại bị hàm window.onclick đóng ngay lập tức
  if (event) event.stopPropagation();

  const dropdown = document.getElementById("user-dropdown");
  dropdown.classList.toggle("active");
}

// 2. Xử lý đóng menu khi bấm ra ngoài
window.addEventListener("click", function (event) {
  const userProfile = document.getElementById("user-profile");
  const dropdown = document.getElementById("user-dropdown");

  // Kiểm tra nếu menu đang mở VÀ vị trí bấm KHÔNG nằm trong cụm user-profile
  if (dropdown.classList.contains("active")) {
    if (!userProfile.contains(event.target)) {
      dropdown.classList.remove("active");
      console.log("Đã đóng menu do bấm ra ngoài");
    }
  }
});

// Xử lý sự kiện khi bấm nút "Tiến hành thanh toán"
document.querySelector(".btn-checkout").onclick = function () {
  if (cart.length === 0) {
    alert("Giỏ hàng của bạn đang trống!");
    return;
  }
  // Chuyển hướng sang trang checkout
  window.location.href = "../html/checkout.html";
};
