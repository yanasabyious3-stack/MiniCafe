const products = [

    { name: "Espresso", price: 3000 },

    { name: "Cappuccino", price: 4000 },

    { name: "Café Latte", price: 4500 },

    { name: "Iced Latte", price: 5000 },

    { name: "Iced Americano", price: 4000 },

    { name: "Chocolate Cake", price: 5000 },

    { name: "Cheesecake", price: 5500 }

];

let cart = [];

function formatPrice(price) {

    return price.toLocaleString("en-US") + " IQD";

}

function orderCoffee(productName) {

    const product = products.find(item => item.name === productName);

    if (!product) {

        alert("Sorry, this product was not found.");

        return;

    }

    cart.push(product);

    updateCart();

    alert(product.name + " added to your order!");

}

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}

function clearCart() {

    cart = [];

    updateCart();

}

function updateCart() {

    const cartList = document.getElementById("cart-items");

    const cartTotal = document.getElementById("cart-total");

    const cartCount = document.getElementById("cart-count");

    if (!cartList || !cartTotal || !cartCount) {

        return;

    }

    cartList.innerHTML = "";

    cart.forEach((item, index) => {

        const row = document.createElement("div");

        row.className = "cart-item";

        const name = document.createElement("span");

        name.textContent = item.name + " — " + formatPrice(item.price);

        const removeButton = document.createElement("button");

        removeButton.textContent = "Remove";

        removeButton.type = "button";

        removeButton.addEventListener("click", () => removeItem(index));

        row.append(name, removeButton);

        cartList.appendChild(row);

    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    cartTotal.textContent = formatPrice(total);

    cartCount.textContent = cart.length;

}

document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll(".product").forEach(card => {

        const heading = card.querySelector("h3");

        if (!heading) return;

        const productName = heading.textContent.trim();

        const button = document.createElement("button");

        button.textContent = "Add to Order";

        button.type = "button";

        button.className = "order-button";

        button.addEventListener("click", () => {

            orderCoffee(productName);

        });

        card.appendChild(button);

    });

    const footer = document.querySelector("footer");

    if (!footer) return;

    const cartSection = document.createElement("section");

    cartSection.id = "order-cart";

    cartSection.innerHTML = `

        <h2>Your Order (<span id="cart-count">0</span>)</h2>

        <div id="cart-items"></div>

        <p class="cart-total">

            Total: <strong id="cart-total">0 IQD</strong>

        </p>

        <button id="clear-cart" type="button">Clear Order</button>

    `;

    footer.before(cartSection);

    document.getElementById("clear-cart").addEventListener("click", clearCart);

    updateCart();

});