import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "tests/setup/setupTests.ts",
    // Note: Vitest's default is `globals: true`. We disable globals so tests must explicitly import `describe`, `it`, `expect`, etc.
    globals: false,
  },
  optimizeDeps: {
    exclude: ["bootstrap"],
  },
  ssr: {
    noExternal: ["bootstrap"],
  },
});
