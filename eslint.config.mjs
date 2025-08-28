import js from "@eslint/js";
import tseslint from "typescript-eslint";
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

  // Base JS rules for code files
  {
    files: ["**/*.{js,cjs,mjs,jsx,ts,tsx}"],
    ...js.configs.recommended,
  },

  ...tseslint.configs.recommended,

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
      "**/*.config.{js,cjs,mjs,ts}",
      "**/*config.cjs",
      "**/*rc.cjs",
      "apps/**/jest.config.cjs",
      "jest.config.cjs",
      "next.config.*",
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
];
