import { createServer } from "miragejs";
import { choresSeed } from "./chores";
import { Chore, choreModel } from "./schema";

export const makeServer = () =>
  createServer({
    models: {
      chore: choreModel,
    },

    seeds(server) {
      Object.entries(choresSeed).forEach(([room, frequencies]) => {
        Object.entries(frequencies).forEach(([frequency, items]) => {
          items.forEach((task) =>
            server.create("chore", {
              ...task,
              room,
              frequency,
            } as Chore),
          );
        });
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/chores", (schema) => schema.all("chore"));

      this.get("/chores/:room", (schema, req) => {
        const room = req.params.room;
        return schema.all("chore").models.filter((c) => (c.attrs as Chore).room === room);
      });

      this.get("/chores/:room/:frequency", (schema, req) => {
        const { room, frequency } = req.params;
        return schema
          .all("chore")
          .models.filter((c) => (c.attrs as Chore).room === room && (c.attrs as Chore).frequency === frequency);
      });
    },
  });
