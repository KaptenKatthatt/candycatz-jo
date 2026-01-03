import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "tests/setup/setupTests.ts",
    // Note: Vitest's default is `globals: false`; we set this explicitly so tests must import `describe`, `it`, `expect`, etc.
    globals: false,
  },
  optimizeDeps: {
    exclude: ["bootstrap"],
  },
  ssr: {
    noExternal: ["bootstrap"],
  },
});
