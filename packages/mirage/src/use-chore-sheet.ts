import { useEffect, useState } from "react";
import { Chore } from "./schema";

export const parseChore = (row: Record<string, unknown>): Chore => ({
  id: String(row.id),
  name: String(row.name),
  frequency: String(row.frequency),
  points: Number(row.points),
  category: String(row.category),
});

export const useChorehcampSheet = () => {
  const [data, setData] = useState<Chore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_CHOREHCAMP_SHEET_URL) {
      throw new Error("Missing CHOREHCAMP_SHEET_URL env var");
    }
    fetch(process.env.NEXT_PUBLIC_CHOREHCAMP_SHEET_URL)
      .then((res) => res.text())
      .then((text) => {
        const json = JSON.parse(text.substring(47).slice(0, -2));
        const rows = json.table.rows as Array<{ c: Array<{ v: unknown }> }>;

        const headers = rows[0].c.map((h) => String(h.v));

        const records = rows.slice(1).map((row) => Object.fromEntries(headers.map((h, i) => [h, row.c[i]?.v ?? null])));

        setData(records.map(parseChore));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load chores", err);
        setLoading(false);
      });
  }, []);

  return { data, loading };
};
