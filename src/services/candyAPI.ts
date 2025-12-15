const base = "https://www.bortakvall.se/api/v2";
const products = "/products/";

const fetchProductId = async function (productId: number) {
  try {
    const res = await fetch(base + products + productId);
    if (!res.ok) {
      throw new Error(`FetchProduct error ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error sending order:", error);
  }
};

export const getCandyProductInfo = async function (productId: number) {
  const res = await fetchProductId(productId);
  return await res;
};
// console.log("Get one candyproduct", await getCandyProductInfo(6545));

const fetchAllProducts = async function () {
  try {
    const res = await fetch(base + products);
    if (!res.ok) {
      throw new Error(`fetchAllProducts error ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error sending order:", error);
  }
};

export const getAllCandyInfo = async function () {
  const res = await fetchAllProducts();
  return res;
};

// console.log("Get all the candy", await getAllCandyInfo());
