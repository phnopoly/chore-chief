import React, { useState } from "react";
import { Box, Heading, Grid, Button, Text, Checkbox } from "@chakra-ui/react";

const COMMON_CATEGORIES = ["kitchen", "bathroom", "bedrooms", "living room", "dining room", "laundry room"];

const ADDITIONAL_CATEGORIES = ["garage", "outdoors", "systems", "hallways"];

interface CategoryFormProps {
  defaultChecked?: string[];
  onSubmit: (selected: string[]) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ defaultChecked = [], onSubmit }) => {
  const [selected, setSelected] = useState<Record<string, boolean>>(
    Object.fromEntries(defaultChecked.map((k) => [k, true])),
  );

  const toggle = (category: string) => setSelected((prev) => ({ ...prev, [category]: !prev[category] }));

  const handleSubmit = () => {
    const chosen = Object.entries(selected)
      .filter(([, checked]) => checked)
      .map(([key]) => key);
    onSubmit(chosen);
  };

  const CategoryTile = ({ label }: { label: string }) => {
    const isChecked = !!selected[label];
    const displayLabel = label
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return (
      <Checkbox.Root checked={isChecked} onCheckedChange={() => toggle(label)} w="full">
        <Checkbox.HiddenInput />
        <Box
          borderWidth="2px"
          borderColor={isChecked ? "blue.500" : "gray.300"}
          borderRadius="md"
          bg={isChecked ? "blue.50" : "white"}
          p={3}
          w="100%"
          h="90px" // uniform tile height across all
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          cursor="pointer"
          transition="background 0.2s, border-color 0.2s"
          _hover={{ bg: isChecked ? "blue.100" : "gray.50" }}
          boxSizing="border-box"
        >
          {/* @ts-expect-error chakra types not yet exposed */}
          <Checkbox.Control
            boxSize="18px"
            borderWidth="2px"
            borderColor={isChecked ? "blue.500" : "gray.300"}
            borderRadius="sm"
            bg={isChecked ? "blue.500" : "white"}
            flexShrink={0}
            mr={3}
          >
            <Checkbox.Indicator color="white" />
          </Checkbox.Control>

          {/* @ts-expect-error chakra types not yet exposed */}
          <Checkbox.Label asChild>
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
          </Checkbox.Label>
        </Box>
      </Checkbox.Root>
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
