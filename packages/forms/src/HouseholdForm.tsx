import React, { useState } from "react";
import { Box, Heading, VStack, Input, Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

const HOUSE_TYPES = [
  { value: "apartment", label: "Apartment / Condo" },
  { value: "house", label: "Single-family House" },
  { value: "shared", label: "Shared Rental" },
  { value: "townhouse", label: "Townhouse" },
  { value: "dorm", label: "Dorm / Studio" },
];

interface HouseholdFormProps {
  onSubmit: (data: { householdSize: number; houseType: string }) => void;
}

const HouseholdForm: React.FC<HouseholdFormProps> = ({ onSubmit }) => {
  const [householdSize, setHouseholdSize] = useState<number>(1);
  const [houseType, setHouseType] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!houseType) return;
    onSubmit({ householdSize, houseType });
  };

  return (
    <Box bg="gray.50" px={8} py={10} mx="auto" maxW="3xl" display="flex" justifyContent="center">
      <Box as="form" onSubmit={handleSubmit} bg="white" p={8} rounded="xl" shadow="md" w="full" maxW="xs">
        <Heading as="h1" size="lg" textAlign="center" mb={8}>
          Household Info
        </Heading>

        <VStack spacing={6} align="stretch">
          <Input
            placeholder="Number of people"
            type="number"
            min={1}
            max={10}
            value={householdSize}
            onChange={(e) => setHouseholdSize(Number(e.target.value))}
            textAlign="center"
            w="full"
          />

          <Menu>
            <MenuButton as={Button} variant="outline" justifyContent="space-between" w="full">
              {houseType ? HOUSE_TYPES.find((t) => t.value === houseType)?.label : "Select home type"}
            </MenuButton>
            <MenuList>
              {HOUSE_TYPES.map((type) => (
                <MenuItem key={type.value} onClick={() => setHouseType(type.value)}>
                  {type.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Button type="submit" colorScheme="blue" isDisabled={!houseType} alignSelf="center">
            Continue
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default HouseholdForm;
