import React, { useMemo } from "react";
import useSWR from "swr";
import { Box, Container, Text, Flex } from "@chakra-ui/react";
import { Button } from "@chore-chief/ui";
import { templateChoresSeeds } from "@chore-chief/mirage";
import { TemplateChoreDTO } from "@chore-chief/types";
import { capitalizeFirstLetter } from "@chore-chief/utils";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Overview = ({
  selectedCategories = [],
  onBack,
  onNext,
}: {
  selectedCategories?: string[];
  onBack?: () => void;
  onNext?: () => void;
}) => {
  const { data } = useSWR<{ templateChores: TemplateChoreDTO[] }>("/api/reference-data", fetcher, {
    fallbackData: { templateChores: templateChoresSeeds },
  });

  const groupedByFrequency = useMemo(() => {
    const grouped: Record<string, TemplateChoreDTO[]> = {};
    data?.templateChores.forEach((chore) => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(chore.categoryId)) return;
      if (!grouped[chore.defaultFrequencyId]) {
        grouped[chore.defaultFrequencyId] = [];
      }
      grouped[chore.defaultFrequencyId].push(chore);
    });

    return grouped;
  }, [data, selectedCategories]);

  return (
    <Container maxW="100%" py={4}>
      <Box mb={4}>
        <Text fontSize="lg" fontWeight="medium">
          Chore Templates
        </Text>
        <Text fontSize="sm" color="gray.500">
          Default chores generated from your selected categories.
        </Text>
      </Box>
      <Flex w="100%" gap={6} align="flex-start">
        <Flex direction="column" flex={1} minW={0}>
          <Text fontSize="md" fontWeight="semibold" mb={2}>
            Daily
          </Text>
          <Flex direction="column" gap={1}>
            {(groupedByFrequency["daily"] || []).map((chore) => (
              <Flex key={chore.id} justify="space-between">
                <Text fontSize="sm">{chore.defaultLabel}</Text>
                <Text fontSize="sm" color="gray.600">
                  {chore.defaultPts} pt{chore.defaultPts > 1 ? "s" : ""}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <Flex direction="column" flex={1} minW={0}>
          <Text fontSize="md" fontWeight="semibold" mb={2}>
            Weekly
          </Text>
          <Flex direction="column" gap={1}>
            {(groupedByFrequency["weekly"] || []).map((chore) => (
              <Flex key={chore.id} justify="space-between">
                <Text fontSize="sm">{chore.defaultLabel}</Text>
                <Text fontSize="sm" color="gray.600">
                  {chore.defaultPts} pt{chore.defaultPts > 1 ? "s" : ""}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Flex>

        <Flex direction="column" flex={1} minW={0} gap={3}>
          {Object.entries(groupedByFrequency)
            .filter(([freq]) => freq !== "daily" && freq !== "weekly")
            .map(([frequency, chores]) => (
              <Box key={frequency}>
                <Text fontSize="md" fontWeight="semibold" mb={1}>
                  {capitalizeFirstLetter(frequency)}
                </Text>
                <Flex direction="column" gap={1}>
                  {chores.map((chore) => (
                    <Flex key={chore.id} justify="space-between">
                      <Text fontSize="sm">{chore.defaultLabel}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {chore.defaultPts} pt
                        {chore.defaultPts > 1 ? "s" : ""}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Box>
            ))}
        </Flex>
      </Flex>
      {(onBack || onNext) && (
        <Flex mt={6} gap={3} justify="flex-end">
          {onBack && <Button onClick={onBack}>Back</Button>}
          {onNext && <Button onClick={onNext}>Next</Button>}
        </Flex>
      )}
    </Container>
  );
};

export default Overview;
