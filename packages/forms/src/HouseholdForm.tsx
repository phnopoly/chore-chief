import React from "react";
import { Box, Stack, FormControl, FormLabel, Input, Text, Flex, CheckboxGroup, Checkbox } from "@chakra-ui/react";
import { LookupCategoryDTO } from "@chore-chief/types";
import { Button, NumberPicker } from "@chore-chief/ui";

const NUMBER_OPTIONS = [1, 2, 3, 4, 5, 6];

interface HouseholdFormProps {
  categories: LookupCategoryDTO[];
  numMembers: number;
  setNumMembers: (num: number) => void;
  bedrooms: number;
  setBedrooms: (num: number) => void;
  bathrooms: number;
  setBathrooms: (num: number) => void;
  selectedChoreCategories: string[];
  setSelectedChoreCategories: (v: string[]) => void;
  onBack: () => void;
  onNext: () => void;
}

const HouseholdForm = ({
  categories,
  numMembers,
  setNumMembers,
  bedrooms,
  setBedrooms,
  bathrooms,
  setBathrooms,
  selectedChoreCategories,
  setSelectedChoreCategories,
  onBack,
  onNext,
}: HouseholdFormProps) => (
  <Stack spacing={6} as="form" onSubmit={(e) => e.preventDefault()} width="100%">
    <Box>
      <Text fontSize="lg" fontWeight="medium">
        Household Setup
      </Text>
      <Text fontSize="sm" color="gray.500">
        Tell us about your home so we can generate the right chores.
      </Text>
    </Box>

    <Flex gap={6} align="flex-start" w="fit-content">
      <FormControl id="members" isRequired w="fit-content" flex="0 0 auto">
        <FormLabel whiteSpace="nowrap">Household Size</FormLabel>
        <Input
          width="100%"
          maxW="120px"
          type="number"
          value={numMembers}
          min={1}
          max={10}
          onChange={(e) => setNumMembers(Number(e.target.value))}
        />
      </FormControl>
      <FormControl id="bedrooms" isRequired>
        <FormLabel>Bedrooms</FormLabel>
        <NumberPicker value={bedrooms} options={NUMBER_OPTIONS} onChange={setBedrooms} />
      </FormControl>
      <FormControl id="bathrooms" isRequired>
        <FormLabel>Bathrooms</FormLabel>
        <NumberPicker value={bathrooms} options={NUMBER_OPTIONS} onChange={setBathrooms} />
      </FormControl>
    </Flex>

    <FormControl id="categories">
      <FormLabel>Which areas of your home should include chores?</FormLabel>

      <CheckboxGroup
        value={selectedChoreCategories}
        onChange={(values) => setSelectedChoreCategories(values as string[])}
      >
        <Flex gap={8} wrap="wrap">
          {categories.map((c) => (
            <Checkbox key={c.id} value={c.id} colorScheme="olive">
              {c.label}
            </Checkbox>
          ))}
        </Flex>
      </CheckboxGroup>
    </FormControl>

    <Flex alignSelf="flex-end" gap="1rem">
      <Button size="md" onClick={onBack}>
        Back
      </Button>

      <Button
        size="md"
        type="submit"
        onClick={() => {
          if (selectedChoreCategories.length > 0) {
            onNext();
          }
        }}
      >
        Next
      </Button>
    </Flex>
  </Stack>
);

export default HouseholdForm;
