import { defineConfig } from "cypress";

export default defineConfig({
  video: true,
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.cy.{js,ts,jsx,tsx}",
    supportFile: "cypress/support/e2e.ts",
  },
  // Optional: component testing for Next:
  // component: {
  //   devServer: { framework: 'react', bundler: 'vite' },
  //   specPattern: 'cypress/component/**/*.cy.{ts,tsx}',
  // },
});
