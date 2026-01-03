# Testing

## E2E-tester (Playwright)

E2E-tester finns i `tests/e2e/` (t.ex. `checkout.spec.ts`) och täcker flödet: lägg i kundvagn → gå till kassan → slutför köp.

### Installation (lokalt)

1. Installera dev-dependencies:
   ```bash
   npm install
   ```
2. Installera Playwright-browsers:
   ```bash
   npx playwright install
   ```
   Vid problem med systemberoenden (Linux) kör:
   ```bash
   sudo npx playwright install-deps
   ```

### Köra tester

- Kör alla tester:
  ```bash
  npm run test:e2e
  ```
- Kör ett enskilt test (headed):
  ```bash
  npx playwright test tests/e2e/checkout.spec.ts --project=chromium --headed
  ```

### Tips

- Playwright konfigurerar `webServer` så att `npm run dev` startas automatiskt innan tester körs.
- Om du kör tester i CI, se till att installation av browsers och systemberoenden läggs till i workflow (`npx playwright install --with-deps` och `sudo apt-get install ...` eller `npx playwright install-deps`).
