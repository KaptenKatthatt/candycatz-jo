const base = "https://www.bortakvall.se/api/v2";
const products = "/products/";

const fetchProductId = async function (productId: number) {
  const res = await fetch(base + products + productId);
  const data = await res.json();
  return data;
};

export const getCandyProductInfo = async function (productId: number) {
  const result = await fetchProductId(productId);
  return await result;
};
console.log("Get one candyproduct", await getCandyProductInfo(6545));

const fetchAllProducts = async function () {
  const res = await fetch(base + products);
  const data = await res.json();
  return data;
};

export const getAllCandyInfo = async function () {
  const result = await fetchAllProducts();
  return result;
};

console.log("Get all the candy", await getAllCandyInfo());
