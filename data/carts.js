export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
    },

    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
    },
  ];
}

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

  //Check if item Id is already in cart, if so add it to the matchingId variable
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingId = cartItem;
    }
  });

  //If anything is in matchingId variable, update the quantity of product id
  //Otherwise push the new item into cart
  if (matchingId) {
    matchingId.quantity = matchingId.quantity + quantity;
  } else {
    cart.push({
      productId,
      quantity,
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function currentCartQuantity() {
  let cartQuantity = 0;
  
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  
  return cartQuantity;
}
