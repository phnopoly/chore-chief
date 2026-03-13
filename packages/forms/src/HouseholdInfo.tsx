import React from "react";
import { Box, Container, Stack, FormControl, FormLabel, Input, Select, Text, Flex } from "@chakra-ui/react";
import { Button } from "@chore-champ/ui";

const HOUSE_TYPES = [
  { value: "apartment", label: "Apartment | Condo" },
  { value: "house", label: "Single-Family House" },
  { value: "shared", label: "Shared Rental" },
  { value: "townhouse", label: "Townhouse" },
  { value: "dorm", label: "Dorm | Studio" },
];

const HouseholdInfo: React.FC<{
  numMembers: number | null;
  setNumMembers: (num: number) => void;
  homeType: string | null;
  setHomeType: (type: string) => void;
  setGetStartedStep: (step: 0 | 1 | 2 | 3) => void;
}> = ({ numMembers, setNumMembers, homeType, setHomeType, setGetStartedStep }) => {
  return (
    <Container py={4} px={0}>
      <Stack
        spacing={6}
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Box>
          <Text fontSize="lg" fontWeight="medium">
            Household Information
          </Text>
          <Text fontSize="sm" color="gray.500">
            Please provide your household details below.
          </Text>
        </Box>

        <FormControl id="members" isRequired>
          <FormLabel>Number of Members</FormLabel>
          <Input
            name="members"
            type="number"
            value={numMembers ?? ""}
            min={1}
            max={10}
            placeholder="Enter number of household members"
            onChange={(e) => setNumMembers(Number(e.target.value))}
          />
        </FormControl>

        <FormControl id="homeType" isRequired>
          <FormLabel>Home Type</FormLabel>
          <Select
            value={homeType ?? ""}
            name="homeType"
            placeholder="Select Home Type"
            onChange={(e) => setHomeType(e.target.value)}
          >
            {HOUSE_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </Select>
        </FormControl>

        <Flex alignSelf="flex-end">
          <Button
            type="submit"
            size="md"
            onClick={() => {
              if (numMembers !== null && homeType !== null) {
                setGetStartedStep(1);
              }
            }}
          >
            Next
          </Button>
        </Flex>
      </Stack>
    </Container>
  );
};

export default HouseholdInfo;
