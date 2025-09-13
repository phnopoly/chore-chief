import React, { useState } from "react";
// @ts-expect-error - JSON module import
import choresData from "../data/chores.json";

type CategoryKey = keyof typeof choresData.categories;

interface SelectedItems {
  [itemKey: string]: boolean;
}

interface SelectedCategories {
  [categoryKey: string]: boolean;
}

interface ChoreDetails {
  frequency: 'daily' | 'weekly' | 'monthly' | '';
  points: 1 | 2 | 3 | 4 | 5 | null;
}

interface SelectedChoreDetails {
  [choreKey: string]: ChoreDetails;
}

interface Chore {
  id: string;
  name: string;
}

interface Item {
  name: string;
  description: string;
  chores: Chore[];
}

interface Category {
  name: string;
  description: string;
  items: {
    [key: string]: Item;
  };
}


const ChoreForm: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<SelectedCategories>({});
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
  const [selectedChoreDetails, setSelectedChoreDetails] = useState<SelectedChoreDetails>({});

  const categories = Object.entries(choresData.categories).map(([key, category]) => ({
    key: key as CategoryKey,
    name: (category as Category).name,
    description: (category as Category).description,
  }));

  const selectedCategoryKeys = Object.entries(selectedCategories)
    .filter(([, isSelected]) => isSelected)
    .map(([key]) => key as CategoryKey);

  const currentCategoryItems = selectedCategoryKeys.length > 0
    ? selectedCategoryKeys.flatMap(categoryKey => {
        const category = choresData.categories[categoryKey];
        if (!category || !category.items) {
          return [];
        }
        
        return Object.entries(category.items).map(([key, item]) => {
          // Add safety checks for the item structure
          const safeItem = item as Record<string, unknown>;
          
          return {
            key,
            categoryKey,
            categoryName: category.name,
            name: (safeItem?.name as string) || 'Unknown Item',
            description: (safeItem?.description as string) || 'No description',
            chores: (safeItem?.chores as Chore[]) || [],
          };
        });
      })
    : [];

  const handleCategoryChange = (categoryKey: string, isChecked: boolean) => {
    setSelectedCategories(prev => ({
      ...prev,
      [categoryKey]: isChecked,
    }));
    
    // Remove items from deselected categories
    if (!isChecked) {
      setSelectedItems(prev => {
        const newItems = { ...prev };
        Object.keys(newItems).forEach(itemKey => {
          // Only remove keys that start with the category key followed by underscore
          // This ensures we only remove keys for this specific category
          if (itemKey.startsWith(`${categoryKey}_`)) {
            delete newItems[itemKey];
          }
        });
        return newItems;
      });
      
      // Also remove chore details for deselected categories
      setSelectedChoreDetails(prev => {
        const newDetails = { ...prev };
        Object.keys(newDetails).forEach(key => {
          if (key.startsWith(`${categoryKey}_`)) {
            delete newDetails[key];
          }
        });
        return newDetails;
      });
    }
  };


  const handleChoreChange = (choreKey: string, categoryKey: string, itemKey: string, isChecked: boolean) => {
    const fullChoreKey = `${categoryKey}_${itemKey}_${choreKey}`;
    setSelectedItems(prev => ({
      ...prev,
      [fullChoreKey]: isChecked,
    }));
    
    // Remove chore details when chore is deselected
    if (!isChecked) {
      setSelectedChoreDetails(prev => {
        const newDetails = { ...prev };
        delete newDetails[fullChoreKey];
        return newDetails;
      });
    } else {
      // Initialize chore details when chore is selected
      setSelectedChoreDetails(prev => ({
        ...prev,
        [fullChoreKey]: {
          frequency: '',
          points: null,
        },
      }));
    }
  };

  const handleFrequencyChange = (choreKey: string, frequency: 'daily' | 'weekly' | 'monthly') => {
    setSelectedChoreDetails(prev => ({
      ...prev,
      [choreKey]: {
        ...prev[choreKey],
        frequency,
      },
    }));
  };

  const handlePointsChange = (choreKey: string, points: 1 | 2 | 3 | 4 | 5) => {
    setSelectedChoreDetails(prev => ({
      ...prev,
      [choreKey]: {
        ...prev[choreKey],
        points,
      },
    }));
  };

  const handleSubmit = () => {
    const selectedCategoryNames = selectedCategoryKeys.map(key => choresData.categories[key].name);
    const selectedItemDetails = Object.entries(selectedItems)
      .filter(([, isSelected]) => isSelected)
      .map(([fullKey]) => {
        const parts = fullKey.split('_');
        
        if (parts.length >= 3) {
          const categoryKey = parts[0];
          // The choreId is always the last part
          const choreId = parts[parts.length - 1];
          // Everything between categoryKey and choreId is the itemKey
          const itemKey = parts.slice(1, -1).join('_');
          const category = choresData.categories[categoryKey];
          const item = category?.items?.[itemKey] as Record<string, unknown>;
          const chores = (item?.chores as Chore[]) || [];
          const chore = chores.find((c: Chore) => c.id === choreId);
          const details = selectedChoreDetails[fullKey];
          const frequency = details?.frequency ? ` (${details.frequency})` : '';
          const points = details?.points ? ` [${details.points}pts]` : '';
          return `${category?.name || 'Unknown Category'} - ${(item?.name as string) || 'Unknown Item'} - ${chore?.name || 'Unknown chore'}${frequency}${points}`;
        } else {
          return `Invalid Key: ${fullKey}`;
        }
      });
    
    console.log("Selected Categories:", selectedCategoryNames);
    console.log("Selected Items:", selectedItemDetails);
    alert(`Selected Categories: ${selectedCategoryNames.join(", ")}\nSelected Items: ${selectedItemDetails.join(", ")}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Chore Selection Form
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a category and choose the items you want to work with. 
            Build your personalized chore routine with ease.
          </p>
        </div>

        {/* Step 1: Category Selection */}
        <div className="card mb-8 animate-fade-in">
          <div className="form-section">
            <div className="form-section-header">
              <h2 className="form-section-title">Step 1: Choose Categories</h2>
              <p className="form-section-description">
                Select one or more categories to see available items
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <label 
                  key={String(category.key)} 
                  className={`category-card ${
                    selectedCategories[String(category.key)] 
                      ? 'category-card-selected' 
                      : 'category-card-unselected'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedCategories[String(category.key)] || false}
                      onChange={(e) => handleCategoryChange(String(category.key), e.target.checked)}
                      className="checkbox-custom mt-1"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2: Items Selection */}
        {selectedCategoryKeys.length > 0 && (
          <div className="card mb-8 animate-slide-up">
            <div className="form-section">
              <div className="form-section-header">
                <h2 className="form-section-title">Step 2: Choose Items</h2>
                <p className="form-section-description">
                  Select items from the selected categories
                </p>
              </div>
              
              <div className="space-y-8">
                {selectedCategoryKeys.map(categoryKey => {
                  const categoryItems = currentCategoryItems.filter(item => item.categoryKey === categoryKey);
                  return (
                    <div key={String(categoryKey)} className="space-y-4">
                      <h3 className="text-lg font-semibold text-primary-600 border-b border-primary-200 pb-2">
                        {choresData.categories[categoryKey].name}
                      </h3>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {categoryItems.map((item) => (
                          <div key={String(item.key)} className="item-card">
                            <div className="item-header">
                              <div>
                                <h4 className="item-title">
                                  {String(item.name || 'Unknown Item')}
                                </h4>
                                <p className="item-description">
                                  {String(item.description || 'No description')}
                                </p>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              {item.chores && Array.isArray(item.chores) && item.chores.length > 0 ? (
                                item.chores.map((chore: Chore) => {
                                  const fullChoreKey = `${String(item.categoryKey)}_${String(item.key)}_${chore.id}`;
                                  const isChoreSelected = selectedItems[fullChoreKey] || false;
                                  const choreDetails = selectedChoreDetails[fullChoreKey];
                                  
                                  return (
                                    <div key={chore.id} className="space-y-3">
                                      <label className="flex items-start space-x-3 cursor-pointer">
                                        <input
                                          type="checkbox"
                                          checked={isChoreSelected}
                                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChoreChange(chore.id, String(item.categoryKey), String(item.key), e.target.checked)}
                                          className="checkbox-custom mt-1"
                                        />
                                        <span className="text-sm font-medium text-gray-700 flex-1">
                                          {chore.name}
                                        </span>
                                      </label>
                                      
                                      {isChoreSelected && (
                                        <div className="chore-details animate-slide-up">
                                          {/* Frequency Selection */}
                                          <div className="mb-4">
                                            <label className="block text-xs font-semibold text-primary-600 mb-2">
                                              Frequency
                                            </label>
                                            <div className="flex space-x-4">
                                              {['daily', 'weekly', 'monthly'].map((freq) => (
                                                <label key={freq} className="flex items-center space-x-2 cursor-pointer">
                                                  <input
                                                    type="radio"
                                                    name={`frequency_${fullChoreKey}`}
                                                    value={freq}
                                                    checked={choreDetails?.frequency === freq}
                                                    onChange={() => handleFrequencyChange(fullChoreKey, freq as 'daily' | 'weekly' | 'monthly')}
                                                    className="radio-custom"
                                                  />
                                                  <span className="text-xs font-medium text-gray-700 capitalize">
                                                    {freq}
                                                  </span>
                                                </label>
                                              ))}
                                            </div>
                                          </div>
                                          
                                          {/* Points Selection */}
                                          <div>
                                            <label className="block text-xs font-semibold text-success-600 mb-2">
                                              Points
                                            </label>
                                            <div className="flex space-x-3">
                                              {[1, 2, 3, 4, 5].map((point) => (
                                                <label key={point} className="flex items-center space-x-2 cursor-pointer">
                                                  <input
                                                    type="radio"
                                                    name={`points_${fullChoreKey}`}
                                                    value={point}
                                                    checked={choreDetails?.points === point}
                                                    onChange={() => handlePointsChange(fullChoreKey, point as 1 | 2 | 3 | 4 | 5)}
                                                    className="radio-custom"
                                                  />
                                                  <span className="text-xs font-medium text-gray-700">
                                                    {point}
                                                  </span>
                                                </label>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })
                              ) : (
                                <p className="text-sm text-gray-500 italic">
                                  No chores available for this item
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Summary Section */}
        {selectedCategoryKeys.length > 0 && (
          <div className="card mb-8 animate-fade-in">
            <div className="form-section">
              <div className="form-section-header">
                <h2 className="form-section-title">Selected Items Summary</h2>
              </div>
              
              <div className="space-y-6">
                <div className="summary-section">
                  <h3 className="summary-title">Selected Categories</h3>
                  <p className="text-sm text-gray-700">
                    {selectedCategoryKeys.map(key => choresData.categories[key].name).join(", ")}
                  </p>
                </div>
                
                <div className="summary-section">
                  <h3 className="summary-title">Selected Items</h3>
                  {Object.entries(selectedItems).filter(([, isSelected]) => isSelected).length > 0 ? (
                    <div className="space-y-4">
                      {selectedCategoryKeys.map(categoryKey => {
                        const categorySelectedItems = Object.entries(selectedItems)
                          .filter(([fullKey, isSelected]) => isSelected && fullKey.startsWith(`${String(categoryKey)}_`))
                          .map(([fullKey]) => {
                            const parts = fullKey.split('_');
                            
                            if (parts.length >= 3) {
                              const choreId = parts[parts.length - 1];
                              const itemKey = parts.slice(1, -1).join('_');
                              const category = choresData.categories[categoryKey];
                              const item = category?.items?.[itemKey] as Record<string, unknown>;
                              const chores = (item?.chores as Chore[]) || [];
                              const chore = chores.find((c: Chore) => c.id === choreId);
                              const details = selectedChoreDetails[fullKey];
                              
                              return { 
                                itemKey, 
                                choreId,
                                itemName: (item?.name as string) || 'Unknown Item', 
                                choreName: chore?.name || 'Unknown chore',
                                frequency: details?.frequency || '',
                                points: details?.points || null
                              };
                            } else {
                              return { 
                                itemKey: 'unknown', 
                                choreId: 'unknown',
                                itemName: 'Invalid Key', 
                                choreName: 'Invalid Key',
                                frequency: '',
                                points: null
                              };
                            }
                          });
                        
                        if (categorySelectedItems.length === 0) return null;
                        
                        return (
                          <div key={String(categoryKey)} className="space-y-2">
                            <h4 className="text-sm font-semibold text-primary-600">
                              {choresData.categories[categoryKey].name}
                            </h4>
                            <div className="space-y-1 pl-4">
                              {categorySelectedItems.map(item => (
                                <div key={`${item.itemKey}_${item.choreId}`} className="text-sm text-gray-700">
                                  <span className="font-medium">• {item.itemName}</span>
                                  <span className="text-gray-500"> - {item.choreName}</span>
                                  {item.frequency && (
                                    <span className="text-primary-600 font-medium"> ({item.frequency})</span>
                                  )}
                                  {item.points && (
                                    <span className="text-success-600 font-medium"> [{item.points}pts]</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      No items selected
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleSubmit}
            disabled={selectedCategoryKeys.length === 0 || Object.values(selectedItems).every(item => !item)}
            className={
              selectedCategoryKeys.length === 0 || Object.values(selectedItems).every(item => !item)
                ? 'btn-disabled'
                : 'btn-primary'
            }
          >
            Submit Selection
          </button>
          <button
            onClick={() => {
              setSelectedCategories({});
              setSelectedItems({});
              setSelectedChoreDetails({});
            }}
            className="btn-secondary"
          >
            Reset Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoreForm;
