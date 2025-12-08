import type { CartProduct } from "./cart";
import { getCartArrayFromLocalStorage, getCartArrayFromLocalStorageToCheckout } from "./localStorage";


export interface CheckoutData {
  customer_first_name: string;
  customer_last_name: string;
  customer_address: string;
  customer_postcode: string;
  customer_city: string;
  customer_email: string;
  customer_phone?: string;
  order_total: string;
  order_items: OrderItems[];
}

export interface OrderItems {
  product_id: number;
  qty: number;
  item_price: number;
  item_total: number;
}

let orderItemFromLocalStorage = getCartArrayFromLocalStorageToCheckout();

let orderTotal = orderItemFromLocalStorage.reduce((acc,curr) =>{
  return acc +  (curr.qty * curr.price)
},0);


let orderItems = orderItemFromLocalStorage.map((product) => ({
  product_id: product.id,
  qty: product.qty,
  item_price: product.price,
  item_total: product.qty * product.price,
}));


const createOrdertoSend = function () {
  const newOrder: CheckoutData = {
    customer_first_name: "Kalle",
    customer_last_name: "Anka",
    customer_address: "Musse Pigggatan 13",
    customer_postcode: "12345",
    customer_city: "Ankeborg",
    customer_email: "kalle@ankeborgsposten.ab",
    customer_phone: "123123123",
    order_total: orderTotal,
    order_items: orderItems,
  };
console.log("getlocalstorage", getCartArrayFromLocalStorage());
console.log("orderItemFromLocalStorage", orderItemFromLocalStorage);
console.log("New order i create",newOrder)
return newOrder;
};

export const sendOrder = async function () {
   let newOrder = createOrdertoSend();
  console.log("Orderitems", orderItems);
  console.log("newOrder", newOrder);
  // Send order t API
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

sendOrder();
