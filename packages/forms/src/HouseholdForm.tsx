import React from "react";
import {
  Box,
  Container,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import { LookupCategoryDTO } from "@chore-champ/types";

import { Button, NumberPicker } from "@chore-champ/ui";

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
  setGetStartedStep: (step: 0 | 1 | 2 | 3) => void;
}

const HouseholdForm: React.FC<HouseholdFormProps> = (props) => {
  const {
    categories,
    numMembers,
    setNumMembers,
    bedrooms,
    setBedrooms,
    bathrooms,
    setBathrooms,
    selectedChoreCategories,
    setSelectedChoreCategories,
    setGetStartedStep,
  } = props;

  return (
    <Container py={4} px={0}>
      <Stack spacing={6} as="form" onSubmit={(e) => e.preventDefault()}>
        <Box>
          <Text fontSize="lg" fontWeight="medium">
            Household Setup
          </Text>
          <Text fontSize="sm" color="gray.500">
            Tell us about your home so we can generate the right chores.
          </Text>
        </Box>

        <Flex gap={6} align="flex-start">
          <FormControl id="members" isRequired maxW="160px">
            <FormLabel>Household Size</FormLabel>
            <Input
              type="number"
              value={numMembers}
              min={1}
              max={10}
              onChange={(e) => setNumMembers(Number(e.target.value))}
            />
          </FormControl>

          <Stack spacing={4} flex={1}>
            <FormControl id="bedrooms" isRequired>
              <FormLabel>Bedrooms</FormLabel>
              <NumberPicker value={bedrooms} options={NUMBER_OPTIONS} onChange={setBedrooms} />
            </FormControl>

            <FormControl id="bathrooms" isRequired>
              <FormLabel>Bathrooms</FormLabel>
              <NumberPicker value={bathrooms} options={NUMBER_OPTIONS} onChange={setBathrooms} />
            </FormControl>
          </Stack>
        </Flex>

        <FormControl id="categories">
          <FormLabel>Which areas of your home should include chores?</FormLabel>

          <CheckboxGroup
            value={selectedChoreCategories}
            onChange={(values) => setSelectedChoreCategories(values as string[])}
          >
            <Flex gap={3} wrap="wrap">
              {categories.map((c) => (
                <Checkbox key={c.id} value={c.id}>
                  {c.label}
                </Checkbox>
              ))}
            </Flex>
          </CheckboxGroup>
        </FormControl>

        <Flex alignSelf="flex-end" gap="1rem">
          <Button size="md" onClick={() => setGetStartedStep(0)}>
            Back
          </Button>

          <Button
            size="md"
            type="submit"
            onClick={() => {
              if (selectedChoreCategories.length > 0) {
                setGetStartedStep(2);
              }
            }}
          >
            Next
          </Button>
        </Flex>
      </Stack>
    </Container>
  );
};

export default HouseholdForm;
