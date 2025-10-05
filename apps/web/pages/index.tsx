"use client";
import React, { useState } from "react";
import { Box, Container, Heading, Stack } from "@chakra-ui/react";
import ChoreForm from "./ChoreForm";
import HouseholdForm from "./HouseholdForm";

const Home: React.FC = () => {
  const [setup, setSetup] = useState<{ householdSize: number; houseType: string } | null>(null);

  return (
    <Box bg="gray.50" minH="100vh" py={10}>
      <Container maxW="6xl">
        <Stack align="start">
          <Heading as="h1" size="2xl" bgGradient="linear(to-r, teal.500, green.400)" bgClip="text">
            Chore Champ
          </Heading>

          {/* Show Household Form first, then ChoreForm */}
          {!setup ? <HouseholdForm onSubmit={(data) => setSetup(data)} /> : <ChoreForm filePath="/chores.json" />}
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;
