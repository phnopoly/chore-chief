const nextJest = require("next/jest");
const createJestConfig = nextJest({ dir: __dirname });

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.web.ts"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.(test|spec).(ts|tsx)",
    "<rootDir>/src/**/*.(test|spec).(ts|tsx)",
    "<rootDir>/__tests__/**/*.(test|spec).(ts|tsx)",
  ],
};

module.exports = createJestConfig(config);
