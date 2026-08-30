import { useEffect } from "react";
import { BlogArchiveSection } from "@/components/BlogSections";
import { Footer, MobileStickyReservationBar } from "@/components/BottomSections";
import { Navbar } from "@/components/UpperSections";

export default function Blog() {
  useEffect(() => {
    document.title = "Blog - Domek na Zrąbku";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Lokalne przewodniki i spokojne inspiracje z Podhala. Blog o Zębie i Gubałówce.");
    }
  }, []);

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
