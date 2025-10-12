import React, { useState } from "react";
import { Box, Heading, Grid, Button, Text, Checkbox } from "@chakra-ui/react";

const COMMON_CATEGORIES = ["kitchen", "bathroom", "bedrooms", "living room", "dining room", "laundry room"];

const ADDITIONAL_CATEGORIES = ["garage", "outdoors", "systems", "hallways"];

const CategoryForm: React.FC<{
  defaultChecked?: string[];
  onSubmit: (selected: string[]) => void;
}> = ({ defaultChecked = [], onSubmit }) => {
  const [selected, setSelected] = useState<Record<string, boolean>>(
    Object.fromEntries(defaultChecked.map((k) => [k, true])),
  );

  const toggle = (category: string) => setSelected((prev) => ({ ...prev, [category]: !prev[category] }));

  const handleSubmit = (): void => {
    const chosen: string[] = Object.entries(selected)
      .filter(([, checked]: [string, boolean]) => checked)
      .map(([key]: [string, boolean]) => key);
    onSubmit(chosen);
  };

  const CategoryTile = ({ label }: { label: string }) => {
    const isChecked = !!selected[label];
    const displayLabel = label
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return (
      <Box
        as="label"
        w="100%"
        h="90px"
        p={3}
        borderWidth="2px"
        borderColor={isChecked ? "blue.500" : "gray.300"}
        borderRadius="md"
        bg={isChecked ? "blue.50" : "white"}
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        cursor="pointer"
        transition="background 0.2s, border-color 0.2s"
        _hover={{ bg: isChecked ? "blue.100" : "gray.50" }}
        boxSizing="border-box"
      >
        <Checkbox
          isChecked={isChecked}
          onChange={() => toggle(label)}
          colorScheme="blue"
          size="md"
          mr={3}
          flexShrink={0}
        />
        <Text
          fontSize="sm"
          fontWeight="medium"
          color={isChecked ? "blue.800" : "gray.800"}
          whiteSpace="normal"
          textAlign="left"
          lineHeight="1.3"
        >
          {displayLabel}
        </Text>
      </Box>
    );
  };

  return (
    <Box bg="gray.50" px={8} py={10} mx="auto" maxW="5xl" rounded="lg">
      <Heading as="h1" size="lg" textAlign="center" mb={8}>
        Select Chore Categories
      </Heading>

      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={4}
        alignItems="stretch"
      >
        {[...COMMON_CATEGORIES, ...ADDITIONAL_CATEGORIES].map((c) => (
          <CategoryTile key={c} label={c} />
        ))}
      </Grid>

      <Box textAlign="center" mt={10}>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default CategoryForm;
