import type { AddressData } from "../components/accordian";
import { getCartArrayFromLocalStorage } from "../components/localStorage";
import type { CheckoutData } from "./candyApiTypes";

export const createOrdertoSend = async function (orderData: AddressData) {
  const orderItemFromLocalStorage = getCartArrayFromLocalStorage();

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

export const sendOrder = async function (newOrderData: CheckoutData) {
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

    const responseData = await response.json();

    if (responseData.status !== "success") {
      console.log("Problems with the sent order", responseData.status);
      return;
    }

    console.log("API svar:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending order:", error);
  }
};
