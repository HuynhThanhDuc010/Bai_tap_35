// Mảng dữ liệu gồm 6 sản phẩm mẫu.
const products = [
  { id: 1, name: "Laptop Lenovo IdeaPad", description: "Laptop học tập và làm việc hằng ngày.", price: "14.500.000₫", icon: "💻" },
  { id: 2, name: "Điện thoại Samsung Galaxy", description: "Điện thoại màn hình sắc nét, pin bền.", price: "8.990.000₫", icon: "📱" },
  { id: 3, name: "Tai nghe Bluetooth", description: "Tai nghe không dây nhỏ gọn, tiện lợi.", price: "650.000₫", icon: "🎧" },
  { id: 4, name: "Bàn phím cơ", description: "Bàn phím cơ phù hợp học tập và chơi game.", price: "890.000₫", icon: "⌨️" },
  { id: 5, name: "Chuột không dây", description: "Chuột máy tính thiết kế gọn nhẹ.", price: "350.000₫", icon: "🖱️" },
  { id: 6, name: "Màn hình máy tính", description: "Màn hình rộng, hình ảnh rõ nét.", price: "3.200.000₫", icon: "🖥️" }
];

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const clearButton = document.getElementById("clearButton");
const searchMessage = document.getElementById("searchMessage");
const resultCount = document.getElementById("resultCount");

// Chuẩn hóa tên một lần, tránh chuyển chữ thường lại ở mỗi lần gõ.
const searchableProducts = products.map(product => ({
  ...product,
  normalizedName: product.name.toLocaleLowerCase("vi")
}));

function displayProducts(productArray) {
  productList.replaceChildren();

  if (productArray.length === 0) {
    const message = document.createElement("p");
    message.className = "empty-state";
    message.textContent = "Không tìm thấy sản phẩm phù hợp. Vui lòng thử từ khóa khác.";
    productList.appendChild(message);
    resultCount.textContent = "0 sản phẩm";
    return;
  }

  productArray.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    const visual = document.createElement("div");
    visual.className = "product-visual";
    visual.textContent = product.icon;

    const info = document.createElement("div");
    info.className = "product-info";

    const name = document.createElement("h3");
    name.textContent = product.name;

    const description = document.createElement("p");
    description.className = "product-description";
    description.textContent = product.description;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = product.price;

    info.append(name, description, price);
    card.append(visual, info);
    productList.appendChild(card);
  });

  resultCount.textContent = `${productArray.length} sản phẩm`;
}

function searchProducts() {
  // trim() bỏ khoảng trắng thừa; toLocaleLowerCase() không phân biệt hoa thường.
  const keyword = searchInput.value.trim().toLocaleLowerCase("vi");

  const filteredProducts = searchableProducts.filter(product =>
    product.normalizedName.includes(keyword)
  );

  searchMessage.classList.remove("error");

  if (keyword === "") {
    searchMessage.textContent = "Hiển thị tất cả sản phẩm.";
  } else if (filteredProducts.length === 0) {
    searchMessage.textContent = `Không tìm thấy sản phẩm có tên phù hợp với "${searchInput.value.trim()}".`;
    searchMessage.classList.add("error");
  } else {
    searchMessage.textContent = `Tìm thấy ${filteredProducts.length} sản phẩm.`;
  }

  displayProducts(filteredProducts);
}

searchInput.addEventListener("input", searchProducts);

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  searchProducts();
  searchInput.focus();
});

// Hiển thị tất cả sản phẩm khi vừa mở trang.
displayProducts(products);
