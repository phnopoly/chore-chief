enum Frequency {
  DAILY = "daily",
  WEEKLY = "weekly",
  BIMONTHLY = "bimonthly",
  MONTHLY = "monthly",
  QUARTERLY = "quarterly",
  SEMIANNUAL = "semiannual",
  ANNUAL = "annual",
  AS_NEEDED = "as needed",
  AFTER_USE = "after use",
  SEASONAL = "seasonal",
}
interface Chore {
  id: string;
  name: string;
  frequency: Frequency;
  points: number;
}

interface Item {
  name: string;
  description: string;
  chores: Chore[];
}

interface Category {
  name: string;
  description: string;
  items: Record<string, Item>;
}

interface SelectedCategories {
  [categoryKey: string]: boolean;
}

interface SelectedItems {
  [itemKey: string]: boolean;
}

interface ChoresData {
  [categoryKey: string]: Category;
}
