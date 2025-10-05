import React from "react";
import { Box, Container } from "@chakra-ui/react";
import ChoreForm from "./ChoreForm";

const FormPage = () => (
  <Box bg="gray.50" minH="100vh" py={10}>
    <Container maxW="6xl">
      <ChoreForm />
    </Container>
  </Box>
);

export default FormPage;
