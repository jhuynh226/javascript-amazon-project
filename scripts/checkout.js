//Import functions/variables from other files
import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
} from "../data/carts.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

//Load cart quantity into header
updateCartQuantity();

//Empty string to store generated HTML in
let cartSummaryHTML = "";

//Loop through all the items in the cart array
cart.forEach((cartItem) => {
  //Store current cartItem product id into productId
  const productId = cartItem.productId;

  //Empty variable to store matching product
  let matchingProduct;

  //Loop through all products in the products array
  products.forEach((product) => {
    //Get current product id and compare to productId
    if (product.id === productId) {
      //If the productId matches a product id in the product array, store product in matching product
      matchingProduct = product;
    }
  });

  //Generate HTML using the matchingProduct information
  cartSummaryHTML += `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">Delivery date: Tuesday, June 21</div>

    <div class="cart-item-details-grid">
      <img
        class="product-image"
        src="${matchingProduct.image}"
      />

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">$${formatCurrency(
          matchingProduct.priceCents
        )}</div>
        <div class="product-quantity">
          <span> Quantity: <span class="quantity-label js-quantity-label-${
            matchingProduct.id
          }" data-product-id = ${matchingProduct.id}>${
    cartItem.quantity
  }</span> </span>
          <span class="update-quantity-link link-primary js-update-link" data-product-id="${
            matchingProduct.id
          }">
            Update
          </span>

          <input class = "quantity-input js-quantity-input js-quantity-input-${
            matchingProduct.id
          }" data-product-id = "${matchingProduct.id}">
          <span class = "save-quantity-link link-primary js-save-quantity-link" data-product-id="${
            matchingProduct.id
          }">Save</span>
          
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
            matchingProduct.id
          }">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input
            type="radio"
            checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
          />
          <div>
            <div class="delivery-option-date">Tuesday, June 21</div>
            <div class="delivery-option-price">FREE Shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <input
            type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
          />
          <div>
            <div class="delivery-option-date">Wednesday, June 15</div>
            <div class="delivery-option-price">$4.99 - Shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <input
            type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
          />
          <div>
            <div class="delivery-option-date">Monday, June 13</div>
            <div class="delivery-option-price">$9.99 - Shipping</div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
});

//Replace the order-summary HTML with the generated HTML
document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

//Select every delete link on the page
document.querySelectorAll(".js-delete-link").forEach((link) => {
  //Add an onclick event listener to every delete link
  link.addEventListener("click", () => {
    //obtain product id from its data section in the HTML
    const productId = link.dataset.productId;

    //Call method to remove product id from the cart
    removeFromCart(productId);

    //Obtain the container holding the desired delete link from the HTML
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    //Remove the container HTML from the div using the remove method
    //Remove method automatically provided
    container.remove();

    //Updates the cart quantity in the header
    updateCartQuantity();
  });
});

//Obtain all the update links on the page
document.querySelectorAll(".js-update-link").forEach((link) => {
  //Add an onclick event listener to all update links on the page
  link.addEventListener("click", () => {
    //Obtain productid from the data section in the HTML
    const productId = link.dataset.productId;

    //Obtain the container holding the desired update link from the HTML
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    //Add class "is-editing-quantity" to the container holding the update link
    //Adding "is-editing-quantity" makes update-link and quantity-display none while display-input and save-link display initial
    container.classList.add("is-editing-quantity");
  });
});

//Obtain all the save quantity links on the page
document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
  //Add an onclick event listener to all the save links
  link.addEventListener("click", () => {
    //Obtain productId from its data section in the HTML
    const productId = link.dataset.productId;

    //Obtain container holding the delete link from the HTML
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    //Get value from the input field and save it into quantity
    let quantity = Number(
      document.querySelector(`.js-quantity-input-${productId}`).value
    );

    //If quantity is greater than 0
    if (quantity > 0) {
      //Replaces quantity of productId with new quantity
      updateQuantity(productId, quantity);

      //Updates the quantity label with the new quantity
      updateQuantityLabel(productId, quantity);

      //Updates the header tab with the new quantity
      updateCartQuantity();

      //Remove "is-editing-quantity" class from the container holding save link"
      //Removing the "is-editing-quantity" class makes save-link and quantity-input display none while quantity-display and update-link display inital
      container.classList.remove("is-editing-quantity");
    }

    //If quantity is less than 0
    else if (quantity < 0) {
      //Alert that it is an invalid quantity
      alert("Please select a valid quantity");
    }
  });
});

//Obtain all quantity inputs from the page
document.querySelectorAll(".quantity-input").forEach((input) => {
  //Adds onkeydown event for all quantity inputs
  input.addEventListener("keydown", (event) => {
    //Obtain productId from its data section in the HTML
    const productId = input.dataset.productId;

    //If user hits Enter key
    if (event.key === "Enter") {
      //Obtains the container holding the product
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      //Gets value from the input field and saves it in quantity
      let quantity = Number(
        document.querySelector(`.js-quantity-input-${productId}`).value
      );

      //If quantity is greater than 0
      if (quantity > 0) {
        //Replaces quantity of productId with new quantity
        updateQuantity(productId, quantity);

        //Updates the quantity label with the new quantity
        updateQuantityLabel(productId, quantity);

        //Updates the header tab with the new quantity
        updateCartQuantity();

        //Remove "is-editing-quantity" class from the container holding save link"
        //Removing the "is-editing-quantity" class makes save-link and quantity-input display none while quantity-display and update-link display inital
        container.classList.remove("is-editing-quantity");
      }

      //If quantity is less than 0
      else if (quantity < 0) {
        //Alert that it is an invalid quantity
        alert("Please select a valid quantity");
      }
    }
  });
});

//Update header quantity amount
function updateCartQuantity() {
  //Obtains the total cart quantity
  let cartQuantity = calculateCartQuantity();

  //Updates header of checkout page with the new total cart quantity
  document.querySelector(
    ".js-checkout-header-middle-section"
  ).innerHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">${cartQuantity} items</a>)`;
}

//Update quantity display label
function updateQuantityLabel(productId, quantity) {
  //Obtains productId's quantity label
  let quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);

  //Update productId's quantity label with the new quantity
  quantityLabel.innerHTML = `<span class="quantity-label js-quantity-label-${productId}">${quantity}</span>`;
}
