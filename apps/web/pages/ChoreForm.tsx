import React, { useEffect, useState } from "react";

export const useChores = () => {
  const [chores, setChores] = useState<ChoresData | null>(null);

  useEffect(() => {
    fetch("/chores.json")
      .then((res) => res.json())
      .then((data) => setChores(data))
      .catch((err) => console.error("Failed to load chores:", err));
  }, []);

  return chores;
};

const ChoreForm: React.FC = () => {
  const choresData = useChores();
  const [selectedCategories, setSelectedCategories] = useState<SelectedCategories>({});
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});

  if (!choresData) {
    return <div className="text-center py-20 text-gray-500">Loading chores...</div>;
  }

  type CategoryKey = keyof typeof choresData;

  const categories = Object.entries(choresData).map(([key, category]) => ({
    key: key as CategoryKey,
    name: category.name,
    description: category.description,
  }));

  const selectedCategoryKeys = Object.entries(selectedCategories)
    .filter(([, isSelected]) => isSelected)
    .map(([key]) => key as CategoryKey);

  const currentCategoryItems =
    selectedCategoryKeys.length > 0
      ? selectedCategoryKeys.flatMap((categoryKey) => {
          const category = choresData[categoryKey];
          if (!category || !category.items) return [];
          return Object.entries(category.items).map(([key, item]) => ({
            key,
            categoryKey,
            categoryName: category.name,
            name: item.name,
            description: item.description,
            chores: item.chores,
          }));
        })
      : [];

  const handleCategoryChange = (categoryKey: string, isChecked: boolean) => {
    setSelectedCategories((prev) => ({ ...prev, [categoryKey]: isChecked }));

    if (!isChecked) {
      setSelectedItems((prev) => {
        const newItems = { ...prev };
        Object.keys(newItems).forEach((itemKey) => {
          if (itemKey.startsWith(`${categoryKey}_`)) delete newItems[itemKey];
        });
        return newItems;
      });
    }
  };

  const handleChoreChange = (choreKey: string, categoryKey: string, itemKey: string, isChecked: boolean) => {
    const fullKey = `${categoryKey}_${itemKey}_${choreKey}`;
    setSelectedItems((prev) => ({ ...prev, [fullKey]: isChecked }));
  };

  const handleSubmit = () => {
    const selectedCategoryNames = selectedCategoryKeys.map((key) => choresData[key].name);
    const selectedItemDetails = Object.entries(selectedItems)
      .filter(([, isSelected]) => isSelected)
      .map(([fullKey]) => {
        const parts = fullKey.split("_");
        if (parts.length >= 3) {
          const categoryKey = parts[0];
          const choreId = parts[parts.length - 1];
          const itemKey = parts.slice(1, -1).join("_");
          const category = choresData[categoryKey];
          const item = category?.items?.[itemKey];
          const chore = item?.chores.find((c) => c.id === choreId);
          return `${category?.name || "Unknown"} - ${item?.name || "Unknown"} - ${
            chore?.name || "Unknown"
          } (${chore?.frequency}, ${chore?.points} pts)`;
        } else return `Invalid Key: ${fullKey}`;
      });

    alert(
      `Selected Categories: ${selectedCategoryNames.join(", ")}\nSelected Items: ${selectedItemDetails.join(", ")}`,
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10 box-border mx-auto max-w-5xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Chore Selection Form</h1>

      {/* Step 1: Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {categories.map((category) => (
          <label key={category.key} className="border rounded-lg p-4 shadow-sm bg-white flex items-start space-x-3">
            <input
              type="checkbox"
              checked={selectedCategories[String(category.key)] || false}
              onChange={(e) => handleCategoryChange(String(category.key), e.target.checked)}
              className="mt-1"
            />
            <div>
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
          </label>
        ))}
      </div>

      {/* Step 2: Items */}
      {selectedCategoryKeys.length > 0 && (
        <div>
          {selectedCategoryKeys.map((categoryKey) => {
            const categoryItems = currentCategoryItems.filter((i) => i.categoryKey === categoryKey);
            return (
              <div key={categoryKey} className="mb-8">
                <h2 className="text-xl font-semibold mb-4">{choresData[categoryKey].name}</h2>
                {categoryItems.map((item) => (
                  <div key={item.key} className="mb-6 border-b pb-3">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    {item.chores.map((chore) => {
                      const fullKey = `${item.categoryKey}_${item.key}_${chore.id}`;
                      const selected = selectedItems[fullKey] || false;
                      return (
                        <div key={chore.id} className="ml-4 mb-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={(e) =>
                                handleChoreChange(
                                  String(chore.id),
                                  String(item.categoryKey),
                                  String(item.key),
                                  e.target.checked,
                                )
                              }
                            />
                            <span>
                              {chore.name}{" "}
                              <span className="text-xs text-gray-500">
                                ({chore.frequency}, {chore.points} pts)
                              </span>
                            </span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      <div className="text-center">
        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Submit
        </button>
      </div>
    </div>
  );
};

export default ChoreForm;
