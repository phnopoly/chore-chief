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
import { ChoreForm, HouseholdForm } from "@chore-chief/forms";
import Overview from "./Overview";
import Header from "../src/Header";
import Body from "../src/Body";
import Footer from "../src/Footer";
import { useReferenceCategories } from "@chore-chief/api-client";

const Landing: React.FC = () => {
  const [getStartedOpen, setGetStartedOpen] = useState(false);
  const [getStartedStep, setGetStartedStep] = useState<0 | 1 | 2 | 3>(0);
  const [numMembers, setNumMembers] = React.useState(1);
  const [bedrooms, setBedrooms] = React.useState(1);
  const [bathrooms, setBathrooms] = React.useState(1);
  const [selectedChoreCategories, setSelectedChoreCategories] = useState<string[]>([]);

  const { categories, loading } = useReferenceCategories();

  const handleCancelModal = () => {
    setGetStartedStep(0);
    setSelectedChoreCategories([]);
    setNumMembers(1);
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
            {getStartedStep === 0 && !loading && (
              <HouseholdForm
                numMembers={numMembers}
                categories={categories}
                setNumMembers={setNumMembers}
                bedrooms={bedrooms}
                setBedrooms={setBedrooms}
                bathrooms={bathrooms}
                setBathrooms={setBathrooms}
                selectedChoreCategories={selectedChoreCategories}
                setSelectedChoreCategories={setSelectedChoreCategories}
                setGetStartedStep={setGetStartedStep}
              />
            )}
            {getStartedStep === 1 && (
              <ChoreForm filePath="/data/chores.json" selectedCategories={selectedChoreCategories} />
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
