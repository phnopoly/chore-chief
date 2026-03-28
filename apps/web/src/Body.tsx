import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";
import { Button, LANDING_PAGE_DESCRIPTION } from "@chore-chief/ui";
interface BodyProps {
  setGetStartedOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 240,
      damping: 20,
    },
  },
};

// Subtle text animation (lighter)
const textItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 18,
    },
  },
};

const Body: React.FC<BodyProps> = ({ setGetStartedOpen }) => {
  return (
    <Box as="section" minH="20rem" p="2rem">
      <Flex
        as={motion.div}
        variants={container}
        initial="hidden"
        animate="visible"
        align={{ md: "center" }}
        columnGap={8}
        rowGap={4}
        direction={{ base: "column", md: "row" }}
      >
        {/* Left side */}
        <Box as={motion.div} variants={heroItem} flex="1" fontSize="1.75rem" alignSelf="start">
          <Text fontWeight="bold">
            End the chore wars. <Box as="span" bgColor="olive.500" borderRadius="50%" />
          </Text>

          <Text
            as={motion.div}
            variants={textItem}
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
            Win your weekend back!
          </Text>
        </Box>

        {/* Right side */}
        <Flex as={motion.div} variants={heroItem} flex="1" direction="column" align="flex-start" gap={6}>
          <Box
            as={motion.div}
            variants={textItem}
            borderWidth="1px"
            borderStyle="solid"
            borderColor="dark.500"
            fontSize="1.25rem"
            px={4}
            py={2}
          >
            {LANDING_PAGE_DESCRIPTION}
          </Box>

          <Flex as={motion.div} variants={textItem} gap={4}>
            <Button onClick={() => setGetStartedOpen(true)}>Get Started for Free</Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Body;
