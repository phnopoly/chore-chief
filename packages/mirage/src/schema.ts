import { Registry, Model } from "miragejs";
import { ModelDefinition } from "miragejs/-types";

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

export type FrequencyMap = Record<string, ChoreSeed[]>;
export type CategoryMap = Record<string, FrequencyMap>;
export type ChoreSeed = {
  id: string;
  name: string;
  points: number;
};

export const choreModel: ModelDefinition<Partial<Chore>> = Model.extend({});
