import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "tests/setup/setupTests.ts",
    // Explicit globals: false to require explicit imports for better IDE support and clearer tests.
    globals: false,
  },
  optimizeDeps: {
    exclude: ["bootstrap"],
  },
  ssr: {
    noExternal: ["bootstrap"],
  },
});
