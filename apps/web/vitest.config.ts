import { defineConfig, mergeConfig } from "vitest/config";
import path from "path";
import baseConfig from "../../vitest.config";

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: ["./vitest.setup.ts"],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
  }),
);
