import { test, expect } from "@playwright/test";

test("legg til i kundvagn, gå till kassan och slutför köp", async ({
  page,
}) => {
  // Intercept order POST and return a successful response
  let requestBody: any = null;
  await page.route(
    "https://www.bortakvall.se/api/v2/users/81/orders",
    async (route, request) => {
      try {
        if (request.postData())
          requestBody = JSON.parse(request.postData() || "{}");
      } catch (e) {
        // ignore
      }

      const response = {
        status: "success",
        data: {
          created_at: new Date().toISOString(),
          customer_address: requestBody?.customer_address || "Testvägen 1",
          customer_city: requestBody?.customer_city || "Stad",
          customer_email: requestBody?.customer_email || "test@example.com",
          customer_first_name: requestBody?.customer_first_name || "Test",
          customer_last_name: requestBody?.customer_last_name || "User",
          customer_phone: requestBody?.customer_phone || "0700000000",
          customer_postcode: requestBody?.customer_postcode || "12345",
          id: 123456,
          items: (requestBody?.order_items || []).map(
            (it: any, idx: number) => ({
              id: idx + 1,
              item_price: it.item_price,
              item_total: it.item_total,
              order_id: 123456,
              product_id: it.product_id,
              qty: it.qty,
            })
          ),
          order_date: new Date().toISOString(),
          order_total: String(requestBody?.order_total || 0),
          updated_at: new Date().toISOString(),
          user_id: 81,
        },
      };

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(response),
      });
    }
  );

  await page.goto("/");

  // Wait for candies to render and click first "Add to cart" button
  await page.waitForSelector(".add-to-cart-btn");
  await page.click(".add-to-cart-btn");

  // The offcanvas should open automatically; click "Gå till kassan" button which has class .checkout-btn
  await page.waitForSelector(".checkout-btn");
  await page.click(".checkout-btn");

  // Now we should see the cart view; click "Fortsätt till kassan" (proceed-to-checkout-btn)
  await page.waitForSelector(".proceed-to-checkout-btn");
  await page.click(".proceed-to-checkout-btn");

  // Fill in the form and submit
  await page.waitForSelector("#inputFirstName");
  await page.fill("#inputFirstName", "Anna");
  await page.fill("#inputLastName", "Testsson");
  await page.fill("#inputEmail", "anna@test.local");
  await page.fill("#inputNumber", "070111222");
  await page.fill("#inputAddress", "Testgatan 5");
  await page.fill("#inputCity", "Teststad");
  await page.fill("#inputZip", "54321");

  // Submit and wait for the intercepted POST to finish
  await Promise.all([
    page.waitForResponse(
      (resp) =>
        resp.url().includes("/api/v2/users/81/orders") && resp.status() === 200
    ),
    page.click("#submit-order-btn"),
  ]);

  // Assert we sent a valid order body
  expect(requestBody).not.toBeNull();
  expect(requestBody.order_items.length).toBeGreaterThan(0);
  expect(requestBody.order_total).toBeGreaterThan(0);

  // Check confirmation is shown with customer's first name
  await page.waitForSelector("text=Orderbekräftelse");
  await expect(page.locator("text=Orderbekräftelse")).toBeVisible();
  await expect(page.locator("text=Smiles, Anna")).toBeVisible();
});
