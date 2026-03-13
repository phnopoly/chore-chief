import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Button } from "@chore-champ/ui";

interface BodyProps {
  setGetStartedOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Body: React.FC<BodyProps> = ({ setGetStartedOpen }) => {
  return (
    <Box as="section" minH="20rem" p="2rem">
      <Flex align={{ md: "center" }} columnGap={8} rowGap={4} direction={{ base: "column", md: "row" }}>
        <Box flex="1" fontSize="1.75rem" alignSelf="start">
          <Text fontWeight="bold">
            End the chore wars. <Box as="span" bgColor="olive.500" borderRadius="50%" />
          </Text>
          <Text
            position="relative"
            _before={{
              content: '""',
              position: "absolute",
              left: "0",
              bottom: "-10px",
              w: "58%",
              h: 2,
              bg: "olive.500",
            }}
          >
            Win your weekend back.
          </Text>
        </Box>

        <Flex flex="1" direction="column" align="flex-start" gap={6}>
          <Box borderWidth="1px" borderStyle="solid" borderColor="dark.500" fontSize="1.25rem" px={4} py={2}>
            ChoreChamp makes it easy to divide and conquer household tasks. Create custom lists, assign duties, and
            track progress.
          </Box>

          <Flex gap={4}>
            <Button onClick={() => setGetStartedOpen(true)}>Get Started for Free</Button>
            <Button variant="outline">Learn More</Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Body;
