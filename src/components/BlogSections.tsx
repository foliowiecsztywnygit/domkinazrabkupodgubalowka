import { Link } from "react-router-dom";

import { Reveal, SectionIntro } from "@/components/SectionAtoms";
import { blogArticles, featuredBlogArticles, getRelatedBlogArticles, type BlogArticle } from "@/data/blog-content";

function BlogMeta({ article }: { article: BlogArticle }) {
  return (
    <div className="flex flex-wrap gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
      <span>{article.category}</span>
      <span>{article.readTime}</span>
      <span>{article.metaTitle}</span>
    </div>
  );
}

function BlogCard({
  article,
  actionLabel,
  actionHref,
  emphasized = false,
}: {
  article: BlogArticle;
  actionLabel: string;
  actionHref: string;
  emphasized?: boolean;
}) {
  return (
    <div className="ambient-card p-7">
      <p className="section-kicker">{article.category}</p>
      <h3 className="mt-5 font-display text-3xl leading-tight text-[var(--color-deep)]">{article.title}</h3>
      <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">{article.excerpt}</p>
      <div className="mt-6">
        <BlogMeta article={article} />
      </div>
      <Link to={actionHref} className={emphasized ? "button-primary mt-8" : "button-secondary mt-8"}>
        {actionLabel}
      </Link>
    </div>
  );
}

export function BlogPreviewSection() {
  return (
    <section className="section-shell">
      <SectionIntro
        eyebrow="Blog"
        title="Lokalne przewodniki i spokojne inspiracje z Podhala."
        description="Krótki przegląd tematów, które pomagają zaplanować pobyt w Zębie, Nowem Bystrym i pod Gubałówką bez turystycznego pośpiechu."
      />
      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {featuredBlogArticles.map((article, index) => (
          <Reveal key={article.slug} delayClassName={`delay-${(index % 3) + 1}`}>
            <BlogCard article={article} actionLabel="Czytaj artykuł" actionHref={`/blog/${article.slug}`} emphasized />
          </Reveal>
        ))}
      </div>
      <div className="mt-10 flex">
        <Link to="/blog" className="button-secondary">
          Otwórz pełną sekcję bloga
        </Link>
      </div>
    </section>
  );
}

export function BlogArchiveSection() {
  return (
    <section className="section-shell pt-36">
      <SectionIntro
        eyebrow="Blog"
        title="Pełna sekcja bloga Domków na Zrąbku."
        description="Artykuły o Zębie, Gubałówce, spokojnym wypoczynku i lokalnym rytmie Podhala. Każdy wpis ma własną podstronę i prowadzi dalej do powiązanych tematów."
      />
      <div className="mt-8 flex flex-wrap gap-4">
        <Link to="/" className="button-primary">
          Wróć na stronę główną
        </Link>
        <Link to="/galeria" className="button-secondary">
          Zobacz galerię
        </Link>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {blogArticles.map((article, index) => (
          <Reveal key={article.slug} delayClassName={`delay-${(index % 3) + 1}`}>
            <BlogCard article={article} actionLabel="Przejdź do artykułu" actionHref={`/blog/${article.slug}`} emphasized />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function BlogArticleSection({ article }: { article: BlogArticle }) {
  const relatedArticles = getRelatedBlogArticles(article);

  return (
    <section className="section-shell pt-36">
      <div className="flex flex-wrap gap-4">
        <Link to="/blog" className="button-secondary">
          Wróć do bloga
        </Link>
        <Link to="/galeria" className="button-secondary">
          Zobacz galerię
        </Link>
        <Link to="/#kontakt" className="button-primary">
          Rezerwacja online
        </Link>
      </div>

      <Reveal as="article" className="ambient-card mt-10 p-6 sm:p-8 lg:p-10">
        <div className="max-w-5xl">
          <p className="section-kicker">{article.category}</p>
          <h1 className="mt-5 font-display text-4xl leading-[1.02] text-[var(--color-deep)] sm:text-5xl lg:text-6xl">{article.title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)]">{article.excerpt}</p>
          <div className="mt-8">
            <BlogMeta article={article} />
          </div>
        </div>

        <div className="mt-12 grid gap-10">
          {article.sections.map((section) => (
            <section key={section.heading} className="max-w-4xl">
              <h2 className="font-display text-3xl text-[var(--color-deep)] sm:text-4xl">{section.heading}</h2>
              <div className="mt-5 grid gap-5">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-[15px] leading-8 text-[var(--color-muted)] sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Reveal>

      <Reveal className="surface-panel mt-10 p-6 sm:p-8">
        <p className="section-kicker">Podobne artykuły</p>
        <h2 className="mt-4 font-display text-4xl text-[var(--color-deep)]">Czytaj dalej w podobnym rytmie.</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-muted)]">
          Zamiast technicznych linków na końcu wpisu, tutaj znajdziesz kolejne teksty, które naturalnie rozwijają temat pobytu, spacerów i lokalnego rytmu Podhala.
        </p>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {relatedArticles.map((relatedArticle) => (
            <BlogCard
              key={relatedArticle.slug}
              article={relatedArticle}
              actionLabel="Przejdź do artykułu"
              actionHref={`/blog/${relatedArticle.slug}`}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export function BlogNotFoundSection() {
  return (
    <section className="section-shell pt-36">
      <div className="surface-panel p-8 sm:p-10">
        <p className="section-kicker">Blog</p>
        <h1 className="mt-4 font-display text-4xl text-[var(--color-deep)] sm:text-5xl">Nie znaleziono takiego artykułu.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
          Ten adres nie prowadzi do aktualnego wpisu. Wróć do archiwum bloga i wybierz jeden z dostępnych artykułów.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/blog" className="button-primary">
            Wróć do bloga
          </Link>
          <Link to="/" className="button-secondary">
            Strona główna
          </Link>
        </div>
      </div>
    </section>
  );
}
