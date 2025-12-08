export interface SubmittedOrderData {
  customer_first_name: string;
  customer_last_name: string;
  customer_address: string;
  customer_postcode: string;
  customer_city: string;
  customer_email: string;
  customer_phone?: string;
  order_total: string;
  order_items: {
    product_id: number;
    qty: number;
    item_price: number;
    item_total: number;
  }[];
}

const base = "https://www.bortakvall.se/api/v2";
const postURL = "/users/81/orders";

export const postToCyberDyneHQ = async function (
  orderData: SubmittedOrderData
) {
  const res = await fetch(base + postURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) {
    throw new Error(`Order posting failed ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  console.log("Response from SkyNet: ", data);
  return data;
};
