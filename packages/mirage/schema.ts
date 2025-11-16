import { Model, Registry } from "miragejs";
import type { ModelDefinition } from "miragejs/-types";

export interface Chore {
  id: string;
  name: string;
  points: number;
  room: string;
  frequency: string;
}

export const choreModel: ModelDefinition<Partial<Chore>> = Model.extend({});

type Models = {
  chore: typeof choreModel;
};

type Factories = Record<string, never>;

export type AppRegistry = Registry<Models, Factories>;

export type AppSchema = {
  all: <K extends keyof Models>(
    modelName: K,
  ) => {
    models: Array<{
      attrs: Chore;
    }>;
  };
};
