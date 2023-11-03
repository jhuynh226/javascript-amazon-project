export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },

  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },

  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  //Empty variable to store matching deliveryOption
  let deliveryOption;

  //Loop through all options in deliveryOptions array
  deliveryOptions.forEach((option) => {
    //If cart option id matches the id in deliveryOptions array
    if (deliveryOptionId === option.id) {
      //Stores delivery option object into deliveryOption
      deliveryOption = option;
    }
  });

  return deliveryOption;
}