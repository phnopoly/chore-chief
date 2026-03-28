import { Registry, Model } from "miragejs";
import { ModelDefinition } from "miragejs/-types";

import {
  HouseholdDTO,
  MemberDTO,
  ChoreDTO,
  ChoreAssignmentDTO,
  TemplateChoreDTO,
  LookupCategoryDTO,
  LookupFrequencyDTO,
} from "@chore-chief/types";

export const householdModel: ModelDefinition<Partial<HouseholdDTO>> = Model.extend({});
export const memberModel: ModelDefinition<Partial<MemberDTO>> = Model.extend({});
export const choreModel: ModelDefinition<Partial<ChoreDTO>> = Model.extend({});
export const choreAssignmentModel: ModelDefinition<Partial<ChoreAssignmentDTO>> = Model.extend({});
export const templateChoreModel: ModelDefinition<Partial<TemplateChoreDTO>> = Model.extend({});
export const categoryModel: ModelDefinition<Partial<LookupCategoryDTO>> = Model.extend({});
export const frequencyModel: ModelDefinition<Partial<LookupFrequencyDTO>> = Model.extend({});

type Models = {
  household: typeof householdModel;
  member: typeof memberModel;
  chore: typeof choreModel;
  choreAssignment: typeof choreAssignmentModel;
  templateChore: typeof templateChoreModel;
  category: typeof categoryModel;
  frequency: typeof frequencyModel;
};

type Factories = Record<string, never>;

export type AppRegistry = Registry<Models, Factories>;

export type AppSchema = AppRegistry & {
  db: {
    households: HouseholdDTO[];
    members: MemberDTO[];
    chores: ChoreDTO[];
    choreAssignments: ChoreAssignmentDTO[];
    templateChores: TemplateChoreDTO[];
    categories: LookupCategoryDTO[];
    frequencies: LookupFrequencyDTO[];
  };
};
