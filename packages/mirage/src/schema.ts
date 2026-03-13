import { Registry, Model } from "miragejs";
import { ModelDefinition } from "miragejs/-types";

// temporary here until we figure out a way for packages to depend on each other in dev
export interface Chore {
  id: string;
  name: string;
  points: number;
  frequency?: string;
  category?: string;
}

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

export const choreModel: ModelDefinition<Partial<Chore>> = Model.extend({});
