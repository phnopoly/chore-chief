"use client";
import React, { useState } from "react";
import { Box, Container, Heading, Stack, Text, Flex } from "@chakra-ui/react";
import CategoryForm from "./CategoryForm";
import HouseholdForm from "./HouseholdForm";
import ChoreForm from "./ChoreForm";

const getDefaultCategories = (houseType: string): string[] => {
  switch (houseType.toLowerCase()) {
    case "apartment":
      return ["entryway", "kitchen", "bathroom", "bedrooms", "living room", "systems"];
    case "condo":
      return ["entryway", "kitchen", "bathroom", "bedrooms", "living room", "dining room", "systems"];
    case "house":
    case "townhouse":
      return [
        "entryway",
        "kitchen",
        "bathroom",
        "bedrooms",
        "living room",
        "dining room",
        "outdoor",
        "systems",
        "pets",
      ];
    case "shared":
      return ["entryway", "kitchen", "bathroom", "bedrooms", "living room"];
    case "dorm":
      return ["entryway", "bedrooms", "bathroom", "kitchen"];
    case "studio":
      return ["entryway", "kitchen", "bathroom", "living room"];
    default:
      return ["entryway", "kitchen", "bathroom", "living room"];
  }
};

const Home: React.FC = () => {
  const [setup, setSetup] = useState<{ householdSize: number; houseType: string } | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[] | null>(null);

  return (
    <Box bg="gray.50">
      <Box
        bgGradient="linear(to-r, teal.50, white)"
        py={3}
        px={6}
        boxShadow="sm"
        borderBottom="2px solid"
        borderColor="teal.500"
      >
        <Flex align="center" justify="space-between" maxW="6xl" mx="auto" flexWrap="wrap" gap={3}>
          <Heading
            as="h1"
            fontFamily="'Merriweather', serif"
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            color="teal.700"
          >
            Chore Champ
          </Heading>
          <Text fontFamily="'Public Sans', sans-serif" fontSize={{ base: "sm", md: "lg" }} color="gray.700">
            Organize. Assign. Win back your weekends.
          </Text>
        </Flex>
      </Box>

      <Container maxW="6xl" py={8}>
        <Stack align="center">
          {!setup ? (
            <Box w="full" display="flex" justifyContent="center" mt={8}>
              <HouseholdForm onSubmit={(data) => setSetup(data)} />
            </Box>
          ) : !selectedCategories ? (
            <>
              <Box w="full" bg="white" borderRadius="xl" boxShadow="sm" p={6} mb={2} textAlign="center">
                <Text fontSize={{ base: "lg", md: "xl" }} color="gray.800" fontFamily="'Public Sans', sans-serif">
                  Welcome! You’re setting up chores for a{" "}
                  <Text as="span" fontWeight="bold" color="teal.600">
                    {setup.householdSize}-person {setup.houseType}
                  </Text>
                  .
                </Text>
              </Box>

              <CategoryForm
                defaultChecked={getDefaultCategories(setup.houseType)}
                onSubmit={(selected) => setSelectedCategories(selected)}
              />
            </>
          ) : (
            <ChoreForm filePath="/chores.json" selectedCategories={selectedCategories} />
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;
