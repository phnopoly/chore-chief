import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface BodyProps {
  children: React.ReactNode;
}

const Body = ({ children }: BodyProps) => (
  <Box as="section" minH="20rem" p="1rem">
    <Flex
      as={motion.div}
      initial="hidden"
      animate="visible"
      align={{ md: "center" }}
      columnGap={8}
      rowGap={4}
      direction={{ base: "column", md: "row" }}
    >
      {children}
    </Flex>
  </Box>
);

export default Body;
