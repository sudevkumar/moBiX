export const URL = "http://localhost:5050/api/v1";

export const calculateDiscountedPrice = (price, discount) => {
  const discountedPrice = price - (price * discount) / 100;
  return discountedPrice;
};
