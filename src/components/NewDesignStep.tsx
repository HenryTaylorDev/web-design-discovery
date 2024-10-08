import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Image,
  Checkbox,
  Text,
  Flex,
  HStack,
  Stack,
} from "@chakra-ui/react";
import Question from "./Quesion";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

// Function to import images dynamically
const importAllImages = () => {
  const images = [];
  for (let i = 13; i <= 26; i++) {
    images.push({
      id: i,
      image: `assets/web-examples/${i}.png`,
      name: `Design ${i}`,
    });
  }
  return images;
};

interface NewDesignStepProps {
  onSelectionComplete: (data: {
    designId: number;
    liked: boolean;
    options?: string[];
  }) => void; // Function to pass data up to the parent component
}

const NewDesignStep: React.FC<NewDesignStepProps> = ({
  onSelectionComplete,
}) => {
  const [selectedDesigns, setSelectedDesigns] = useState<{
    [key: number]: { liked: boolean; options?: string[] };
  }>({});
  const [designExamples, setDesignExamples] = useState<
    { id: number; image: string; name: string }[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current image index
  const [showOptions, setShowOptions] = useState(false); // Show options for liked designs
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // Track selected options for current design
  const [showNextButton, setShowNextButton] = useState(false); // Show next button after options selected

  useEffect(() => {
    const images = importAllImages();
    setDesignExamples(images);
  }, []);

  const handleSelectDesign = (like: boolean) => {
    const currentDesign = designExamples[currentIndex];
    setSelectedDesigns((prevSelectedDesigns) => ({
      ...prevSelectedDesigns,
      [currentDesign.id]: { liked: like },
    }));

    if (like) {
      setShowOptions(true);
    } else {
      handleNextDesign();
    }
  };

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((opt) => opt !== option)
        : [...prevOptions, option]
    );
  };

  const handleNextDesign = () => {
    const currentDesign = designExamples[currentIndex];
    const selectionData = {
      designId: currentDesign.id,
      liked: true,
      options: selectedOptions,
    };

    onSelectionComplete(selectionData);

    setSelectedDesigns((prevSelectedDesigns) => ({
      ...prevSelectedDesigns,
      [currentDesign.id]: { liked: true, options: selectedOptions },
    }));

    setShowOptions(false);
    setShowNextButton(false);
    setSelectedOptions([]);

    if (currentIndex < designExamples.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      console.log("Finished selecting designs!");
      console.log(selectedDesigns);
    }
  };

  useEffect(() => {
    if (selectedOptions.length > 0) {
      setShowNextButton(true);
    } else {
      setShowNextButton(false);
    }
  }, [selectedOptions]);

  if (designExamples.length === 0) return null;

  const currentDesign = designExamples[currentIndex];

  return (
    <Box w="100%">
      <Flex mb={10} direction="column" align="start">
        <Question text="Have a look at these designs" size="4xl" />
        <Text fontSize="lg" mb={4}>
          Click on the ones you like
        </Text>
      </Flex>
      <Flex gap={2} align="center" w="100%">
        <Flex align="center" direction="column">
          <Flex align={"center"} justify={"center"}>
            <Image
              src={currentDesign.image}
              alt={currentDesign.name}
              objectFit="contain"
            />
          </Flex>
        </Flex>
        {!showOptions && (
          <HStack justify="start" flexDirection="column" spacing={5}>
            {/* Yes button */}
            <Button onClick={() => handleSelectDesign(true)}>
              <CheckIcon color="green" />
            </Button>
            {/* No button */}
            <Button onClick={() => handleSelectDesign(false)}>
              <CloseIcon color="red" />
            </Button>
          </HStack>
        )}

        {showOptions && (
          <Box>
            <Text fontSize="lg" align="left" fontWeight="bold">
              What do you like about this design? (Select all that apply)
            </Text>
            <Stack spacing={3}>
              {["Colours", "Font", "Layout", "General Vibe"].map((option) => (
                <Checkbox
                  key={option}
                  isChecked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
                >
                  {option}
                </Checkbox>
              ))}
            </Stack>
            {showNextButton && (
              <Flex>
                <Button colorScheme="gray" mt={5} onClick={handleNextDesign}>
                  Next
                </Button>
              </Flex>
            )}
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default NewDesignStep;
