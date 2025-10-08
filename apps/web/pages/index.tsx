"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  Flex,
  Button,
  SimpleGrid,
  Link,
  Portal,
  CloseButton,
  Dialog,
} from "@chakra-ui/react";
import HouseholdForm from "./HouseholdForm";
import CategoryForm from "./CategoryForm";
import ChoreForm from "./ChoreForm";

const Feature = ({ title, text }: { title: string; text: string }) => (
  <Stack className="card" p={6}>
    <Text fontWeight={600} fontSize="xl">
      {title}
    </Text>
    <Text color="gray.600">{text}</Text>
  </Stack>
);

const Home: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [categories, setCategories] = useState<string[]>([]);

  const handleClose = () => {
    setStep(0);
    setCategories([]);
    setOpen(false);
  };

  return (
    <Box>
      <Box
        bgGradient="linear(to-r, teal.100, white 60%)"
        py={0}
        px={0}
        boxShadow="sm"
        borderBottom="2px solid"
        borderColor="teal.400"
        as="header"
        w="full"
        position="relative"
        zIndex={10}
      >
        <Container maxW="6xl" px={{ base: 4, md: 8 }} py={4}>
          <Flex align="center" justify="space-between" flexWrap="wrap" gap={3}>
            <Flex align="center" gap={3}>
              <Box
                as="span"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                bg="teal.500"
                color="white"
                borderRadius="full"
                boxSize={{ base: 10, md: 12 }}
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="bold"
                shadow="md"
                mr={1}
              >
                🧹
              </Box>
              <Heading
                as="h1"
                fontFamily="'Merriweather', serif"
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontWeight="extrabold"
                color="teal.700"
                letterSpacing="tight"
                lineHeight={1}
              >
                ChoreChamp
              </Heading>
            </Flex>
            <Text
              fontFamily="'Public Sans', sans-serif"
              fontSize={{ base: "xs", sm: "sm", md: "lg" }}
              color="gray.600"
              fontWeight={500}
              letterSpacing="wider"
              textAlign={{ base: "left", md: "right" }}
              maxW={{ base: "100%", md: "60%" }}
            >
              Fair, Fast, and Fun Household Management
            </Text>
          </Flex>
        </Container>
      </Box>
      {/* Main */}
      <Box bg="gray.50">
        <Container maxW="6xl" py={{ base: 16, md: 24 }}>
          <Stack as={Box} textAlign="center" gap={{ base: 8, md: 14 }}>
            <Heading
              fontWeight={700}
              fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
              lineHeight="110%"
              color="gray.900"
            >
              End the Chore Wars. <br />
              <Text as="span" color="primary.600">
                Win Your Weekend Back.
              </Text>
            </Heading>
            <Text color="gray.600" maxW="3xl" mx="auto" fontSize="lg">
              ChoreChamp makes it easy to divide and conquer household tasks. Create custom lists, assign duties, and
              track progress.
            </Text>
            <Stack direction="row" gap={4} align="center" justify="center">
              <Button className="btn-primary" onClick={() => setOpen(true)}>
                Get Started for Free
              </Button>
              <Link href="#" _hover={{ textDecoration: "none" }}>
                <Button className="btn-secondary">Learn More</Button>
              </Link>
            </Stack>
          </Stack>

          {/* Features */}
          <Box py={{ base: 20, md: 28 }}>
            <Stack gap={4} as={Container} maxW="3xl" textAlign="center" mb={12}>
              <Heading fontSize="4xl" color="gray.800">
                Everything You Need for a Tidy Home
              </Heading>
              <Text color="gray.600" fontSize="xl">
                From the kitchen to the backyard, ChoreChamp helps you manage it all.
              </Text>
            </Stack>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={10}>
              <Feature
                title="Custom Chore Lists"
                text="Generate tailored chore lists based on your home type and needs."
              />
              <Feature title="Fair Assignments" text="Assign tasks fairly and track who’s doing what." />
              <Feature title="Progress Tracking" text="Mark chores complete and see progress at a glance." />
            </SimpleGrid>
          </Box>
        </Container>
      </Box>
      <Dialog.Root
        open={open}
        onOpenChange={(details: { open: unknown }) => {
          if (!details.open) handleClose();
        }}
        size="xl"
        placement="center"
      >
        <Portal>
          <Dialog.Backdrop />
          {/* @ts-expect-error chakra types not yet exposed */}
          <Dialog.Positioner>
            {/* @ts-expect-error chakra types not yet exposed */}
            <Dialog.Content borderRadius="xl" boxShadow="2xl" p={0}>
              {/* @ts-expect-error chakra types not yet exposed */}
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>

              <Dialog.Header>
                {/* @ts-expect-error chakra types not yet exposed */}
                <Dialog.Title>
                  <Text fontWeight="bold">
                    {step === 0 && "Household Info"}
                    {step === 1 && "Select Chore Categories"}
                    {step === 2 && "Chore List"}
                  </Text>
                </Dialog.Title>
              </Dialog.Header>

              <Dialog.Body p={0}>
                {step === 0 && <HouseholdForm onSubmit={() => setStep(1)} />}
                {step === 1 && (
                  <CategoryForm
                    defaultChecked={[]}
                    onSubmit={(selected) => {
                      setCategories(selected);
                      setStep(2);
                    }}
                  />
                )}
                {step === 2 && <ChoreForm filePath="/chores.json" selectedCategories={categories} />}
              </Dialog.Body>

              <Dialog.Footer justifyContent="flex-end" gap={3}>
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
};

export default Home;
