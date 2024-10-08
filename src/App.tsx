import { useEffect, useState } from "react";
import "./App.css";
import PurposeStep from "./components/PurposeStep";
import {
  Box,
  ChakraProvider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import FeaturesStep from "./components/FeaturesStep";
import { FormData } from "./models/FormDataModel";
import theme from "./theme";
import DesignExampleStep from "./components/DesignExampleStep";

function App() {
  const [formData, setFormData] = useState<FormData>({
    purpose: [],
    features: [],
    pageDesignChoices: {},
    wireframeChoices: [],
    brandAndVoice: { mission: "", usp: "", targetAudience: "" },
  });

  const [tabIndex, setTabIndex] = useState(0);

  const updatePurpose = (newPurpose: string[]) => {
    setFormData((prev) => ({
      ...prev,
      purpose: newPurpose,
    }));
  };

  const completeStep = (index: number, checkedItems: string[]) => {
    setTabIndex(index);

    if (index === 1) {
      setFormData((prev) => ({
        ...prev,
        purpose: {
          ...prev.purpose,
          checkedItems,
        },
      }));
    } else if (index === 2) {
      setFormData((prev) => ({
        ...prev,
        features: {
          ...prev.features,
          checkedItems,
        },
      }));
    }
  };

  const handleSelectionComplete = (data: {
    designId: number;
    liked: boolean;
    options?: string[];
  }) => {
    setFormData((prev) => ({
      ...prev,
      pageDesignChoices: {
        ...prev.pageDesignChoices,
        [data.designId]: {
          liked: data.liked,
          options: data.options,
        },
      },
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <Box m={6}>
          <Tabs
            index={tabIndex}
            variant="soft-rounded"
            colorScheme="green"
            onChange={(index) => setTabIndex(index)}
          >
            <TabList>
              <Tab>Purpose</Tab>
              <Tab>Features</Tab>
              <Tab>Design</Tab>
            </TabList>

            <TabPanels mt={8}>
              <TabPanel>
                <PurposeStep completeStep={completeStep} />
              </TabPanel>
              <TabPanel>
                <FeaturesStep completeStep={completeStep} />
              </TabPanel>
              <TabPanel>
                <DesignExampleStep
                  onSelectionComplete={handleSelectionComplete}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </ChakraProvider>
    </div>
  );
}

export default App;
