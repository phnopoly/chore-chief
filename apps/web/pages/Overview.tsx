import React from "react";
import useSWR from "swr";
import { Box, Container, Stack, Text, Flex } from "@chakra-ui/react";
import { Button } from "@chore-chief/ui";
import { templateChoresSeeds } from "@chore-chief/mirage";
import { TemplateChoreDTO } from "@chore-chief/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Overview: React.FC<{
  selectedCategories?: string[];
  setGetStartedStep: (step: 0 | 1 | 2 | 3) => void;
}> = ({ selectedCategories = [], setGetStartedStep }) => {
  const { data } = useSWR<{ chores: TemplateChoreDTO[] }>("/api/template-chores", fetcher, {
    fallbackData: { chores: templateChoresSeeds },
  });

  const grouped: Record<string, Record<string, TemplateChoreDTO[]>> = {};

  data?.chores.forEach((chore) => {
    if (!selectedCategories.includes(chore.categoryId)) return;

    if (!grouped[chore.categoryId]) grouped[chore.categoryId] = {};
    if (!grouped[chore.categoryId][chore.defaultFrequencyId]) {
      grouped[chore.categoryId][chore.defaultFrequencyId] = [];
    }

    grouped[chore.categoryId][chore.defaultFrequencyId].push(chore);
  });

  return (
    <Container py={4} px={0}>
      <Stack spacing={6}>
        <Box>
          <Text fontSize="lg" fontWeight="medium">
            Chore Templates
          </Text>
          <Text fontSize="sm" color="gray.500">
            Default chores generated from your selected categories.
          </Text>
        </Box>

        <Stack spacing={4}>
          {Object.entries(grouped).map(([categoryId, frequencies]) => (
            <Box key={categoryId} p={4} borderWidth="1px" borderRadius="md">
              <Text fontSize="md" fontWeight="semibold" mb={2} textTransform="capitalize">
                {categoryId}
              </Text>

              {Object.entries(frequencies).map(([frequencyId, chores]) => (
                <Box key={frequencyId} mb={3}>
                  <Text fontSize="sm" fontWeight="medium" textTransform="capitalize">
                    {frequencyId}
                  </Text>

                  <Stack spacing={1} pl={4}>
                    {chores.map((c) => (
                      <Text key={c.id} fontSize="sm">
                        • {c.defaultLabel} ({c.defaultPts} pt{c.defaultPts > 1 ? "s" : ""})
                      </Text>
                    ))}
                  </Stack>
                </Box>
              ))}
            </Box>
          ))}
        </Stack>

        <Flex columnGap={4} justify="flex-end">
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
