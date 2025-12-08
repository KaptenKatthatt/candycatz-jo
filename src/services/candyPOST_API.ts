import type { AddressData } from "../components/accordian";
import {
  getCartArrayFromLocalStorage,
  getCartArrayFromLocalStorageToCheckout,
} from "../components/localStorage";

export interface OrderItems {
  product_id: number;
  qty: number;
  item_price: number;
  item_total: number;
}

export interface CheckoutData {
  customer_first_name: string;
  customer_last_name: string;
  customer_address: string;
  customer_postcode: string;
  customer_city: string;
  customer_email: string;
  customer_phone?: string;
  order_total: number;
  order_items: OrderItems[];
}

export const createOrdertoSend = async function (
  orderData: AddressData
): Promise<CheckoutData> {
  const orderItemFromLocalStorage = getCartArrayFromLocalStorageToCheckout();

  const orderTotal = orderItemFromLocalStorage.reduce((acc, curr) => {
    return acc + curr.qty * curr.price;
  }, 0);

  const orderItems = orderItemFromLocalStorage.map((product) => ({
    product_id: product.id,
    qty: product.qty,
    item_price: product.price,
    item_total: product.qty * product.price,
  }));

  const newOrder: CheckoutData = {
    customer_first_name: orderData.customer_first_name,
    customer_last_name: orderData.customer_last_name,
    customer_address: orderData.customer_address,
    customer_postcode: orderData.customer_postcode,
    customer_city: orderData.customer_city,
    customer_email: orderData.customer_email,
    customer_phone: orderData.customer_phone,
    order_total: orderTotal,
    order_items: orderItems,
  };

  console.log("getlocalstorage", getCartArrayFromLocalStorage());
  console.log("orderItemFromLocalStorage", orderItemFromLocalStorage);
  console.log("New order i create", newOrder);

  await sendOrder(newOrder);
  return newOrder;
};

export const sendOrder = async function (
  newOrderData: CheckoutData
): Promise<CheckoutData | undefined> {
  try {
    console.log("Sending order:", newOrderData);
    const response = await fetch(
      "https://www.bortakvall.se/api/v2/users/81/orders",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrderData),
      }
    );

    if (!response.ok) {
      console.log("Order was not sent successful: ", response.status);
      return;
    }

    const responseData: CheckoutData = await response.json();
    console.log("API svar:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending order:", error);
  }
};
