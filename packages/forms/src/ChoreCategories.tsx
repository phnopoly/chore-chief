import React from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
  Text,
  CheckboxGroup,
  Checkbox,
  Flex,
} from "@chakra-ui/react";

const CATEGORIES = [
  "kitchen",
  "bathroom",
  "bedrooms",
  "living room",
  "dining room",
  "laundry room",
  "garage",
  "outdoors",
  "systems",
  "hallways",
];

const ChoreCategories: React.FC<{
  selectedChoreCategories: string[];
  setSelectedChoreCategories: (selectedChoreCategories: string[]) => void;
  setGetStartedStep: (step: 0 | 1 | 2 | 3) => void;
}> = ({ selectedChoreCategories, setSelectedChoreCategories, setGetStartedStep }) => {
  return (
    <Container py={4} px={0}>
      <Stack
        spacing={6}
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Box>
          <Text fontSize="lg" fontWeight="medium">
            Chore Categories
          </Text>
          <Text fontSize="sm" color="gray.500">
            Choose the categories that best fit your household needs.
          </Text>
        </Box>

        <FormControl id="categories" isRequired>
          <CheckboxGroup
            value={selectedChoreCategories}
            onChange={(values) => setSelectedChoreCategories(values as string[])}
          >
            <FormLabel>Categories</FormLabel>
            <Stack spacing={3} direction="row" flexWrap="wrap">
              {CATEGORIES.map((category) => (
                <Checkbox key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
          <FormHelperText>Select at least one category.</FormHelperText>
        </FormControl>
        <Flex columnGap={4}>
          <Button type="button" onClick={() => setGetStartedStep(0)}>
            Back
          </Button>
          <Button
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

export default ChoreCategories;
