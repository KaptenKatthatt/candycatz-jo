const base = "https://www.bortakvall.se/api/v2";
const products = "/products";

const getProductId = async function (productId: number) {
  const res = await fetch(`${base}${products}${productId}`);

  const data = await res.json();

  return data;
};
