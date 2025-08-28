/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  testMatch: ["<rootDir>/src/**/*.(test|spec).[tj]s?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};
