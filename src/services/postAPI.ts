interface SubmittedOrderData {
  customer_first_name: string;
  customer_last_name: string;
  customer_address: string;
  customer_postcode: number;
  customer_city: string;
  customer_email: string;
  order_total: string;
  order_items: {
    product_id: number;
    qty: number;
    item_price: number;
    item_total: number;
  }[];
}
const base = "https://www.bortakvall.se";
const postURL = "/users/81/orders";

const postToCyberDyneHQ = async function (orderObj: SubmittedOrderData) {
  const res = await fetch(base + postURL, {
    method: "POST",
    headers: "",
    body: orderObj,
  });

  if (!res.ok) {
    throw new Error(
      `Order posting failed ${(await res).status} ${(await res).statusText}`
    );

    const data = await res.json();
    return data;
  }
};
