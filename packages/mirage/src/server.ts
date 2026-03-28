import { createServer, Model, Server } from "miragejs";
import type { ModelDefinition } from "miragejs/-types";

import {
  HouseholdDTO,
  MemberDTO,
  ChoreDTO,
  ChoreAssignmentDTO,
  LookupCategoryDTO,
  LookupFrequencyDTO,
  TemplateChoreDTO,
} from "@chore-chief/types";

import {
  householdSeeds,
  memberSeeds,
  choreSeeds,
  choreAssignmentSeeds,
  lookupCategorySeeds,
  lookupFrequencySeeds,
  templateChoresSeeds,
} from "./seeds";

const householdModel: ModelDefinition<Partial<HouseholdDTO>> = Model.extend({});
const memberModel: ModelDefinition<Partial<MemberDTO>> = Model.extend({});
const choreModel: ModelDefinition<Partial<ChoreDTO>> = Model.extend({});
const choreAssignmentModel: ModelDefinition<Partial<ChoreAssignmentDTO>> = Model.extend({});
const categoryModel: ModelDefinition<Partial<LookupCategoryDTO>> = Model.extend({});
const frequencyModel: ModelDefinition<Partial<LookupFrequencyDTO>> = Model.extend({});
const templateChoreModel: ModelDefinition<Partial<TemplateChoreDTO>> = Model.extend({});

const seedDatabase = (server: Server) => {
  householdSeeds.forEach((h) => server.create("household", h));
  memberSeeds.forEach((m) => server.create("member", m));
  choreSeeds.forEach((c) => server.create("chore", c));
  choreAssignmentSeeds.forEach((a) => server.create("choreAssignment", a));
  lookupCategorySeeds.forEach((c) => server.create("category", c));
  lookupFrequencySeeds.forEach((f) => server.create("frequency", f));
  templateChoresSeeds.forEach((t) => server.create("templateChore", t));
};

export const makeServer = (): Server => {
  const server = createServer({
    models: {
      household: householdModel,
      member: memberModel,
      chore: choreModel,
      choreAssignment: choreAssignmentModel,
      category: categoryModel,
      frequency: frequencyModel,
      templateChore: templateChoreModel,
    },

    routes() {
      this.namespace = "api";
      this.passthrough();

      this.get("/households", (schema) => schema.all("household"));
      this.get("/members", (schema) => schema.all("member"));
      this.get("/chores", (schema) => schema.all("chore"));
      this.get("/chore-assignments", (schema) => schema.all("choreAssignment"));
      this.get("/reference-data", (schema) => ({
        categories: schema.all("category").models,
        frequencies: schema.all("frequency").models,
        templateChores: schema.all("templateChore").models,
      }));
    },
  });
  seedDatabase(server);

  console.info("[Mirage] Seeded households:", server.db.households.length);
  console.info("[Mirage] Seeded members:", server.db.members.length);
  console.info("[Mirage] Seeded chores:", server.db.chores.length);
  console.info("[Mirage] Seeded assignments:", server.db.choreAssignments.length);
  console.info("[Mirage] Template chores:", server.db.templateChores.length);
  console.info("[Mirage] Categories:", server.db.categories.length);
  console.info("[Mirage] Frequencies:", server.db.frequencies.length);
  return server;
};
