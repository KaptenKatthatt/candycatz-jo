import type { AddressData } from "./accordian";
import type { CartProduct } from "./cart";
import {
  getCartArrayFromLocalStorage,
  getCartArrayFromLocalStorageToCheckout,
} from "./localStorage";

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

export interface OrderItems {
  product_id: number;
  qty: number;
  item_price: number;
  item_total: number;
}

export const createOrdertoSend = function (orderData: AddressData) {
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

  return newOrder;
};

export const sendOrder = async function (orderData: AddressData) {
  const newOrder = createOrdertoSend(orderData);
  console.log("Orderitems", newOrder.order_items);
  console.log("newOrder", newOrder);

  // Send order to API
  const response = await fetch(
    "https://www.bortakvall.se/api/v2/users/81/orders",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    }
  );

  if (!response.ok) {
    console.log("Order was not successful.");
    return;
  }

  const responseData = await response.json();
  console.log(responseData);
  return responseData;
};
