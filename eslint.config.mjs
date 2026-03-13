import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

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

  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        it: "readonly",
        test: "readonly",
        describe: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        jest: "readonly",
        console: "readonly",
        fetch: "readonly",
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        process: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },

  {
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
    settings: {
      react: { version: "detect" },
    },
  },

  {
    files: [
      "**/*.config.{js,cjs,ts}",
      "**/*config.cjs",
      "**/*rc.cjs",
      "apps/**/jest.config.cjs",
      "**/jest.*.{js,ts,cjs,mjs}",
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
