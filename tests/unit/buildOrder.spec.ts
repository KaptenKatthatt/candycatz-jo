import { test, expect } from "vitest";
import { buildOrderFromCart } from "../../src/services/candyPOST_API";

test("buildOrderFromCart computes totals and maps items", () => {
  const cart = [
    {
      id: 1,
      name: "A",
      qty: 2,
      price: 10,
      thumbnail: "",
      stock_quantity: 5,
      on_sale: false,
    },
    {
      id: 2,
      name: "B",
      qty: 1,
      price: 20,
      thumbnail: "",
      stock_quantity: 3,
      on_sale: true,
    },
  ];

  const orderData = {
    customer_first_name: "Foo",
    customer_last_name: "Bar",
    customer_address: "Somewhere 1",
    customer_postcode: "11111",
    customer_city: "Town",
    customer_email: "foo@bar.test",
  };

  const order = buildOrderFromCart(cart as any, orderData as any);

  expect(order.order_items.length).toBe(2);
  expect(order.order_total).toBe(2 * 10 + 1 * 20);
  expect(order.order_items[0]).toEqual({
    product_id: 1,
    qty: 2,
    item_price: 10,
    item_total: 20,
  });
});
