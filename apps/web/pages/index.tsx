"use client";
import React, { useState } from "react";
import { Box, Container, Heading, Stack, Text, Flex } from "@chakra-ui/react";
import ChoreForm from "./ChoreForm";
import HouseholdForm from "./HouseholdForm";

const Home: React.FC = () => {
  const [setup, setSetup] = useState<{ householdSize: number; houseType: string } | null>(null);

  return (
    <Box bg="gray.50">
      {/* Header Banner */}
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
            lineHeight="1"
          >
            🧹 Chore Champ
          </Heading>

          <Text
            fontFamily="'Public Sans', sans-serif"
            fontSize={{ base: "sm", md: "lg" }}
            color="gray.700"
            fontWeight="medium"
          >
            Organize. Assign. Win back your weekends.
          </Text>
        </Flex>
      </Box>

      {/* Main Body */}
      <Container maxW="6xl" py={8}>
        <Stack align="center">
          {!setup ? (
            <Box w="full" display="flex" justifyContent="center">
              <HouseholdForm onSubmit={(data) => setSetup(data)} />
            </Box>
          ) : (
            <>
              <Box w="full" bg="white" borderRadius="xl" boxShadow="sm" p={5} mb={4}>
                <Text fontSize="lg" color="gray.800" fontFamily="'Public Sans', sans-serif">
                  Welcome! You’re setting up chores for a{" "}
                  <Text as="span" fontWeight="bold" color="teal.600">
                    {setup.householdSize}-person {setup.houseType}
                  </Text>
                  .
                </Text>
              </Box>

              <ChoreForm filePath="/chores.json" />
            </>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;
