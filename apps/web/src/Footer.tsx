import React from "react";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import FooterLinkButton from "./FooterLinkButton";

const Footer: React.FC = () => {
  return (
    <Box as="footer" bg="beige.500" color="dark.500" p={4} m={0}>
      <Container maxW="5xl">
        <Flex direction={{ base: "column", md: "row" }} align="flex-start">
          <Box maxW="300px">
            <Heading fontSize="1.5rem" fontWeight="bold" mb={2}>
              ChoreChief
            </Heading>
          </Box>
          <Flex ml={{ base: 0, md: "auto" }} gap={12} mt={{ base: 6, md: 0 }} direction={{ base: "column", md: "row" }}>
            <Box>
              <Text fontWeight="bold" mb={2}>
                Product
              </Text>
              <Flex direction="column" gap={1} align="flex-start">
                <FooterLinkButton>Features</FooterLinkButton>
                <FooterLinkButton>Pricing</FooterLinkButton>
                <FooterLinkButton>Get Started</FooterLinkButton>
                <FooterLinkButton>Login</FooterLinkButton>
              </Flex>
            </Box>

            <Box>
              <Text fontWeight="bold" mb={2}>
                Company
              </Text>
              <Flex direction="column" gap={1} align="flex-start">
                <FooterLinkButton>About</FooterLinkButton>
                <FooterLinkButton>Contact</FooterLinkButton>
                <FooterLinkButton>Support</FooterLinkButton>
              </Flex>
            </Box>

            <Box>
              <Text fontWeight="bold" mb={2}>
                Legal
              </Text>
              <Flex direction="column" gap={1} align="flex-start">
                <FooterLinkButton>Privacy Policy</FooterLinkButton>
                <FooterLinkButton>Terms of Service</FooterLinkButton>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Box borderTop="2px solid" borderColor="dark.500" mt={10} pt={6} textAlign="center" fontSize="0.9rem">
          © {new Date().getFullYear()} ChoreChief. All rights reserved.
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
