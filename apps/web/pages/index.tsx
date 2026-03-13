import React, { useState } from "react";
import {
  Container,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { ChoreCategories, HouseholdInfo } from "@chore-champ/forms";
import Overview from "./Overview";
import Header from "../src/Header";
import Body from "../src/Body";
import Footer from "../src/Footer";

const Landing: React.FC = () => {
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
      <Container px={0} maxW="6xl" bg="gray.50">
        <Header />
        <Body setGetStartedOpen={setGetStartedOpen} />
        <Footer />
      </Container>
      <Modal isOpen={getStartedOpen} onClose={handleCancelModal} scrollBehavior="inside" size="xl" isCentered>
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
            <Text fontWeight="medium" px={6} py={2}>
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
            {getStartedStep === 2 && (
              <Overview setGetStartedStep={setGetStartedStep} selectedCategories={selectedChoreCategories} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Landing;
