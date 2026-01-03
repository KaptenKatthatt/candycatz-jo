import { postUserAddressForm } from "../components/accordion";
import { type AddressData } from "./candyApiTypes";
import { getCartArrayFromLocalStorage } from "../components/localStorage";
import type { CheckoutData, ResponseData, CartProduct } from "./candyApiTypes";

/**
 * Build a CheckoutData object from a cart array and address data.
 * Exported for easier unit testing without needing to mock fetch or localStorage.
 */
export const buildOrderFromCart = function (
  cartArray: CartProduct[],
  orderData: AddressData
): CheckoutData {
  const orderTotal = cartArray.reduce(
    (acc, curr) => acc + curr.qty * curr.price,
    0
  );

  const orderItems = cartArray.map((product) => ({
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

  return newOrder;
};

export const createOrdertoSend = async function (orderData: AddressData) {
  const orderItemFromLocalStorage = getCartArrayFromLocalStorage();
  const newOrder = buildOrderFromCart(orderItemFromLocalStorage, orderData);

  await sendOrder(newOrder);
  return newOrder;
};

export const sendOrder = async function (newOrderData: CheckoutData) {
  try {
    const response = await fetch(
      "https://www.bortakvall.se/api/v2/users/81/orders",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrderData),
      }
    );

    if (!response.ok) {
      const msg = `Order was not sent successfully: ${response.status}`;
      console.error(msg);
      throw new Error(msg);
    }

    const responseData: ResponseData = await response.json();

    if (responseData.status !== "success") {
      const msg = `Problems with the sent order: ${responseData.status}`;
      console.error(msg, responseData);
      throw new Error(msg);
    }
    postUserAddressForm(responseData);

    return responseData;
  } catch (error) {
    console.error("Error sending order:", error);
    throw error;
  }
};
