export interface HouseholdDTO {
  id: string;
  name: string;
  memberCount: number;
  bathroomCount: number;
  bedroomCount: number;
  hasAttic: boolean;
  hasBasement: boolean;
  hasDiningArea: boolean;
  hasDriveway: boolean;
  hasGarage: boolean;
  hasLaundryRoom: boolean;
  hasOffice: boolean;
  hasYard: boolean;
  hasHallway: boolean;
  hasLivingRoom: boolean;
}

export interface MemberDTO {
  id: string;
  householdId: string;
  name: string;
  role: string;
  isAdmin: boolean;
  isActive: boolean;
}

export interface ChoreDTO {
  id: string;
  label: string;
  categoryId: string;
  frequencyId: string;
  pts: number;
}

export interface ChoreAssignmentDTO {
  id: string;
  choreId: string;
  memberId: string;
  frequencyId: string;
  pts: number;
  labelOverride?: string;
}

export interface TemplateChoreDTO {
  id: string;
  categoryId: string;
  defaultLabel: string;
  defaultFrequencyId: string;
  defaultPts: number;
}

export interface LookupCategoryDTO {
  id: string;
  label: string;
  selectable: boolean;
}

export interface LookupFrequencyDTO {
  id: string;
  label: string;
  intervalValue: number;
  intervalUnit: "day" | "month";
  sortOrder: number;
  active: boolean;
}

export interface ReferenceDataDTO {
  categories: LookupCategoryDTO[];
  frequencies: LookupFrequencyDTO[];
  templateChore: TemplateChoreDTO;
}
