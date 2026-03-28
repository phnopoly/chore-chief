import React from "react";
import { Container } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";

const GlobalLayout = ({ children }: { children: React.ReactNode }) => (
  <Container px={0} maxW="6xl" bg="gray.50">
    <Header />
    <Body>{children}</Body>
    <Footer />
  </Container>
);

export default GlobalLayout;
