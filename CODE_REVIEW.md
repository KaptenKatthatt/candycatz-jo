# Code Review — CandyCatz

## Sammanfattning ✅

Projektet är välstrukturerat med separata komponenter för UI, tjänster och templates. Koden är läsbar och TypeScript används för typer — bra!

## Högprioriterade förbättringar (bör åtgärdas) 🔧

- Felhantering och UX vid nätverksfel

  - Vissa fetch-anrop loggar bara fel till console.error men visar ingen användarvänlig återkoppling.
  - Förbättra genom att visa en toast/alert för användaren och återställ UI vid fel.

- Undvik att förlita sig på non-null assertions (!)

  - Många ställen använder `element!` och `candyFound!`. Använd säkrare kontroller eller kasta tydliga fel för att undvika runtime exceptions.

- Lokalt state & localStorage

  - `localStorage` används direkt i flera moduler. Extrahera till ett interface (`StorageService`) för enkla mockar i tester och tydligare ansvarsfördelning.

- Konsolutskrifter

  - Ta bort eller ersätt `console.log`/`console.error` med ett loggnings-API som enkelt kan slås av i produktion eller mockas i tester.

- API-konfiguration
  - URL:er som `https://www.bortakvall.se/api/v2/users/81/orders` är hårdkodade. Flytta dessa till en konfigurationsfil eller env-variabler.

## Kodstil och best practices ⚠️

- Följ TypeScript-striktare regler

  - Aktivera `strict` i `tsconfig.json` (om inte redan på) för att fånga potentiella fel tidigare.

- Minimera DOM-frågor

  - Vissa funktioner gör upprepade `document.querySelector` anrop i renderloopar. Cache:a element eller använd komponentbaserad rendering.

- Funktionens ansvar
  - `createOrdertoSend` räknar totalsumma, bygger order och skickar den — överväg att separera beräkningslogik (ren funktion) från nätverksanrop så att båda blir lättare att testa.

## Tillgänglighet (a11y) 💡

- Flertalet knappar har `aria-label` — bra!
- Kontrollera att offcanvas och accordions hanteras korrekt fokushantering (trappa fram fokus till öppnade sektioner och återställ vid stängning).

## Tester och CI ▶️

- E2E-test med Playwright har lagts till för flödet: "lägg i kundvagn → checkout → slutför köp" (se `tests/e2e/checkout.spec.ts`).
- Rekommendation: Kör Playwright i CI (GitHub Actions) och installera browsers i workflow (`npx playwright install --with-deps` / `npx playwright install-deps` om nödvändigt).
- Lägg till unit-tester för t.ex.:
  - order-beräkning (totalsumma, item totals)
  - `createOrdertoSend` med fetch-mock för att validera request-body och felhantering

## Småförbättringar / kodrensning 🧹

- Ta bort kommenterad/utkommenterad debugkod
- Centralisera strängar som används i UI (t.ex. felmeddelanden) om du planerar i18n
- Konsistent namngivning (camelCase för funktioner och variabler)

## Förslag på nästa steg (prioriterade) 📋

1. Lägg till en `StorageService` och använd dependency injection för att underlätta testbarhet.
2. Introducera CI-jobb för Playwright (GitHub Actions) och lint-/type-check steg.
3. Lägg till unit-tester för beräkningslogik och `createOrdertoSend`.
4. Minska användningen av non-null assertions och hårdkodade API-URL:er.

---

Om du vill kan jag öppna PR(ar) med små förbättringar: t.ex. extrahera storage, lägga till en enkel unit-test för order-beräkning, och ett CI-jobb för Playwright.
