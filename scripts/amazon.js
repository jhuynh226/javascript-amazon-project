//Import functions/variables from other files
import { cart, addToCart, calculateCartQuantity } from "../data/carts.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

//Load cart quantity into header
updateCartQuantity();

//Empty string to store generated HTML in
let productsHTML = ``;

function hello() {
  console.log("hello");
}

//Generate HTML for each product and store into productsHTML string
products.forEach((product) => {
  productsHTML =
    productsHTML +
    `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}" />
        </div>

        <div class="product-name limit-text-to-2-lines">${product.name}</div>

        <div class="product-rating-container">
          <img
            class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png"
          />
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${formatCurrency(product.priceCents)}
        </div>

        <div class="product-quantity-container">
          <select class = "js-quantity-selector-${product.id}">
            <option selected value="1">
              1
            </option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png" />
          Added
        </div>

        <button
          class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}"
        >
          Add to Cart
        </button>
      </div>
    `;
});

//Display generated HTML onto the page by storing it in the grid
document.querySelector(".js-products-grid").innerHTML = productsHTML;

//Generate JavaScript for each add to cart button
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  //Global timeout variable
  let addToCartTimeout;

  //Onclick event for each add to cart button
  button.addEventListener("click", () => {
    //Obtain product ID from button's data attribute
    const { productId } = button.dataset;

    //Adds products to cart
    addToCart(productId);

    //Display the added to cart text onclick
    showAddToCartText(addToCartTimeout, productId);

    //Updates Cart quantity
    updateCartQuantity();
  });
});

function showAddToCartText(addToCartTimeout, productId) {
  //Create cart-quantity access to "added to cart" text after hitting the button
  let addToCartText = document.querySelector(`.js-added-to-cart-${productId}`);
  //Add class "added-to-cart-opacity" to manipulate the opacity of the added to cart text
  addToCartText.classList.add("added-to-cart-opacity");

  //If anything is in addToCartTimeout variable, clear the timeout
  if (addToCartTimeout) {
    clearTimeout(addToCartTimeout);
  }

  //Remove the added to cart text after 2 seconds
  addToCartTimeout = setTimeout(() => {
    addToCartText.classList.remove("added-to-cart-opacity");
  }, 2000);
}

//Updates cart quantity display in header
function updateCartQuantity() {
  let cartQuantity = calculateCartQuantity();

  //Changes header cart HTML
  document.querySelector(".cart-quantity").innerHTML = cartQuantity;
}
