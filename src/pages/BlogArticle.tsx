import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { BlogArticleSection, BlogNotFoundSection } from "@/components/BlogSections";
import { Footer, MobileStickyReservationBar } from "@/components/BottomSections";
import { Navbar } from "@/components/UpperSections";
import { getBlogArticleBySlug } from "@/data/blog-content";

export default function BlogArticle() {
  const { slug } = useParams();
  const article = getBlogArticleBySlug(slug);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} - Domek na Zrąbku`;
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute("content", article.description);
    }
  }, [article]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-28 text-[var(--color-ink)] md:pb-0">
      <Navbar />
      <main>{article ? <BlogArticleSection article={article} /> : <BlogNotFoundSection />}</main>
      <MobileStickyReservationBar />
      <Footer />
    </div>
  );
}
