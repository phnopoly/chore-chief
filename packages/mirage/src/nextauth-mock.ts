import type { Server } from "miragejs";

const USERS = {
  manideep: { id: "101", name: "Manideep" },
  jesus: { id: "202", name: "Jesus" },
  phong: { id: "1", name: "Phong" },
} as const;

const EXP = () => new Date(Date.now() + 3600 * 1000).toISOString();

export const registerAuthRoutes = (server: Server) => {
  server.get("/session", (_schema, req) => {
    const key = (req.queryParams.user ?? "phong") as keyof typeof USERS;
    return { user: USERS[key], expires: EXP() };
  });

  server.post("/signout", () => ({ ok: true }));
};
