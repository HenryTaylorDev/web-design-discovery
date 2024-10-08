export interface FormData {
  purpose: string[];
  features: string[];
  pageDesignChoices: { [key: string]: string };
  wireframeChoices: string[];
  brandAndVoice: {
    mission: string;
    usp: string;
    targetAudience: string;
  };
}
