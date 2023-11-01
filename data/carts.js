//Loads cart from local storage
export let cart = JSON.parse(localStorage.getItem("cart"));

//If there is nothing in cart, then use these default values
if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
    },

    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "2",
    },
  ];
}

//Saves cart into local storage
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

//Adds products to cart
export function addToCart(productId) {
  //matchingId variable to check if product ID is already in cart
  let matchingId;

  //Obtain the number of items to add to cart from the drop down selector
  let quantity = Number(
    document.querySelector(`.js-quantity-selector-${productId}`).value
  );

  //Loop through all items in the cart
  cart.forEach((cartItem) => {
    //Check if product is already in cart, if so save it to the matchingId variable
    if (productId === cartItem.productId) {
      matchingId = cartItem;
    }
  });

  //If anything is in matchingId variable, update the quantity of product id
  if (matchingId) {
    matchingId.quantity = matchingId.quantity + quantity;
  }

  //Otherwise push the new item into cart
  else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: "1",
    });
  }

  //Save updated cart into local storage
  saveToStorage();
}

//Removes product from cart
export function removeFromCart(productId) {
  //Create a new cart array
  const newCart = [];

  //Loop through all the cart items in cart
  cart.forEach((cartItem) => {
    //If cart item is not equal to the product item you want to remove
    if (cartItem.productId !== productId) {
      //Push the cart item into newCart
      newCart.push(cartItem);
    }
  });

  //Update the cart array with the removed product
  cart = newCart;

  //Saves new cart into local storage
  saveToStorage();
}

//Calculate total cart quantity
export function calculateCartQuantity() {
  //Intiailize cartQuantity to 0
  let cartQuantity = 0;

  //Loop through each cart item in cart
  cart.forEach((cartItem) => {
    //Add each cart item quantity into the cartQuantity
    cartQuantity += cartItem.quantity;
  });

  //returns the new cart quantity
  return cartQuantity;
}

//Updates the quantity of a cart's product by passing it the id and new quantity
export function updateQuantity(productId, newQuantity) {
  //Loop through each cart item in cart
  cart.forEach((cartItem) => {
    //If cart items productId is equal to the passed productId
    if (cartItem.productId === productId) {
      //Update cart item's quantity with the new quantity
      cartItem.quantity = newQuantity;
    }
  });

  //Save the new modified cart into local storage
  saveToStorage();
}
