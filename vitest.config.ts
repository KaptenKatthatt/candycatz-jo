import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "tests/setup/setupTests.ts",
    globals: false,
  },
  optimizeDeps: {
    exclude: ["bootstrap"],
  },
  ssr: {
    noExternal: ["bootstrap"],
  },
});
