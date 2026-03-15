# 🍭 CandyCatz 🍬

Welcome to **CandyCatz**, a sweet little frontend candy shop built with TypeScript, Vite, SCSS, and Bootstrap.
The app fetches candy products from the Bortakväll API, lets users fill their cart with goodies, and completes checkout by sending orders to the API. 🛒✨

## 🍫 Features

- Candy product listing fetched from API
- Category filtering and product browsing
- Shopping cart with local storage persistence
- Offcanvas cart + checkout summary
- Checkout form and order submission
- Responsive UI with custom SCSS + Bootstrap
- Unit tests (Vitest) and E2E tests (Playwright)

## 🧁 Tech Stack

- **Language:** TypeScript
- **Bundler:** Vite
- **Styling:** SCSS, Bootstrap, Bootstrap Icons
- **Testing:** Vitest, Playwright
- **Linting:** ESLint, Stylelint

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## 🛠️ Available Scripts

- `npm run dev` — Start Vite dev server
- `npm run build` — Type-check and build
- `npm run preview` — Preview built app
- `npm run lint` — Run ESLint for TypeScript files
- `npm run lint:fix` — Auto-fix ESLint issues
- `npm run stylelint` — Run Stylelint for SCSS files
- `npm run stylelint:fix` — Auto-fix Stylelint issues
- `npm run test:unit` — Run unit tests (Vitest)
- `npm run test:e2e` — Run E2E tests (Playwright)
- `npm run test:e2e:headed` — Run E2E tests in headed mode
- `npm run test:all` — Run unit + E2E tests

## 🧪 Testing

Install Playwright browsers before running E2E tests:

```bash
npx playwright install
```

On Linux, if system dependencies are missing:

```bash
npx playwright install-deps
```

Show Playwright HTML report:

```bash
npx playwright show-report
```

## 📁 Project Structure

```text
src/
  components/      UI rendering and interaction modules
  services/        API calls and type definitions
  assets/scss/     SCSS partials and app styles
  main.ts          Application entry point

tests/
  unit/            Unit tests (Vitest)
  e2e/             End-to-end tests (Playwright)

docs/
  TESTING.md       Internal testing notes
  CODE_REVIEW.md   Internal code review notes
```

## 🍡 API

This project uses endpoints from:

- `https://www.bortakvall.se/api/v2/products`
- `https://www.bortakvall.se/api/v2/products/{id}`
- `https://www.bortakvall.se/api/v2/users/81/orders` (POST)

## 📝 Notes

- Cart data is persisted in browser local storage.
- The app auto-start is disabled in test mode (`import.meta.env.MODE === "test"`).

## 🤝 Contributing

Built with sugar, teamwork, and lots of candy energy by:

- Sophia — GitHub: [@Hajfia](https://github.com/Hajfia) 🍓
- Klara — GitHub: [@KlaraTL](https://github.com/KlaraTL) 🍇

Want to contribute?

- Fork the repo
- Create a feature branch
- Commit your changes
- Open a pull request

## 📜 License

This project is for educational purposes.
