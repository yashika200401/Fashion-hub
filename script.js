let cart = JSON.parse(localStorage.getItem("cart")) || [];

// LOAD CART
function loadCart() {
  let container = document.getElementById("cart-items");
  let total = 0;

  if (!container) return; // prevents error on other pages

  container.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" class="cart-img">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>

        <div>
          <button onclick="decrease(${index})">-</button>
          ${item.quantity}
          <button onclick="increase(${index})">+</button>
        </div>

        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = total + 50;
}

// ADD TO CART
function addToCart(name, price, image) {
  let existing = cart.find(p => p.name === name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount(); // 🔥 added
  alert("Added to cart 🛒");
}

// UPDATE CART COUNT (🔥 NEW)
function updateCartCount() {
  let count = cart.length;
  document.querySelectorAll(".cart-count").forEach(el => {
    el.innerText = count;
  });
}

// INCREASE
function increase(index) {
  cart[index].quantity++;
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// DECREASE
function decrease(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// REMOVE
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount(); // 🔥 added
}

// PLACE ORDER
function placeOrder() {
  let address = document.getElementById("address").value;

  if (address === "") {
    alert("Please enter address ❗");
    return;
  }

  alert("Order placed successfully 🎉");

  localStorage.removeItem("cart");
  window.location.href = "index.html";
}

// RUN ON PAGE LOAD
updateCartCount();
