import React, { useEffect, useState } from "react";

export const useChores = (filePath: string) => {
  const [chores, setChores] = useState<ChoresData | null>(null);

  useEffect(() => {
    fetch(filePath)
      .then((res) => res.json())
      .then((data) => setChores(data))
      .catch((err) => console.error("Failed to load chores:", err));
  }, [filePath]);

  return chores;
};

interface Chore {
  id: string;
  name: string;
  points: number;
  category: string;
}

interface CategoryFrequencies {
  [frequency: string]: Chore[];
}

interface ChoresData {
  [category: string]: CategoryFrequencies;
}

const ChoreForm: React.FC<{ filePath: string }> = ({ filePath }) => {
  const choresData = useChores(filePath);
  const [selectedCategories, setSelectedCategories] = useState<Record<string, boolean>>({});
  const [selectedChores, setSelectedChores] = useState<Record<string, boolean>>({});

  if (!choresData) {
    return <div className="text-center py-20 text-gray-500">Loading chores...</div>;
  }

  const frequencyOrder = ["daily", "after use", "weekly", "monthly", "quarterly", "semiannual", "annual", "as needed"];

  const handleCategoryToggle = (category: string, checked: boolean) => {
    setSelectedCategories((prev) => ({ ...prev, [category]: checked }));

    if (!checked) {
      setSelectedChores((prev) => {
        const updated = { ...prev };
        const freqMap = choresData[category];
        if (freqMap) {
          Object.values(freqMap)
            .flat()
            .forEach((chore) => delete updated[chore.id]);
        }
        return updated;
      });
    }
  };

  const handleChoreToggle = (choreId: string, checked: boolean) => {
    setSelectedChores((prev) => ({ ...prev, [choreId]: checked }));
  };

  const handleSubmit = () => {
    const chosenCategories = Object.entries(selectedCategories)
      .filter(([, selected]) => selected)
      .map(([key]) => key);

    const chosenChores = Object.entries(selectedChores)
      .filter(([, selected]) => selected)
      .map(([id]) => {
        const found = Object.entries(choresData)
          .flatMap(([cat, freqMap]) =>
            Object.entries(freqMap).flatMap(([freq, chores]) =>
              chores.map((chore) => ({ ...chore, category: cat, freq })),
            ),
          )
          .find((c) => c.id === id);
        return found ? `${found.category} - ${found.name} (${found.freq}, ${found.points} pts)` : `Unknown chore ${id}`;
      });

    alert(`Selected Categories: ${chosenCategories.join(", ")}\nSelected Chores:\n${chosenChores.join("\n")}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10 box-border mx-auto max-w-5xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Chore Selection Form</h1>

      {/* Step 1: Category selection */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
        {Object.keys(choresData).map((category) => (
          <label key={category} className="border rounded-lg p-3 shadow-sm bg-white flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedCategories[category] || false}
              onChange={(e) => handleCategoryToggle(category, e.target.checked)}
            />
            <span className="capitalize font-medium">{category}</span>
          </label>
        ))}
      </div>

      {/* Step 2: Frequencies and chores */}
      {Object.entries(choresData).map(([category, freqMap]) => {
        if (!selectedCategories[category]) return null;
        return (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 capitalize">{category}</h2>
            {frequencyOrder
              .filter((freq) => freqMap[freq])
              .map((freq) => (
                <div key={freq} className="mb-6">
                  <h3 className="text-lg font-medium mb-2 capitalize">
                    ({freqMap[freq].length}) {freq}
                  </h3>
                  {freqMap[freq].map((chore) => (
                    <label key={chore.id} className="flex items-center space-x-2 ml-4 mb-2">
                      <input
                        type="checkbox"
                        checked={selectedChores[chore.id] || false}
                        onChange={(e) => handleChoreToggle(chore.id, e.target.checked)}
                      />
                      <span>
                        {chore.name}{" "}
                        <span className="text-xs text-gray-500">
                          ({chore.points} pts, {chore.category})
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              ))}
          </div>
        );
      })}

      <div className="text-center mt-10">
        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Submit
        </button>
      </div>
    </div>
  );
};

export default ChoreForm;
