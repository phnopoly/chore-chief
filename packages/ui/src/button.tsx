import { Button as CButton } from "@chakra-ui/react";
import React from "react";

export interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, onClick }) => {
  return (
    <CButton onClick={onClick} colorScheme="teal" borderRadius="2xl">
      {children}
    </CButton>
  );
};
