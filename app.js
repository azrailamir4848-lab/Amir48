const products = [
  {
    id: 1,
    name: "برنج هندی ۱۰ کیلویی",
    price: 2600000,
    icon: "🍚",
    tag: "پرفروش"
  },
  {
    id: 2,
    name: "ماکارونی",
    price: 78000,
    icon: "🍝",
    tag: "پیشنهاد امروز"
  },
  {
    id: 3,
    name: "رب گوجه",
    price: 330000,
    icon: "🥫",
    tag: "تخفیف ویژه"
  },
  {
    id: 4,
    name: "تن ماهی",
    price: 300000,
    icon: "🐟",
    tag: "محبوب"
  }
];

let cart = JSON.parse(localStorage.getItem("shopCart") || "{}");

const fa = n => new Intl.NumberFormat("fa-IR").format(n);
const toman = n => fa(n) + " تومان";

const productsEl = document.getElementById("products");
const resultCount = document.getElementById("resultCount");

function renderProducts(list = products) {
  if (!productsEl) return;

  if (resultCount) {
    resultCount.textContent = fa(list.length) + " محصول";
  }

  productsEl.innerHTML = list.map(p => `
    <article class="card">
      <div class="pic">${p.icon}</div>
      <span class="tag">${p.tag}</span>
      <h3>${p.name}</h3>

      <div class="price">
        ${toman(p.price)}
        <small>برای هر عدد</small>
      </div>

      <button class="add" onclick="addToCart(${p.id})">
        افزودن به سبد
      </button>
    </article>
  `).join("");

  if (!list.length) {
    productsEl.innerHTML =
      '<p style="padding:30px;text-align:center">محصولی پیدا نشد.</p>';
  }
}

function saveCart() {
  localStorage.setItem("shopCart", JSON.stringify(cart));
  renderCart();
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  openCart();
}

function changeQuantity(id, amount) {
  cart[id] = (cart[id] || 0) + amount;

  if (cart[id] <= 0) {
    delete cart[id];
  }

  saveCart();
}

function renderCart() {
  const ids = Object.keys(cart);

  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  const totalEl = document.getElementById("total");

  let total = 0;

  if (cartCount) {
    const count = ids.reduce(
      (sum, id) => sum + cart[id],
      0
    );

    cartCount.textContent = fa(count);
  }

  if (!cartItems) return;

  if (ids.length) {
    cartItems.innerHTML = ids.map(id => {
      const product = products.find(p => p.id == id);
      const const quantity = cart[id];

if (!product) return "";

total += product.price * quantity;

return `
  <div class="cart-item">
    <div>
      <strong>${product.icon} ${product.name}</strong>
      <small>${toman(product.price)}</small>
    </div>
    <div class="qty">
      <button onclick="changeQuantity(${id}, -1)">−</button>
      <span>${quantity}</span>
      <button onclick="changeQuantity(${id}, 1)">+</button>
    </div>
  </div>
`;
}).join("");
} else {
  cartItems.innerHTML = "<p>سبد خرید خالی است.</p>";
}

if (totalEl) {
  totalEl.textContent = toman(total);
}
}

renderProducts();
renderCart();
