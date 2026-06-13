import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import Home from "@/pages/Home";
import Gallery from "@/pages/Gallery";
import Blog from "@/pages/Blog";
import BlogArticle from "@/pages/BlogArticle";

afterEach(() => {
  cleanup();
});

describe("Home page", () => {
  it("renders the premium landing content", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /cisza\. światło\. góra\./i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /dopieszczony pobyt w dobrej lokalizacji\./i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /lokalne pytania, konkretne odpowiedzi\./i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /lokalne przewodniki i spokojne inspiracje z podhala\./i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /rezerwuj online/i })[0]).toBeInTheDocument();
    expect(screen.getByTitle(/widżet rezerwacji online/i)).toBeInTheDocument();
    expect(screen.getByTitle(/widżet terminów w hero/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /otwórz pełną galerię/i })).toHaveAttribute("href", "/galeria");
    expect(screen.getByText(/6 wybranych zdjęć/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /otwórz pełną sekcję bloga/i })).toHaveAttribute("href", "/blog");
  });

  it("toggles faq answers and exposes the booking widget", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    await user.click(screen.getAllByRole("button", { name: /czy w obiekcie jest wi-fi\?/i })[0]);
    expect(screen.getAllByText(/szczegóły dotyczące sieci najlepiej potwierdzić przy rezerwacji/i)[0]).toBeVisible();
    expect(screen.getAllByRole("link", { name: /otwórz rezerwację/i })[0]).toHaveAttribute(
      "href",
      expect.stringContaining("roomadmin.pl/widget/reservation-v2/start"),
    );
  });

  it("renders a lightweight curated gallery on the home page", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.queryByRole("button", { name: /rozwiń galerię/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /zwiń galerię/i })).not.toBeInTheDocument();
  });

  it("renders the dedicated gallery page", () => {
    render(
      <MemoryRouter initialEntries={["/galeria"]}>
        <Gallery />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /pełna galeria domków na zrąbku\./i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /wróć na stronę główną/i })).toHaveAttribute("href", "/");
  });

  it("renders the dedicated blog page", () => {
    render(
      <MemoryRouter initialEntries={["/blog"]}>
        <Blog />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /pełna sekcja bloga domków na zrąbku\./i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /przejdź do artykułu/i }).length).toBeGreaterThan(0);
  });

  it("renders a dedicated blog article with related posts", () => {
    render(
      <MemoryRouter initialEntries={["/blog/zab-najwyzej-polozona-wies"]}>
        <Routes>
          <Route path="/blog/:slug" element={<BlogArticle />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1, name: /ząb jako najwyżej położona wieś w polsce/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /czytaj dalej w podobnym rytmie\./i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /przejdź do artykułu/i }).length).toBeGreaterThan(0);
  });
});
