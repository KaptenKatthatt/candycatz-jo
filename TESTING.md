# Tester — snabbguide

Denna fil beskriver vilka tester som finns och hur du kör dem.

## Typer av tester

- Unit-tester (snabba): Vitest. Filer i `tests/unit/`. Testar funktioner och moduler isolerat.
- E2E-tester (webbläsare): Playwright. Filer i `tests/e2e/`. Simulerar användarflöden (t.ex. kundvagn → checkout).

## Förutsättningar

1. Installera beroenden:
   ```bash
   npm install
   ```
2. Installera Playwright-browsers (endast för E2E):
   ```bash
   npx playwright install
   # På Linux, om systemberoenden saknas:
   npx playwright install-deps
   ```

## Script (i package.json)

- `npm run test:unit`  
  Kör alla unit-tester (Vitest). Snabbt och körs i jsdom.
- `npm run test:e2e`  
  Kör Playwright E2E-tester (headless som standard).
- `npm run test:e2e:headed`  
  Kör Playwright i headed-mode — användbart för felsökning.
- `npm run test:all`  
  Kör först unit-tester och därefter E2E-tester.

## Vanliga kommandon / tips

- Kör en specifik unit-testfil:
  ```bash
  npx vitest run tests/unit/<fil>.spec.ts
  ```
- Kör en specifik E2E-test i Chromium och öppna ett fönster:
  ```bash
  npx playwright test tests/e2e/<fil>.spec.ts --project=chromium --headed
  ```
- Visa Playwright HTML-rapport (efter att tester kört):
  ```bash
  npx playwright show-report
  ```
- Om Playwright inte hittar din app: antingen starta dev-server separat:
  ```bash
  npm run dev
  ```
  eller se till att `webServer` är korrekt konfigurerad i `playwright.config.ts`.

## Felsökning

- Vitest: kör filen isolerat, använd `vi.resetModules()` och återställ mocks i `beforeEach`.
- Playwright: kör headed, aktivera tracing/screenshots och inspektera rapporten (trace/screenshot/artifacts).
- Kontrollera mockningar (localStorage, fetch) i unit-tester om tester flakar.

## CI

- En workflow finns (`.github/workflows/playwright.yml`) som kör unit + E2E på push/PR. Artefakter (report/trace) laddas upp vid fel.

Har du vill du att jag också lägger in en kort README-sektion i `README.md` istället (eller en CI badge), så säger du till.
