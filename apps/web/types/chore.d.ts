interface Chore {
  id: string;
  name: string;
  frequency: string;
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
