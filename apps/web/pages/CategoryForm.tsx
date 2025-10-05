import React, { useState } from "react";

const COMMON_CATEGORIES = ["kitchen", "bathroom", "bedrooms", "living room", "dining room", "laundry room"];
const ADDITIONAL_CATEGORIES = ["garage / workshop", "outdoor", "systems", "entryway / hallways", "kids room / nursery"];

interface CategoryFormProps {
  defaultChecked?: string[];
  onSubmit: (selected: string[]) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ defaultChecked = [], onSubmit }) => {
  const [selectedCategories, setSelectedCategories] = useState<Record<string, boolean>>(
    Object.fromEntries(defaultChecked.map((key) => [key, true])),
  );

  const handleCategoryToggle = (category: string, checked: boolean) =>
    setSelectedCategories((prev) => ({ ...prev, [category]: checked }));

  const handleSubmit = () => {
    const chosen = Object.entries(selectedCategories)
      .filter(([, checked]) => checked)
      .map(([key]) => key);
    onSubmit(chosen);
  };

  return (
    <div className="bg-gray-50 px-8 py-10 mx-auto max-w-5xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Select Chore Categories</h1>

      {/* Common Areas */}
      <div className="space-y-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Common Areas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {COMMON_CATEGORIES.map((category) => (
            <label
              key={category}
              className="border rounded-lg p-3 shadow-sm bg-white flex items-center space-x-2 hover:bg-gray-50 transition"
            >
              <input
                type="checkbox"
                checked={selectedCategories[category] || false}
                onChange={(e) => handleCategoryToggle(category, e.target.checked)}
              />
              <span className="font-medium capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Additional Areas */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Additional Areas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {ADDITIONAL_CATEGORIES.map((category) => (
            <label
              key={category}
              className="border rounded-lg p-3 shadow-sm bg-white flex items-center space-x-2 hover:bg-gray-50 transition"
            >
              <input
                type="checkbox"
                checked={selectedCategories[category] || false}
                onChange={(e) => handleCategoryToggle(category, e.target.checked)}
              />
              <span className="font-medium capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="text-center mt-10">
        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Continue
        </button>
      </div>
    </div>
  );
};

export default CategoryForm;
