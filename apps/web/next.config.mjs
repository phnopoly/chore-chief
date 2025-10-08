import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    files: ["next.config.mjs", "eslint.config.mjs"],
    languageOptions: {
      sourceType: "module",
      parserOptions: { ecmaVersion: "latest" },
    },
  },

  js.configs.recommended,

  // TypeScript
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsparser,
      globals: {
        React: "readonly",
        console: "readonly",
        fetch: "readonly",
        module: "readonly",
        process: "readonly",
      },
    },
    plugins: { "@typescript-eslint": tseslint },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },

  // React
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: { react, "react-hooks": reactHooks },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/prop-types": "off",
    },
    settings: { react: { version: "detect" } },
  },

  // Generic ESM fallback
  {
    files: ["**/*.mjs", "**/*.mts"],
    languageOptions: {
      sourceType: "module",
      parserOptions: { ecmaVersion: "latest" },
    },
  },

  // Tests
  {
    files: ["**/__tests__/**", "**/*.test.{js,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        it: "readonly",
        expect: "readonly",
        describe: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
  },
];
