export const cart = [];

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
}