import { BlogArchiveSection } from "@/components/BlogSections";
import { Footer, MobileStickyReservationBar } from "@/components/BottomSections";
import { Navbar } from "@/components/UpperSections";

export default function Blog() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-28 text-[var(--color-ink)] md:pb-0">
      <Navbar />
      <main>
        <BlogArchiveSection />
      </main>
      <MobileStickyReservationBar />
      <Footer />
    </div>
  );
}
