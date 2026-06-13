import { Footer, ContactSection, FaqSection, MobileStickyReservationBar, ReviewsSection } from "@/components/BottomSections";
import { BlogPreviewSection } from "@/components/BlogSections";
import { LocationSection } from "@/components/MidSections";
import { AboutSection, GallerySection, HeroSection, Navbar, ValuePropsSection } from "@/components/UpperSections";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-28 text-[var(--color-ink)] md:pb-0">
      <Navbar />
      <main>
        <HeroSection />
        <ValuePropsSection />
        <AboutSection />
        <GallerySection />
        <LocationSection />
        <BlogPreviewSection />
        <ReviewsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <MobileStickyReservationBar />
      <Footer />
    </div>
  );
}
