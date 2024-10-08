import React, { useState } from "react";
import { Box, Button, Checkbox, Flex, Stack, Text } from "@chakra-ui/react";
import Question from "./Quesion";

interface ChecklistStepProps {
  questionText: string;
  options: string[];
  stepIndex: number;
  onComplete: (index: number, checkedItems: string[]) => void;
}

const ChecklistStep: React.FC<ChecklistStepProps> = ({
  questionText,
  options,
  stepIndex,
  onComplete,
}) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  // Handle checkbox change
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    answer: string
  ) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setCheckedItems((prev) => [...prev, answer]);
    } else {
      setCheckedItems((prev) => prev.filter((item) => item !== answer));
    }
  };

  return (
    <Flex justify="start" align="start" w="100%" direction="column">
      <Question text={questionText} size="4xl" />
      <Stack pl={0} mt={1} spacing={1}>
        {options.map((option, index) => (
          <Checkbox
            key={index}
            size="lg"
            spacing={3}
            isChecked={checkedItems.includes(option)}
            onChange={(e) => handleCheckboxChange(e, option)}
          >
            <Text fontFamily="'Roboto Mono', sans-serif">{option}</Text>
          </Checkbox>
        ))}
      </Stack>
      <Box>
        <Button
          colorScheme="gray"
          mt={5}
          onClick={() => onComplete(stepIndex, checkedItems)}
        >
          Next
        </Button>
      </Box>
    </Flex>
  );
};

export default ChecklistStep;
