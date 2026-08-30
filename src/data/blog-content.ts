import frontMatter from "front-matter";

export type BlogArticle = {
  title: string;
  description: string;
  date: string;
  slug: string;
  content: string;
};

// Use Vite's import.meta.glob to load all markdown files eagerly
// The ?raw query tells Vite to return the raw string content
const rawMarkdownFiles = import.meta.glob("/src/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const blogArticles: BlogArticle[] = Object.values(rawMarkdownFiles).map((fileContent) => {
  const parsed = frontMatter<Omit<BlogArticle, "content">>(fileContent as string);
  return {
    title: parsed.attributes.title,
    description: parsed.attributes.description,
    date: parsed.attributes.date,
    slug: parsed.attributes.slug,
    content: parsed.body,
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const featuredBlogArticles = blogArticles.slice(0, 3);

export function getBlogArticleBySlug(slug?: string) {
  return blogArticles.find((article) => article.slug === slug);
}

export function getRelatedBlogArticles(article: BlogArticle, limit = 3) {
  // Dla uproszczenia po prostu zwracamy losowe/następne artykuły oprócz obecnego
  return blogArticles
    .filter((candidate) => candidate.slug !== article.slug)
    .slice(0, limit);
}
