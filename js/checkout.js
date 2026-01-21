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
  // 1. Lấy thông tin từ Form
  const name = document.getElementById("fullname").value;
  const phone = document.getElementById("phone").value;

  if (!name || !phone) {
    alert("Vui lòng điền đầy đủ thông tin giao hàng!");
    return;
  }

  // 2. Tạo đối tượng đơn hàng mới
  const orderId = Date.now().toString().slice(-6); // Tạo mã đơn hàng ngẫu nhiên
  const newOrder = {
    id: orderId,
    customerName: name,
    phone: phone,
    items: cart, // Sử dụng biến cart đã lấy từ localStorage
    totalAmount: cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    ),
    status: "pending",
    date: new Date().toLocaleString(),
  };

  // 3. Lưu vào danh sách đơn hàng cho Admin
  let orders = JSON.parse(localStorage.getItem("customerOrders")) || [];
  orders.push(newOrder);
  localStorage.setItem("customerOrders", JSON.stringify(orders));

  // 4. Xóa giỏ hàng hiện tại
  localStorage.removeItem("sneakerCart");

  // 5. Chuyển hướng sang trang thành công
  window.location.href = `order-success.html?id=${orderId}`;
}

// Chạy hàm render khi trang load
renderCheckoutOrder();
