// 1. Lấy dữ liệu từ localStorage
let cart = JSON.parse(localStorage.getItem("sneakerCart")) || [];

// 2. Hàm hiển thị sản phẩm ra trang thanh toán
function renderCheckoutOrder() {
  const orderItemsContainer = document.getElementById("checkout-items");
  let total = 0;

  if (cart.length === 0) {
    orderItemsContainer.innerHTML = "<p>Không có sản phẩm nào.</p>";
    return;
  }

  orderItemsContainer.innerHTML = cart
    .map((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      return `
            <div class="summary-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                <div class="item-info" style="display: flex; gap: 15px; align-items: center;">
                    <img src=".${
                      item.img
                    }" width="60" height="60" style="object-fit: cover; border-radius: 8px;">
                    <div>
                        <p style="font-weight: 600; margin: 0;">${item.name}</p>
                        <p style="font-size: 13px; color: #666; margin: 0;">SL: ${
                          item.quantity
                        } x ${item.price.toLocaleString()}đ</p>
                    </div>
                </div>
                <span style="font-weight: 700;">${itemTotal.toLocaleString()}đ</span>
            </div>
        `;
    })
    .join("");

  // 3. Cập nhật tổng tiền
  document.getElementById("subtotal").innerText = total.toLocaleString() + "đ";
  document.getElementById("final-total").innerText =
    total.toLocaleString() + "đ";
}

// 4. Hàm xác nhận đặt hàng (Xóa giỏ hàng sau khi mua)
function confirmOrder() {
  alert("Chúc mừng! Đơn hàng của bạn đã được tiếp nhận.");
  localStorage.removeItem("sneakerCart"); // Xóa giỏ hàng sau khi thanh toán thành công
  window.location.href = "index.html"; // Quay lại trang chủ
}

// Chạy hàm render khi trang load
renderCheckoutOrder();
