// src/mirage/loadChoresFromSheet.ts
import type { Server } from "miragejs";
import { Chore } from "./schema";

const assertString = (value: unknown, field: string): string => {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Invalid or missing ${field}`);
  }
  return value.trim();
};

const assertNumber = (value: unknown, field: string): number => {
  const num = Number(value);
  if (!Number.isFinite(num)) {
    throw new Error(`Invalid number for ${field}`);
  }
  return num;
};

export const parseChore = (row: Record<string, unknown>): Chore => ({
  id: assertString(row.id, "id"),
  name: assertString(row.name, "name"),
  points: assertNumber(row.points, "points"),
  frequency: typeof row.frequency === "string" && row.frequency.trim() ? row.frequency.trim() : undefined,
  category: typeof row.category === "string" && row.category.trim() ? row.category.trim() : undefined,
});

export const realFetch = typeof window !== "undefined" ? window.fetch.bind(window) : fetch;

export const loadChoresFromSheet = async (server: Server, sheetUrl: string) => {
  console.info("[Mirage] loader started");

  const res = await realFetch(sheetUrl); // 👈 BYPASS MIRAGE
  const text = await res.text();

  const json = JSON.parse(text.substring(47).slice(0, -2));
  const rows = json.table.rows;

  const headers = rows[0].c.map((h) => String(h.v));
  const records = rows.slice(1).map((row) => Object.fromEntries(headers.map((h, i) => [h, row.c[i]?.v ?? null])));

  records.forEach((record) => {
    server.create("chore", record);
  });

  console.info("[Mirage] Loaded chores:", server.db.chores.length);
};
