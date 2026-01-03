import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "tests/setup/setupTests.ts",
    // Note: Vitest's default is `globals: false`; we set this explicitly to avoid polluting the global namespace and to require explicit imports of `describe`, `it`, `expect`, etc. for clearer tests and better IDE support.
    globals: false,
  },
  optimizeDeps: {
    exclude: ["bootstrap"],
  },
  ssr: {
    noExternal: ["bootstrap"],
  },
});
