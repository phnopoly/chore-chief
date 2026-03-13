import React from "react";
import useSWR from "swr";
import { Box, Container, Stack, Text, Flex } from "@chakra-ui/react";
import { Button } from "@chore-champ/ui";
import { Chore } from "@chore-champ/mirage/src/schema";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Overview: React.FC<{
  selectedCategories: string[];
  setGetStartedStep: (step: 0 | 1 | 2 | 3) => void;
}> = ({ selectedCategories, setGetStartedStep }) => {
  const { data, isLoading } = useSWR<{ chores: Chore[] }>("/api/chores", fetcher);

  if (isLoading || !data) return null;

  const choresArray = data.chores;
  const grouped: Record<string, Record<string, Chore[]>> = {};

  choresArray.forEach((c: Chore) => {
    if (!c.category || !c.frequency) return;
    if (!selectedCategories.includes(c.category)) return;

    if (!grouped[c.category]) grouped[c.category] = {};
    if (!grouped[c.category][c.frequency]) grouped[c.category][c.frequency] = [];

    grouped[c.category][c.frequency].push(c);
  });

  return (
    <Container py={4} px={0}>
      <Stack spacing={6}>
        <Box>
          <Text fontSize="lg" fontWeight="medium">
            Chores Frequency
          </Text>
          <Text fontSize="sm" color="gray.500">
            These chore frequencies come directly from your Mirage data.
          </Text>
        </Box>

        <Box>
          <Stack spacing={4}>
            {Object.entries(grouped).map(([category, frequencies]) => (
              <Box key={category} p={4} borderWidth="1px" borderRadius="md">
                <Text fontSize="md" fontWeight="semibold" mb={2} textTransform="capitalize">
                  {category}
                </Text>

                <Stack spacing={2}>
                  {Object.entries(frequencies).map(([freq, chores]) => (
                    <Box key={freq}>
                      <Text fontSize="sm" fontWeight="medium" textTransform="capitalize" mb={1}>
                        {freq}
                      </Text>
                      <Stack spacing={1} pl={4}>
                        {chores.map((c) => (
                          <Text key={c.id} fontSize="sm">
                            - {c.name} ({c.points} point{c.points > 1 ? "s" : ""})
                          </Text>
                        ))}
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>

        <Flex columnGap={4} alignSelf="flex-end">
          <Button size="md" onClick={() => setGetStartedStep(1)}>
            Back
          </Button>
          <Button size="md" onClick={() => setGetStartedStep(3)}>
            Next
          </Button>
        </Flex>
      </Stack>
    </Container>
  );
};

export default Overview;
