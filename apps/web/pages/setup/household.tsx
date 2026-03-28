import React from "react";
import { useRouter } from "next/router";

import { HouseholdForm } from "@chore-chief/forms";
import { useSetup } from "@chore-chief/forms";
import { useReferenceCategories } from "@chore-chief/api-client";

const HouseholdPage = () => {
  const router = useRouter();
  const { categories } = useReferenceCategories();

  const {
    numMembers,
    setNumMembers,
    bedrooms,
    setBedrooms,
    bathrooms,
    setBathrooms,
    selectedChoreCategories,
    setSelectedChoreCategories,
  } = useSetup();

  return (
    <HouseholdForm
      categories={categories || []}
      numMembers={numMembers}
      setNumMembers={setNumMembers}
      bedrooms={bedrooms}
      setBedrooms={setBedrooms}
      bathrooms={bathrooms}
      setBathrooms={setBathrooms}
      selectedChoreCategories={selectedChoreCategories}
      setSelectedChoreCategories={setSelectedChoreCategories}
      onBack={() => router.push("/")}
      onNext={() => router.push("/setup/overview")}
    />
  );
};

export default HouseholdPage;
