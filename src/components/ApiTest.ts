import { getCartArrayFromLocalStorage } from "./localStorage";


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
  id: number;
  qty: number;
  price: number;
  total: number;
}

let orderItemFromLocalStorage = getCartArrayFromLocalStorage();

let orderItems: OrderItems[] = orderItemFromLocalStorage.map((product) => ({
  id: product.id,
  qty: product.qty,
  price: product.price,
  total: product.qty * product.price,
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
    order_total: "12",
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
