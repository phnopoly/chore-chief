import React, { createContext, useContext, useState } from "react";

interface SetupState {
  numMembers: number;
  bedrooms: number;
  bathrooms: number;
  selectedChoreCategories: string[];
}

interface SetupContextType extends SetupState {
  setNumMembers: (v: number) => void;
  setBedrooms: (v: number) => void;
  setBathrooms: (v: number) => void;
  setSelectedChoreCategories: (v: string[]) => void;
  reset: () => void;
}

const SetupContext = createContext<SetupContextType | null>(null);

export const SetupProvider = ({ children }: { children: React.ReactNode }) => {
  const [numMembers, setNumMembers] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [selectedChoreCategories, setSelectedChoreCategories] = useState<string[]>([]);

  const reset = () => {
    setNumMembers(1);
    setBedrooms(1);
    setBathrooms(1);
    setSelectedChoreCategories([]);
  };

  return (
    <SetupContext.Provider
      value={{
        numMembers,
        bedrooms,
        bathrooms,
        selectedChoreCategories,
        setNumMembers,
        setBedrooms,
        setBathrooms,
        setSelectedChoreCategories,
        reset,
      }}
    >
      {children}
    </SetupContext.Provider>
  );
};

export const useSetup = () => {
  const ctx = useContext(SetupContext);
  if (!ctx) throw new Error("useSetup must be used within SetupProvider");
  return ctx;
};
