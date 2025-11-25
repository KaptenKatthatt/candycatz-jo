const base = "https://www.bortakvall.se/api/v2";
const products = "/products";

const getProductId = function (productId: number) {
  const res = fetch(`${base}${products}${productId}`);

  const data = res.JSON();

  return data;
};
