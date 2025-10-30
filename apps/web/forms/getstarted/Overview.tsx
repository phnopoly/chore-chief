import React from "react";
import { Box, Button, Container, Stack, Text, Flex } from "@chakra-ui/react";

const ChoreCategories: React.FC<{
  setGetStartedStep: (step: 0 | 1 | 2 | 3) => void;
}> = ({ setGetStartedStep }) => {
  return (
    <Container py={4} px={0}>
      <Stack spacing={6}>
        <Box>
          <Text fontSize="lg" fontWeight="medium">
            Chores Frequency
          </Text>
          <Text fontSize="sm" color="gray.500">
            The suggested frequency for chores in each category will be set based on typical household needs. The
            frequency for each chore can be customized later.
          </Text>
        </Box>
        <Flex columnGap={4}>
          <Button type="button" onClick={() => setGetStartedStep(1)}>
            Back
          </Button>
          <Button type="button" onClick={() => setGetStartedStep(3)}>
            Next
          </Button>
        </Flex>
      </Stack>
    </Container>
  );
};

export default ChoreCategories;
