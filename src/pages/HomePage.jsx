import { ContactSection } from "../components/ContactSection";
import { DoctorPreview } from "../components/DoctorPreview";
import { Hero } from "../components/Hero";
import { ServicesSection } from "../components/ServicesSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { TrustBar } from "../components/TrustBar";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { SiteShell } from "../layouts/SiteShell";

export function HomePage() {
  return (
    <SiteShell currentPage="Home">
      <Hero />
      <TrustBar />
      <DoctorPreview />
      <ServicesSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <ContactSection />
    </SiteShell>
  );
}
