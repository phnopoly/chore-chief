import { createServer, Model, Server } from "miragejs";
import type { ModelDefinition } from "miragejs/-types";
import { Chore } from "./schema";
import { choresSeed } from "./chores";

export const choreModel: ModelDefinition<Partial<Chore>> = Model.extend({});

const seedChores = (server: Server): void => {
  for (const [category, frequencies] of Object.entries(choresSeed)) {
    for (const [frequency, chores] of Object.entries(frequencies)) {
      for (const chore of chores) {
        server.create("chore", { ...chore, category, frequency });
      }
    }
  }
};

export const makeServer = (): Server => {
  const server = createServer({
    models: {
      chore: choreModel,
    },
    routes() {
      this.passthrough();
      this.namespace = "api";
      this.get("/chores", (schema) => schema.all("chore"));
    },
  });
  seedChores(server);
  console.info("[Mirage] Loaded chores:", server.db.chores.length);
  return server;
};
