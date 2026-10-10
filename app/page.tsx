import { Home } from "@/components/home";
import { LandingPageStats } from "@/components/layout/landing-page-stats/landing-page-stats";
import { Testimonials } from "@/components/layout/testimonials/testimonials";
import { Pricing } from "@/components/layout/pricing/pricing";
import { InterviewProcess } from "@/components/layout/interview-process/interview-process";

export default function HomePage() {
  return (
    <>
      <Home />
      <LandingPageStats />
      <Testimonials />
      <Pricing />
      <InterviewProcess />
    </>
  );
}
