import { Box, Stack } from "@mui/material";
import CoreValuesSection from "./AboutUsCoreValues";
import CTASection from "./AboutUsCTA";
import FeaturesSection from "./AboutUsFeatured";
import MissionSection from "./AboutUsMission";
import StatsSection from "./AboutUsStats";
import StorySection from "./AboutUsStory";
import WhyChooseUsSection from "./AboutUsWhyChooseUs";

const AboutUsContainer = () => {
  return (
    <Stack spacing={8} sx={{ py: 6 }} alignItems="center">
      <MissionSection />
      <StorySection />
      <FeaturesSection />
      <CoreValuesSection />
      <WhyChooseUsSection />
      <StatsSection />
      <CTASection />
    </Stack>
  );
}

export default AboutUsContainer;
