import { createServer, Model, Registry } from "miragejs";
import type { ModelDefinition } from "miragejs/-types";
import { Chore } from "./schema";
import { loadChoresFromSheet } from "./loadChoresFromSheet";

export const choreModel: ModelDefinition<Partial<Chore>> = Model.extend({});

type Models = {
  chore: typeof choreModel;
};

type Factories = Record<string, never>;

export type AppRegistry = Registry<Models, Factories>;

export type AppSchema = AppRegistry & {
  db: {
    chores: Chore[];
  };
};

export const makeServer = (options?: { sheetUrl?: string }) => {
  console.log(options);
  console.log(options?.sheetUrl);
  const server = createServer({
    models: {
      chore: Model,
    },

    routes() {
      this.passthrough("https://docs.google.com/**");
      this.passthrough("https://\*.googleusercontent.com/**");
      this.namespace = "api";
      this.get("/chores", (schema) => schema.all("chore"));
    },
  });
  console.log("ab");
  if (options?.sheetUrl) {
    loadChoresFromSheet(server, options.sheetUrl)
      .then(() => {
        console.info("[Mirage] chores loaded:", server.db.chores.length);
      })
      .catch(console.error);
  }

  return server;
};
