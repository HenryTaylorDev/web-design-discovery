import React from "react";
import ChecklistStep from "./ChecklistStep";

interface FeaturesStepProps {
  completeStep: (index: number, checkedItems: string[]) => void;
}

const FeaturesStep: React.FC<FeaturesStepProps> = ({ completeStep }) => {
  const options = [
    "Image Gallery",
    "Blog",
    "Online Store",
    "Newsletter Sign-Up",
    "Appointment Booking",
    "Social Media Integration",
    "User Login/Member Area",
    "Other",
  ];

  return (
    <ChecklistStep
      questionText="What features would you like?"
      options={options}
      stepIndex={2} // Pass the step index
      onComplete={completeStep}
    />
  );
};

export default FeaturesStep;
