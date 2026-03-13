const USERS = {
  manideep: { id: "101", name: "Manideep" },
  jesus: { id: "202", name: "Jesus" },
  phong: { id: "1", name: "Phong" },
} as const;

const EXP = () => new Date(Date.now() + 3600 * 1000).toISOString();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerAuthRoutes = function (this: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  this.get("/session", (_schema: any, req: { queryParams: { user: any } }) => {
    const key = (req.queryParams.user ?? "phong") as keyof typeof USERS;
    return { user: USERS[key], expires: EXP() };
  });

  this.post("/signout", () => ({ ok: true }));
};
