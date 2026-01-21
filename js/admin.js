// Giả lập lấy dữ liệu đơn hàng từ LocalStorage
// (Bạn cần sửa trang Checkout để khi đặt hàng xong thì lưu vào 'customerOrders')
let orders = JSON.parse(localStorage.getItem("customerOrders")) || [];

function renderOrders() {
  const orderList = document.getElementById("order-list");
  const noOrder = document.getElementById("no-order");

  if (orders.length === 0) {
    orderList.innerHTML = "";
    noOrder.style.display = "block";
    return;
  }

  noOrder.style.display = "none";
  orderList.innerHTML = orders
    .map(
      (order, index) => `
                <tr>
                    <td>#${order.id}</td>
                    <td>
                        <strong>${order.customerName}</strong><br>
                        <small>${order.phone}</small>
                    </td>
                    <td>
                        <ul class="order-items-min">
                            ${order.items
                              .map(
                                (item) =>
                                  `<li>${item.name} (x${item.quantity})</li>`,
                              )
                              .join("")}
                        </ul>
                    </td>
                    <td class="order-price">${order.totalAmount.toLocaleString()}đ</td>
                    <td><span class="status-badge pending">Chờ xử lý</span></td>
                    <td>
                        <button class="btn-action view"><i class="fas fa-eye"></i></button>
                        <button class="btn-action delete" onclick="cancelOrder(${index})"><i class="fas fa-trash"></i> Hủy</button>
                    </td>
                </tr>
            `,
    )
    .join("");
}

function cancelOrder(index) {
  if (confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
    orders.splice(index, 1);
    localStorage.setItem("customerOrders", JSON.stringify(orders));
    renderOrders();
  }
}

// Hiển thị thời gian hiện tại
document.getElementById("current-time").innerText = new Date().toLocaleString();
renderOrders();
