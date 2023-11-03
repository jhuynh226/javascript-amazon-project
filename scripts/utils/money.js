//Converts a price in cents to a dollar amount
export function formatCurrency(priceCents) {
  priceCents = (Math.round(priceCents) / 100).toFixed(2);
  return priceCents;
}

export default formatCurrency;