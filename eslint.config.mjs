import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "package-lock.json",
      "packages/**/dist/**",
      "apps/**/dist/**",
      "apps/**/.next/**",
      "packages/**/.next/**",
      "apps/web/next-env.d.ts",
      "apps/api/next-env.d.ts",
    ],
  },

  js.configs.recommended,
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        console: "readonly",
        fetch: "readonly",
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        process: "readonly",
      },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: { parser: tsparser },
    plugins: { "@typescript-eslint": tseslint },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
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
  {
    files: [
      "**/*.config.{js,cjs,ts}",
      "**/*config.cjs",
      "**/*rc.cjs",
      "apps/**/jest.config.cjs",
      "jest.config.cjs",
      "cypress.config.*",
      "turbo.config.*",
    ],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        process: "readonly",
      },
    },
  },
  {
    files: ["**/*.mjs", "next.config.mjs", "apps/**/next.config.mjs"],
    languageOptions: {
      sourceType: "module",
      parserOptions: { ecmaVersion: "latest" },
    },
  },
];
