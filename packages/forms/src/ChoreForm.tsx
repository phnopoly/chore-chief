"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Heading, Stack, Text, Spinner, Flex } from "@chakra-ui/react";

interface Chore {
  id: string;
  name: string;
  points: number;
  frequency?: string;
  category?: string;
}

interface ChoreFile {
  [category: string]: {
    [frequency: string]: Chore[];
  };
}

interface ChoreFormProps {
  filePath: string;
  selectedCategories: string[];
}

const ChoreForm: React.FC<ChoreFormProps> = ({ filePath, selectedCategories }) => {
  const [groupedByFrequency, setGroupedByFrequency] = useState<Record<string, Chore[]>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadChores = async (): Promise<void> => {
      try {
        const res = await fetch(filePath);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data: ChoreFile = await res.json();

        const grouped: Record<string, Chore[]> = {};

        for (const catKey of selectedCategories) {
          const categoryData = data[catKey];
          if (!categoryData) continue;

          for (const [frequency, chores] of Object.entries(categoryData)) {
            const safeFrequency = frequency ?? "unspecified";
            grouped[safeFrequency] ??= [];

            for (const chore of chores) {
              grouped[safeFrequency].push({
                ...chore,
                category: catKey,
                frequency: safeFrequency,
              });
            }
          }
        }

        setGroupedByFrequency(grouped);
      } catch (err) {
        console.error("Error loading chores.json:", err);
      } finally {
        setLoading(false);
      }
    };

    void loadChores();
  }, [filePath, selectedCategories]);

  if (loading) {
    return (
      <Box textAlign="center" mt={8}>
        <Spinner size="lg" color="teal.500" />
        <Text mt={2}>Loading chores...</Text>
      </Box>
    );
  }

  return (
    <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" w="full" maxW="xl" textAlign="left">
      <Heading as="h2" fontFamily="'Merriweather', serif" color="teal.700" mb={4}>
        All Chores by Frequency
      </Heading>

      {Object.entries(groupedByFrequency).map(([frequency, chores]: [string, Chore[]]) => (
        <Box key={frequency} mb={8}>
          <Heading as="h3" size="sm" color="teal.600" fontFamily="'Merriweather', serif" mb={3} letterSpacing="wide">
            {frequency.toUpperCase()}
          </Heading>

          <Box>
            {chores.map((chore) => (
              <Flex key={chore.id} align="center" justify="space-between" py={1} px={2}>
                <Text flex="1" fontFamily="'Public Sans', sans-serif" fontSize="sm" color="gray.800">
                  {chore.name}
                </Text>

                <Text ml={3} minW="fit-content" fontSize="sm" color="gray.600" fontFamily="'Public Sans', sans-serif">
                  {chore.category?.toUpperCase()} • {chore.points} pts
                </Text>
              </Flex>
            ))}
          </Box>
        </Box>
      ))}

      <Stack align="center" mt={6}>
        <Button colorScheme="teal" size="sm" px={8}>
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default ChoreForm;
