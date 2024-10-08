import React from "react";
import ChecklistStep from "./ChecklistStep";

interface PurposeStepProps {
  completeStep: (index: number, checkedItems: string[]) => void;
}

const PurposeStep: React.FC<PurposeStepProps> = ({ completeStep }) => {
  const options = [
    "E-commerce",
    "Portfolio",
    "Blog",
    "Community",
    "Services",
    "A shop window for your business",
    "Event Promotion",
    "Product Promotion",
    "Brochure",
    "Other",
  ];

  return (
    <ChecklistStep
      questionText="What is the purpose of your website?"
      options={options}
      stepIndex={1} // Pass the step index
      onComplete={completeStep}
    />
  );
};

export default PurposeStep;
