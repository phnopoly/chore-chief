import React from "react";
import { ButtonGroup, Button } from "@chakra-ui/react";

interface NumberPickerProps {
  value: number;
  options: number[];
  onChange: (num: number) => void;
}

const NumberPicker: React.FC<NumberPickerProps> = ({ value, options, onChange }) => {
  return (
    <ButtonGroup isAttached size="sm" variant="outline">
      {options.map((option) => (
        <Button
          key={option}
          variant={value === option ? "solid" : "outline"}
          colorScheme={value === option ? "olive" : "gray"}
          onClick={() => onChange(option)}
        >
          {option}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default NumberPicker;
