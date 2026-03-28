import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import React from "react";

interface ButtonProps extends ChakraButtonProps {
  colorScheme?: "olive" | "dark";
}

const Button = ({ children, colorScheme = "dark", size = "lg", variant = "solid", ...props }: ButtonProps) => {
  const isSolid = variant === "solid";

  return (
    <ChakraButton
      size={size}
      variant={variant}
      colorScheme={colorScheme}
      transition="all 0.2s ease"
      _hover={{
        transform: "translateY(-1px)",
        boxShadow: "sm",
      }}
      _active={{
        transform: "translateY(0)",
        boxShadow: "none",
      }}
      {...(isSolid && {
        bg: `${colorScheme}.500`,
        color: "white",
        border: "1px solid",
        borderColor: `${colorScheme}.600`,
        _hover: {
          transform: "translateY(-1px)",
          boxShadow: "sm",
          bg: `${colorScheme}.600`,
          borderColor: `${colorScheme}.700`,
        },
        _active: {
          transform: "translateY(0)",
          boxShadow: "none",
          bg: `${colorScheme}.700`,
          borderColor: `${colorScheme}.800`,
        },
        _focus: {
          boxShadow: `0 0 0 2px var(--chakra-colors-${colorScheme}-300)`,
        },
      })}
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
