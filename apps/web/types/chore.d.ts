enum Frequency {
  DAILY = "daily",
  AFTER_USE = "after use",
  WEEKLY = "weekly",
  BIMONTHLY = "bimonthly",
  MONTHLY = "monthly",
  QUARTERLY = "quarterly",
  SEMIANNUAL = "semiannual",
  ANNUAL = "annual",
  SEASONAL = "seasonal",
  AS_NEEDED = "as needed",
}

interface Category {
  name: string;
  description?: string;
  chores: Chore[];
}

interface Chore {
  id: string;
  name: string;
  points: number;
  frequency?: Frequency;
  category?: string;
}

interface CategoryFrequencies {
  [frequency: string]: Chore[];
}

interface ChoresData {
  [category: string]: CategoryFrequencies;
}

interface SelectedFrequencies {
  [frequency: string]: boolean;
}

interface SelectedChores {
  [choreId: string]: boolean;
}

interface SelectedCategories {
  [categoryKey: string]: boolean;
}
