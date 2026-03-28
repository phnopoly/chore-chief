import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import { Button, LANDING_PAGE_DESCRIPTION } from "@chore-chief/ui";
import Body from "../src/Body";

const Index = () => {
  const router = useRouter();
  return (
    <Body>
      <Box as={motion.div} flex="1" fontSize="1.75rem">
        <Text fontWeight="bold">
          End the chore wars. <Box as="span" bg="olive.500" borderRadius="50%" />
        </Text>
        <Text
          as={motion.div}
          position="relative"
          _before={{
            content: '""',
            position: "absolute",
            left: 0,
            bottom: "-10px",
            w: "58%",
            h: 2,
            bg: "olive.500",
          }}
        >
          Win your weekend back!
        </Text>
      </Box>
      <Flex flex="1" direction="column" gap={6}>
        <Box borderWidth="1px" borderColor="dark.500" fontSize="1.25rem" px={4} py={2}>
          {LANDING_PAGE_DESCRIPTION}
        </Box>
        <Flex gap={4}>
          <Button onClick={() => router.push("/setup")}>Get Started for Free</Button>
        </Flex>
      </Flex>
    </Body>
  );
};

export default Index;
