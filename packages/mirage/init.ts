import { makeServer } from "./src/server";

declare global {
  interface Window {
    mirage?: unknown;
  }
}

if (process.env.NODE_ENV === "development") {
  makeServer();
}
