"use client";
import React from "react";
import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import ChoreForm from "./ChoreForm";

const Home: React.FC = () => {
  return (
    <Box bg="gray.50" minH="100vh" py={10}>
      <Container maxW="6xl">
        <Stack align="start">
          <Heading as="h1" size="2xl" bgGradient="linear(to-r, teal.500, green.400)" bgClip="text">
            Chore Champ
          </Heading>

          <Text color="gray.600" fontSize="lg">
            Simplify household management, track accountability, and gamify chores.
          </Text>

          <ChoreForm></ChoreForm>
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;
