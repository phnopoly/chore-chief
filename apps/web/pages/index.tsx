import Head from "next/head";
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import HouseholdInfo from "../forms/getstarted/HouseholdInfo";
import ChoreCategories from "../forms/getstarted/ChoreCategories";
import Overview from "../forms/getstarted/Overview";

const Hello: React.FC = () => {
  const [getStartedOpen, setGetStartedOpen] = useState(false);
  const [getStartedStep, setGetStartedStep] = useState<0 | 1 | 2 | 3>(0);
  const [numMembers, setNumMembers] = useState<number | null>(null);
  const [homeType, setHomeType] = useState<string | null>(null);
  const [selectedChoreCategories, setSelectedChoreCategories] = useState<string[]>([]);

  const handleCancelModal = () => {
    setGetStartedStep(0);
    setSelectedChoreCategories([]);
    setNumMembers(null);
    setHomeType(null);
    setGetStartedOpen(false);
  };

  return (
    <>
      <Head>
        <title>ChoreChamp - Fair, Fast, and Fun Household Management</title>
      </Head>
      <main>
        <Container py={12} px={6} maxW="5xl">
          <Box as="header" mb={16}>
            <Flex align="center" justify="space-between" flexWrap="wrap" rowGap={2} columnGap={10}>
              <Image src="/assets/logo-vector.svg" alt="ChoreChamp Logo" maxWidth="100dvw" />
              <Heading fontWeight="normal" fontSize="1.5rem" lineHeight="1.625rem" maxWidth="20rem">
                Fair, Fast, and Fun Household Management
              </Heading>
            </Flex>
          </Box>
          <Box as="section">
            <Flex
              align={{ base: "flex-start", md: "center" }}
              justify="space-between"
              columnGap={8}
              rowGap={6}
              direction={{ base: "column", md: "row" }}
            >
              <Box flex="1" fontSize="1.75rem">
                <Text fontWeight="bold">
                  End the chore wars.{" "}
                  <Box
                    as="span"
                    bgColor="green.400"
                    display="inline-block"
                    w="2rem"
                    h="2rem"
                    borderRadius="50%"
                    verticalAlign="middle"
                  />
                </Text>
                <Text>Win your weekend back.</Text>
              </Box>
              <Flex flex="1" direction="column" align="flex-start" gap={6}>
                <Box
                  borderWidth="1px"
                  borderStyle="solid"
                  borderColor="red.700"
                  fontSize="1.25rem"
                  px={6}
                  py={4}
                  position="relative"
                  _before={{
                    content: '""',
                    position: "absolute",
                    right: "-10px",
                    bottom: "-10px",
                    w: 8,
                    h: 8,
                    bg: "red.700",
                  }}
                >
                  ChoreChamp makes it easy to divide and conquer household tasks. Create custom lists, assign duties,
                  and track progress.
                </Box>
                <Button colorScheme="green" size="lg" onClick={() => setGetStartedOpen(true)}>
                  Get Started for Free
                </Button>
                <Button colorScheme="blue" size="lg">
                  Learn More
                </Button>
              </Flex>
            </Flex>
          </Box>
        </Container>
        <Box bgColor="green.400">
          <Container>hi</Container>
        </Box>
        <Modal isOpen={getStartedOpen} onClose={handleCancelModal} size="xl" isCentered>
          <ModalOverlay />
          <ModalContent
            borderRadius="md"
            overflow="hidden"
            boxShadow="0 0 0 1px rgba(0, 0, 0, 0.2), 0 0 3px rgba(0, 0, 0, 0.1)"
            p={0}
          >
            <ModalHeader
              borderBottom="1px solid rgba(0, 0, 0, 0.1)"
              p={0}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontWeight="medium" px={6}>
                Getting Started
              </Text>
              <ModalCloseButton size="lg" borderRadius={0} position="unset" />
            </ModalHeader>
            <ModalBody>
              {getStartedStep === 0 && (
                <HouseholdInfo
                  numMembers={numMembers}
                  setNumMembers={setNumMembers}
                  homeType={homeType}
                  setHomeType={setHomeType}
                  setGetStartedStep={setGetStartedStep}
                />
              )}
              {getStartedStep === 1 && (
                <ChoreCategories
                  selectedChoreCategories={selectedChoreCategories}
                  setSelectedChoreCategories={setSelectedChoreCategories}
                  setGetStartedStep={setGetStartedStep}
                />
              )}
              {getStartedStep === 2 && <Overview setGetStartedStep={setGetStartedStep} />}
            </ModalBody>
            <ModalFooter borderTop="1px solid rgba(0, 0, 0, 0.1)" justifyContent="flex-end" p={0}>
              <Button variant="ghost" borderRadius={0} onClick={handleCancelModal}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </main>
    </>
  );
};

export default Hello;
