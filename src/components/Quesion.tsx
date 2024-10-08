import { Heading, Text } from "@chakra-ui/react";
import React from "react";

interface QuestionProps {
  text: string;
  size: string;
}

const Question: React.FC<QuestionProps> = ({ text, size }) => {
  return (
    <>
      <Heading
        as="h1"
        fontFamily="'Roboto Mono', sans-serif"
        fontSize={size}
        fontWeight="bold"
        mb={4}
      >
        {text}
      </Heading>
    </>
  );
};

export default Question;
