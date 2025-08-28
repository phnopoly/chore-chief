import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  projects: [
    {
      displayName: "web",
      preset: "ts-jest",
      testEnvironment: "jsdom",
      rootDir: "<rootDir>/apps/web",
      testMatch: ["<rootDir>/__tests__/**/*.(test|spec).ts?(x)"],
      setupFilesAfterEnv: ["<rootDir>/jest.setup.web.ts"],
      transform: { "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.test.json" }] },
      moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "<rootDir>/jest.styleStub.ts",
        // add path aliases here too if web uses them
      },
    },
    {
      displayName: "api",
      preset: "ts-jest",
      testEnvironment: "node",
      rootDir: "<rootDir>/apps/api",
      testMatch: ["<rootDir>/**/*.(spec|test).ts?(x)"],
      transform: { "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.test.json" }] },
      setupFilesAfterEnv: ["<rootDir>/jest.setup.api.ts"],
      moduleNameMapper: {
        "^@ui/(.*)$": "<rootDir>/../../packages/ui/src/$1",
        "^@utils/(.*)$": "<rootDir>/../../packages/utils/src/$1",
        "^@config/(.*)$": "<rootDir>/../../packages/config/src/$1",
      },
    },
    {
      displayName: "utils",
      preset: "ts-jest",
      testEnvironment: "node",
      rootDir: "<rootDir>/packages/utils",
      testMatch: ["<rootDir>/src/**/__tests__/**/*.(test|spec).ts?(x)"],
      transform: { "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.test.json" }] },
    },
  ],
  transformIgnorePatterns: ["/node_modules/"],
  collectCoverageFrom: ["apps/**/src/**/*.{ts,tsx}", "packages/**/src/**/*.{ts,tsx}", "!**/*.d.ts"],
  coverageDirectory: "<rootDir>/coverage",
};

export default config;
