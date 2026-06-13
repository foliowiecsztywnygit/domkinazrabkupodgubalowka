import { useParams } from "react-router-dom";

import { BlogArticleSection, BlogNotFoundSection } from "@/components/BlogSections";
import { Footer, MobileStickyReservationBar } from "@/components/BottomSections";
import { Navbar } from "@/components/UpperSections";
import { getBlogArticleBySlug } from "@/data/blog-content";

export default function BlogArticle() {
  const { slug } = useParams();
  const article = getBlogArticleBySlug(slug);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-28 text-[var(--color-ink)] md:pb-0">
      <Navbar />
      <main>{article ? <BlogArticleSection article={article} /> : <BlogNotFoundSection />}</main>
      <MobileStickyReservationBar />
      <Footer />
    </div>
  );
}
