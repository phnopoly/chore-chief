import React, { useState } from "react";
import {
  Container,
  Heading,
  Text,
  Stack,
  VStack,
  HStack,
  Button,
  Card,
  Separator,
} from "@chakra-ui/react";
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
          console.log(`Category ${String(categoryKey)} not found or has no items`);
          return [];
        }
        
        return Object.entries(category.items).map(([key, item]) => {
          // Add safety checks for the item structure
          const safeItem = item as Record<string, unknown>;
          console.log(`Processing item ${String(key)}:`, safeItem);
          
          return {
            key,
            categoryKey,
            categoryName: category.name,
            name: safeItem?.name || 'Unknown Item',
            description: safeItem?.description || 'No description',
            chores: safeItem?.chores || [],
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
          if (itemKey.startsWith(`${categoryKey}_`)) {
            delete newItems[itemKey];
          }
        });
        return newItems;
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
          const itemKey = parts[1];
          const choreId = parts[2];
          const category = choresData.categories[categoryKey];
          const item = category?.items?.[itemKey];
          const chore = item?.chores?.find((c: Chore) => c.id === choreId);
          const details = selectedChoreDetails[fullKey];
          const frequency = details?.frequency ? ` (${details.frequency})` : '';
          const points = details?.points ? ` [${details.points}pts]` : '';
          return `${category?.name || 'Unknown Category'} - ${item?.name || 'Unknown Item'} - ${chore?.name || 'Unknown chore'}${frequency}${points}`;
        } else {
          return `Invalid Key: ${fullKey}`;
        }
      });
    
    console.log("Selected Categories:", selectedCategoryNames);
    console.log("Selected Items:", selectedItemDetails);
    alert(`Selected Categories: ${selectedCategoryNames.join(", ")}\nSelected Items: ${selectedItemDetails.join(", ")}`);
  };

  return (
    <Container maxW="4xl" py={10} bg="gray.50" minH="100vh">
      <VStack align="start" gap={8}>
        <VStack align="start" gap={2}>
          <Heading as="h1" size="xl">
            Chore Selection Form
          </Heading>
          <Text color="gray.600">
            Select a category and choose the items you want to work with.
          </Text>
        </VStack>

        <Card.Root w="100%">
          <Card.Header>
            <Heading size="md">Step 1: Choose Categories</Heading>
            <Text color="gray.600" mt={1}>
              Select one or more categories to see available items
            </Text>
          </Card.Header>
          <Card.Body>
            <Stack gap={3}>
              {categories.map((category) => (
                <label key={String(category.key)} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectedCategories[String(category.key)] || false}
                    onChange={(e) => handleCategoryChange(String(category.key), e.target.checked)}
                    style={{ marginTop: '4px' }}
                  />
                  <VStack align="start" gap={1}>
                    <Text fontWeight="medium">{category.name}</Text>
                    <Text fontSize="sm" color="gray.600">
                      {category.description}
                    </Text>
                  </VStack>
                </label>
              ))}
            </Stack>
          </Card.Body>
        </Card.Root>

        {selectedCategoryKeys.length > 0 && (
          <Card.Root w="100%">
            <Card.Header>
              <Heading size="md">Step 2: Choose Items</Heading>
              <Text color="gray.600" mt={1}>
                Select items from the selected categories
              </Text>
            </Card.Header>
            <Card.Body>
              <Stack gap={6}>
                {selectedCategoryKeys.map(categoryKey => {
                  const categoryItems = currentCategoryItems.filter(item => item.categoryKey === categoryKey);
                  return (
                    <Stack key={String(categoryKey)} gap={3}>
                      <Text fontWeight="bold" color="blue.600" fontSize="md">
                        {choresData.categories[categoryKey].name}
                      </Text>
                      <Stack gap={3} pl={4}>
                        {categoryItems.map((item) => (
                          <Stack key={String(item.key)} gap={2}>
                            <VStack align="start" gap={1}>
                              <Text fontWeight="bold" color="green.600" fontSize="sm">
                                {String(item.name || 'Unknown Item')}
                              </Text>
                              <Text fontSize="sm" color="gray.600">
                                {String(item.description || 'No description')}
                              </Text>
                            </VStack>
                            <Stack gap={2} pl={4}>
                              {item.chores && Array.isArray(item.chores) && item.chores.length > 0 ? (
                                item.chores.map((chore: Chore) => {
                                  const fullChoreKey = `${String(item.categoryKey)}_${String(item.key)}_${chore.id}`;
                                  const isChoreSelected = selectedItems[fullChoreKey] || false;
                                  const choreDetails = selectedChoreDetails[fullChoreKey];
                                  
                                  return (
                                    <Stack key={chore.id} gap={2}>
                                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
                                        <input
                                          type="checkbox"
                                          checked={isChoreSelected}
                                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChoreChange(chore.id, String(item.categoryKey), String(item.key), e.target.checked)}
                                          style={{ marginTop: '4px' }}
                                        />
                                        <Text fontSize="sm" color="gray.700">
                                          {chore.name}
                                        </Text>
                                      </label>
                                      
                                      {isChoreSelected && (
                                        <Stack gap={3} pl={6}>
                                          {/* Frequency Selection */}
                                          <Stack gap={2}>
                                            <Text fontSize="xs" fontWeight="bold" color="blue.600">
                                              Frequency:
                                            </Text>
                                            <HStack gap={4}>
                                              {['daily', 'weekly', 'monthly'].map((freq) => (
                                                <label key={freq} style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                                                  <input
                                                    type="radio"
                                                    name={`frequency_${fullChoreKey}`}
                                                    value={freq}
                                                    checked={choreDetails?.frequency === freq}
                                                    onChange={() => handleFrequencyChange(fullChoreKey, freq as 'daily' | 'weekly' | 'monthly')}
                                                  />
                                                  <Text fontSize="xs" textTransform="capitalize">
                                                    {freq}
                                                  </Text>
                                                </label>
                                              ))}
                                            </HStack>
                                          </Stack>
                                          
                                          {/* Points Selection */}
                                          <Stack gap={2}>
                                            <Text fontSize="xs" fontWeight="bold" color="green.600">
                                              Points:
                                            </Text>
                                            <HStack gap={3}>
                                              {[1, 2, 3, 4, 5].map((point) => (
                                                <label key={point} style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                                                  <input
                                                    type="radio"
                                                    name={`points_${fullChoreKey}`}
                                                    value={point}
                                                    checked={choreDetails?.points === point}
                                                    onChange={() => handlePointsChange(fullChoreKey, point as 1 | 2 | 3 | 4 | 5)}
                                                  />
                                                  <Text fontSize="xs">
                                                    {point}
                                                  </Text>
                                                </label>
                                              ))}
                                            </HStack>
                                          </Stack>
                                        </Stack>
                                      )}
                                    </Stack>
                                  );
                                })
                              ) : (
                                <Text fontSize="sm" color="gray.500" pl={4}>
                                  No chores available for this item
                                </Text>
                              )}
                            </Stack>
                          </Stack>
                        ))}
                      </Stack>
                    </Stack>
                  );
                })}
              </Stack>
            </Card.Body>
          </Card.Root>
        )}

        {selectedCategoryKeys.length > 0 && (
          <Card.Root w="100%">
            <Card.Header>
              <Heading size="md">Selected Items Summary</Heading>
            </Card.Header>
            <Card.Body>
              <VStack align="start" gap={3}>
                <Text>
                  <strong>Selected Categories:</strong> {selectedCategoryKeys.map(key => choresData.categories[key].name).join(", ")}
                </Text>
                <Separator />
                <Text>
                  <strong>Selected Items:</strong>
                </Text>
                {Object.entries(selectedItems).filter(([, isSelected]) => isSelected).length > 0 ? (
                  <Stack gap={2}>
                    {selectedCategoryKeys.map(categoryKey => {
                      const categorySelectedItems = Object.entries(selectedItems)
                        .filter(([fullKey, isSelected]) => isSelected && fullKey.startsWith(`${String(categoryKey)}_`))
                        .map(([fullKey]) => {
                          const parts = fullKey.split('_');
                          
                          // Handle the new format: categoryKey_itemKey_choreId
                          if (parts.length >= 3) {
                            const itemKey = parts[1];
                            const choreId = parts[2];
                            const item = choresData.categories[categoryKey]?.items?.[itemKey];
                            const chore = item?.chores?.find((c: Chore) => c.id === choreId);
                            return { 
                              itemKey, 
                              choreId,
                              itemName: item?.name || 'Unknown Item', 
                              choreName: chore?.name || 'Unknown chore'
                            };
                          } else {
                            // Handle old format or invalid keys
                            return { 
                              itemKey: 'unknown', 
                              choreId: 'unknown',
                              itemName: 'Invalid Key', 
                              choreName: 'Invalid Key'
                            };
                          }
                        });
                      
                      if (categorySelectedItems.length === 0) return null;
                      
                      return (
                        <Stack key={String(categoryKey)} gap={1}>
                          <Text fontWeight="bold" color="blue.600" fontSize="sm">
                            {choresData.categories[categoryKey].name}:
                          </Text>
                          {categorySelectedItems.map(item => (
                            <Text key={`${item.itemKey}_${item.choreId}`} fontSize="sm" color="gray.700" pl={4}>
                              • {item.itemName} - {item.choreName}
                            </Text>
                          ))}
                        </Stack>
                      );
                    })}
                  </Stack>
                ) : (
                  <Text fontSize="sm" color="gray.500">
                    No items selected
                  </Text>
                )}
              </VStack>
            </Card.Body>
          </Card.Root>
        )}

        <HStack gap={4} w="100%" justify="center">
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            disabled={selectedCategoryKeys.length === 0 || Object.values(selectedItems).every(item => !item)}
          >
            Submit Selection
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCategories({});
              setSelectedItems({});
              setSelectedChoreDetails({});
            }}
          >
            Reset Form
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default ChoreForm;
