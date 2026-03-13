import React from "react";
import useSWR from "swr";
import { Box, Button, Container, Stack, Text, Flex } from "@chakra-ui/react";
import { Chore } from "../../../../packages/mirage/src/schema";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Overview: React.FC<{
  selectedCategories: string[];
  setGetStartedStep: (step: 0 | 1 | 2 | 3) => void;
}> = ({ selectedCategories, setGetStartedStep }) => {
  const { data, isLoading } = useSWR<{ chores: Chore[] }>("/api/chores", fetcher);

  if (isLoading || !data) return null;

  const choresArray = data.chores;
  const grouped: Record<string, Record<string, Chore[]>> = {};

  choresArray.forEach((model: Chore) => {
    const c = model;

    if (!selectedCategories.includes(c.room)) return;

    if (!grouped[c.room]) grouped[c.room] = {};
    if (!grouped[c.room][c.frequency]) grouped[c.room][c.frequency] = [];

    grouped[c.room][c.frequency].push(c);
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

        <Flex columnGap={4}>
          <Button onClick={() => setGetStartedStep(1)}>Back</Button>
          <Button onClick={() => setGetStartedStep(3)}>Next</Button>
        </Flex>
      </Stack>
    </Container>
  );
};

export default Overview;
