module.exports = {
  root: true,
  env: { es2022: true, node: true, browser: true },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    // Tip: for type-aware rules, set `project` to an array of tsconfig paths per workspace,
    // but it slows linting. We keep it off for speed.
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y", "import", "unused-imports", "simple-import-sort"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "next/core-web-vitals",
    "prettier",
  ],
  settings: {
    react: { version: "detect" },
  },
  rules: {
    // General
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-debugger": "warn",

    // TypeScript
    "@typescript-eslint/no-unused-vars": "off", // handled by unused-imports
    "@typescript-eslint/explicit-function-return-type": "off",

    // Imports
    "import/order": "off",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],

    // React
    "react/prop-types": "off", // using TS
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",

    // Next.js
    "@next/next/no-img-element": "off", // allow <img> if you want; use <Image> in prod
  },
  ignorePatterns: ["node_modules/", "dist/", "build/", ".next/", ".turbo/", "coverage/", "**/*.d.ts"],
};
