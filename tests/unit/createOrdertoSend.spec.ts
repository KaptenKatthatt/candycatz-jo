import { vi, test, expect, afterEach } from "vitest";
import { createOrderToSend } from "../../src/services/candyPOST_API";
import * as storage from "../../src/components/localStorage";
import * as accordion from "../../src/components/accordion";

afterEach(() => {
  vi.restoreAllMocks();
});

test("createOrderToSend builds order and calls fetch with correct body", async () => {
  // Mock cart in storage
  vi.spyOn(storage, "getCartArrayFromLocalStorage").mockReturnValue([
    {
      id: 42,
      name: "Lollipop",
      qty: 3,
      price: 15,
      thumbnail: "/img/lollipop.png",
      stock_quantity: 10,
      on_sale: false,
    },
  ] as any);

  // Spy postUserAddressForm to assert it is called with the response
  const postSpy = vi
    .spyOn(accordion, "postUserAddressForm")
    .mockImplementation(() => {
      /* noop */
    });

  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ status: "success", data: { id: 999 } }),
  });
  vi.stubGlobal("fetch", fetchMock as any);

  const address = {
    customer_first_name: "Test",
    customer_last_name: "User",
    customer_address: "Testvägen 1",
    customer_postcode: "11111",
    customer_city: "Teststad",
    customer_email: "test@example.com",
  };

  const order = await createOrderToSend(address as any);

  // Validate returned order
  expect(order.order_items.length).toBe(1);
  expect(order.order_total).toBe(3 * 15);

  // Validate fetch was called with correct payload
  expect(fetchMock).toHaveBeenCalled();
  const callArgs = fetchMock.mock.calls[0];
  const body = JSON.parse(callArgs[1].body);
  expect(body.customer_first_name).toBe("Test");
  expect(body.order_items[0].product_id).toBe(42);
  expect(body.order_total).toBe(3 * 15);

  // Validate postUserAddressForm was called with the parsed response
  expect(postSpy).toHaveBeenCalled();
  expect(postSpy).toHaveBeenCalledWith(
    expect.objectContaining({ status: "success" })
  );
  const postArg = postSpy.mock.calls[0][0];
  expect(postArg.data.id).toBe(999);
});

test("createOrderToSend propagates fetch errors", async () => {
  vi.spyOn(storage, "getCartArrayFromLocalStorage").mockReturnValue([
    {
      id: 1,
      qty: 1,
      price: 5,
      name: "X",
      thumbnail: "",
      stock_quantity: 1,
      on_sale: false,
    },
  ] as any);

  // Spy postUserAddressForm to ensure it is not called on fetch error
  const postSpy = vi
    .spyOn(accordion, "postUserAddressForm")
    .mockImplementation(() => {
      /* noop */
    });

  const fetchMock = vi.fn().mockRejectedValue(new Error("network"));
  vi.stubGlobal("fetch", fetchMock as any);

  const address = {
    customer_first_name: "Err",
    customer_last_name: "Test",
    customer_address: "Nowhere",
    customer_postcode: "00000",
    customer_city: "City",
    customer_email: "err@test",
  };

  await expect(createOrderToSend(address as any)).rejects.toThrow("network");
  expect(postSpy).not.toHaveBeenCalled();
});

test("createOrderToSend sends empty order when cart is empty", async () => {
  vi.spyOn(storage, "getCartArrayFromLocalStorage").mockReturnValue([] as any);
  const postSpy = vi
    .spyOn(accordion, "postUserAddressForm")
    .mockImplementation(() => {
      /* noop */
    });

  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ status: "success", data: { id: 100 } }),
  });
  vi.stubGlobal("fetch", fetchMock as any);

  const address = {
    customer_first_name: "Empty",
    customer_last_name: "Cart",
    customer_address: "Nowhere",
    customer_postcode: "00000",
    customer_city: "Void",
    customer_email: "empty@test",
  };

  const order = await createOrderToSend(address as any);

  expect(order.order_items).toHaveLength(0);
  expect(order.order_total).toBe(0);

  expect(fetchMock).toHaveBeenCalled();
  const callArgs = fetchMock.mock.calls[0];
  const body = JSON.parse(callArgs[1].body);
  expect(body.order_items).toHaveLength(0);
  expect(body.order_total).toBe(0);

  // Validate postUserAddressForm called with success response
  expect(postSpy).toHaveBeenCalled();
  expect(postSpy).toHaveBeenCalledWith(
    expect.objectContaining({ status: "success" })
  );
  const postArg = postSpy.mock.calls[0][0];
  expect(postArg.data.id).toBe(100);
});
