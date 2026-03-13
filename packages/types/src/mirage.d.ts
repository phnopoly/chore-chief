// src/types/global.d.ts
import type { Server } from "miragejs";
import type { AppSchema } from "@/mirage/types";

declare global {
  interface Window {
    __mirageServer__?: Server<AppSchema>;
  }
}

export {};
