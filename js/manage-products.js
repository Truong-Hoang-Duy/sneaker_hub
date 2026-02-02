async function getAllProducts() {
  try {
    const snapshot = await db.collection("products").get();

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(products);
    renderProducts(products);
  } catch (err) {
    console.error("Lỗi lấy products:", err);
  }
}
getAllProducts();

function renderProducts(products) {
  const listContainer = document.getElementById("product-list-admin");
  const noProduct = document.getElementById("no-product");
  document.getElementById("total-products").innerText = products.length;

  if (products.length === 0) {
    listContainer.innerHTML = "";
    noProduct.style.display = "block";
    return;
  }

  noProduct.style.display = "none";
  listContainer.innerHTML = products
    .map(
      (pro) => `
            <tr>
                <td><img src="${pro.image}" class="product-img-td"></td>
                <td><strong>${pro.name}</strong></td>
                <td><span>1</span></td>
                <td><span class="price-text">${pro.price.toLocaleString()}đ</span></td>
                <td>
                    <button class="btn-action view"><i class="fas fa-edit"></i></button>
                    <button class="btn-action delete" onclick="deleteProduct('${pro.id}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `,
    )
    .join("");
}

async function deleteProduct(productId) {
  const ok = confirm("Bạn chắc chắn muốn xoá sản phẩm này?");
  if (!ok) return;

  try {
    await db.collection("products").doc(productId).delete();
    alert("Đã xoá sản phẩm");
    window.location.reload();
  } catch (err) {
    console.error("Lỗi xoá sản phẩm:", err);
    alert("Xoá thất bại");
  }
}
