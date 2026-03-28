import { Box, Flex, Image } from "@chakra-ui/react";
import { Button } from "@chore-chief/ui";
import React from "react";

const Header = () => (
  <Box as="header" position="sticky" top="0" zIndex="1000" bg="beige.500">
    <Flex py={4} px={6} align="center" justify="space-between" flexWrap="wrap" rowGap={2} columnGap={10}>
      <Image src="/assets/chorechief-logo.svg" alt="ChoreChief Logo" h="6rem" w="auto" objectFit="contain" />
      <Button variant="link">Login</Button>
    </Flex>
  </Box>
);

export default Header;
