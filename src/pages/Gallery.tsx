import { Footer, MobileStickyReservationBar } from "@/components/BottomSections";
import { FullGallerySection, Navbar } from "@/components/UpperSections";

export default function Gallery() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-28 text-[var(--color-ink)] md:pb-0">
      <Navbar />
      <main>
        <FullGallerySection />
      </main>
      <MobileStickyReservationBar />
      <Footer />
    </div>
  );
}
