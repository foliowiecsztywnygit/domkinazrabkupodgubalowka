import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, CarFront, ChevronLeft, ChevronRight, MapPinned, Menu, MessageSquare, Phone, Sparkles, Trees, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Reveal, SectionIntro } from "@/components/SectionAtoms";
import { useParallaxOffset } from "@/hooks/useParallaxOffset";
import { cn } from "@/lib/utils";
import { aboutPhoto, bookingWidgetUrl, contactDetails, galleryPhotos, heroBookingWidgetUrl, heroSlides, homeGalleryPhotos, hotresIntegrationEnabled, navItems, valueProps } from "@/data/site-content";

const valueIcons = {
  map: MapPinned,
  pine: Trees,
  sparkles: Sparkles,
  car: CarFront,
};

const brandLogo = "/logo.png";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const resolveSectionHref = (href: string) => (isHomePage ? href : `/${href}`);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="navbar-shell">
        <Link to="/" className="flex min-w-0 items-center">
          <span className="logo-badge">
            <img src={brandLogo} alt="Logo Domki na Zrąbku Pod Gubałówką" className="logo-image h-10 w-auto object-contain sm:h-12" />
          </span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={resolveSectionHref(item.href)} className="nav-link">
              {item.label}
            </a>
          ))}
          <Link to="/blog" className="nav-link">
            Blog
          </Link>
          <Link to="/galeria" className="nav-link">
            Pełna galeria
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {hotresIntegrationEnabled ? (
            <a href={bookingWidgetUrl} target="_blank" rel="noreferrer" className="button-primary hidden sm:inline-flex">
              REZERWACJA
            </a>
          ) : (
            <a href="#kontakt" className="button-primary hidden sm:inline-flex">
              ZAPYTAJ O TERMIN
            </a>
          )}
          <button
            type="button"
            className="inline-flex rounded-full border border-[rgba(214,178,117,0.28)] bg-[rgba(255,255,255,0.03)] p-3 text-[var(--color-cream)] lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Otwórz menu"
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="mx-auto mt-3 max-w-6xl rounded-[2rem] border border-[rgba(214,178,117,0.22)] bg-[rgba(20,12,9,0.94)] p-4 shadow-[var(--shadow-glass)] backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={resolveSectionHref(item.href)}
                className="rounded-2xl px-4 py-3 text-sm text-[var(--color-cream)] transition hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link to="/blog" className="rounded-2xl px-4 py-3 text-sm text-[var(--color-cream)] transition hover:bg-white/10" onClick={() => setOpen(false)}>
              Blog
            </Link>
            <Link to="/galeria" className="rounded-2xl px-4 py-3 text-sm text-[var(--color-cream)] transition hover:bg-white/10" onClick={() => setOpen(false)}>
              Pełna galeria
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const parallaxOffset = useParallaxOffset(0.14);
  const imageStyle = useMemo(
    () => ({ transform: `translateY(${Math.min(parallaxOffset, 72)}px) scale(1.08)` }),
    [parallaxOffset],
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4800);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden px-4 pb-12 pt-28">
      <div className="hero-shell">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={cn("hero-image", index === activeSlide ? "is-active" : "is-hidden")}
            style={imageStyle}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,5,4,0.22)_0%,rgba(12,7,6,0.64)_46%,rgba(12,7,6,0.88)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(173,126,64,0.18),transparent_34%)]" />
        <div className="hero-woodglow absolute inset-x-[8%] bottom-0 top-[18%] rounded-[2.2rem]" />
        <div className="relative z-10 grid min-h-[78vh] items-end gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:gap-10 lg:p-16">
          <div className="max-w-3xl text-[var(--color-cream)]">
            <Reveal>
              <img src={brandLogo} alt="Logo Domki na Zrąbku Pod Gubałówką" className="logo-image h-16 w-auto object-contain sm:h-20 lg:h-24" />
            </Reveal>
            <Reveal as="h1" delayClassName="delay-1" className="mt-7 font-display text-5xl uppercase leading-[0.92] tracking-[0.14em] sm:text-6xl lg:text-8xl">
              Cisza. Światło. Góra.
            </Reveal>
            <Reveal delayClassName="delay-2" className="mt-6 max-w-2xl text-sm leading-7 text-[rgba(255,244,229,0.78)] sm:text-base">
              Dopieszczony pobyt w dobrej lokalizacji. Poranki z widokiem, miękkie światło na drewnie i spokojna baza wypadowa pod Gubałówką.
            </Reveal>
            <Reveal delayClassName="delay-3" className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              {hotresIntegrationEnabled ? (
                <a href={bookingWidgetUrl} target="_blank" rel="noreferrer" className="hero-cta-primary">
                  Rezerwuj online
                </a>
              ) : (
                <a href="#kontakt" className="hero-cta-primary">
                  Zapytaj o termin
                </a>
              )}
              <a href="#galeria" className="button-secondary">
                Zobacz galerię
              </a>
            </Reveal>
            <Reveal delayClassName="delay-3" className="mt-10 flex flex-wrap gap-3 text-xs uppercase tracking-[0.26em] text-[rgba(255,244,229,0.62)]">
              <span>{contactDetails.address}</span>
              <span>{contactDetails.rating}</span>
              <span>{contactDetails.reviewCount} opinii Google</span>
            </Reveal>
            <Reveal delayClassName="delay-3" className="mt-8 flex gap-2">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  className={cn("hero-dot", index === activeSlide && "is-active")}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Pokaż zdjęcie ${index + 1} w hero`}
                />
              ))}
            </Reveal>
          </div>
          {hotresIntegrationEnabled ? <HeroBookingCard /> : <HeroInquiryCard />}
        </div>
      </div>
    </section>
  );
}

function HeroInquiryCard() {
  return (
    <Reveal delayClassName="delay-2" className="hero-widget-card self-end">
      <div className="hero-widget-card__header">
        <div className="hero-widget-card__icon">
          <MessageSquare size={18} strokeWidth={1.7} />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-[rgba(255,239,212,0.78)]">Zapytania</p>
          <p className="mt-2 text-lg text-[var(--color-cream)] sm:text-xl">Wyślij szybkie zapytanie o termin</p>
        </div>
      </div>
      <div className="hero-widget-card__body hero-widget-card__body--inquiry flex flex-col justify-between gap-5 p-5">
        <p className="rounded-[1.5rem] border border-[rgba(221,182,111,0.22)] bg-[rgba(255,248,235,0.06)] px-5 py-4 text-sm leading-7 text-[rgba(255,243,226,0.92)]">
          Zamiast rezerwacji online kierujemy teraz do krótkiego formularza. Zostaw datę, liczbę gości i numer telefonu, a wrócimy z odpowiedzią.
        </p>
        <div className="grid gap-3">
          <a href="#kontakt" className="button-primary justify-center">
            Przejdź do formularza
          </a>
          <a href={contactDetails.phoneHref} className="button-secondary hero-widget-secondary-action justify-center">
            <Phone size={16} strokeWidth={1.6} />
            <span>Zadzwoń: {contactDetails.phone}</span>
          </a>
        </div>
      </div>
    </Reveal>
  );
}

function HeroBookingCard() {
  return (
    <Reveal delayClassName="delay-2" className="hero-widget-card self-end">
      <div className="hero-widget-card__header">
        <div className="hero-widget-card__icon">
          <CalendarDays size={18} strokeWidth={1.7} />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-[rgba(255,239,212,0.54)]">Terminy</p>
          <p className="mt-2 text-lg text-[var(--color-cream)] sm:text-xl">Sprawdź dostępność od razu</p>
        </div>
      </div>
      <div className="hero-widget-card__body">
        <iframe
          title="Widżet terminów w hero"
          src={heroBookingWidgetUrl}
          className="hero-widget-frame"
          loading="lazy"
        />
      </div>
      <a href={bookingWidgetUrl} target="_blank" rel="noreferrer" className="hero-widget-link">
        Otwórz pełną rezerwację
      </a>
    </Reveal>
  );
}

export function ValuePropsSection() {
  return (
    <section className="section-shell" aria-label="Najważniejsze przewagi">
      <SectionIntro
        eyebrow="Dlaczego tutaj"
        title="Górski pobyt, który nie jest przypadkowy."
        description="Każdy element tej strony i całego miejsca ma budować jedno odczucie: spokój premium, bez zbędnego hałasu i bez kompromisu w komforcie."
        align="center"
      />
      <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {valueProps.map((item, index) => {
          const Icon = valueIcons[item.icon];

          return (
            <Reveal key={item.title} className="ambient-card p-7" delayClassName={`delay-${(index % 3) + 1}`}>
              <span className="icon-badge">
                <Icon size={20} strokeWidth={1.6} />
              </span>
              <h3 className="mt-8 font-display text-2xl text-[var(--color-deep)]">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{item.description}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="o-nas" className="section-shell">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal as="figure" className="overflow-hidden rounded-[2.5rem] border border-[rgba(137,107,65,0.18)] bg-[var(--color-surface)] p-3">
          <img
            src={aboutPhoto.src}
            alt={aboutPhoto.alt}
            className="h-[540px] w-full rounded-[2rem] object-cover"
          />
          <figcaption className="px-4 pb-3 pt-5 text-sm leading-7 text-[var(--color-muted)]">{aboutPhoto.note}</figcaption>
        </Reveal>
        <div>
          <SectionIntro
            eyebrow="O obiekcie"
            title="Dopieszczony pobyt w dobrej lokalizacji."
            description="Domki na Zrąbku Pod Gubałówką łączą wygodę spokojnej bazy wypadowej z atmosferą miejsca, do którego chce się wracać nie tylko dla widoku, ale też dla jakości codziennych chwil."
          />
          <Reveal delayClassName="delay-1" className="mt-8 grid gap-6 text-sm leading-8 text-[var(--color-muted)] sm:text-base">
            <p>
              Bliskość natury czuć tutaj od rana. Światło wchodzi miękko przez okna, drewno łapie ciepłe refleksy, a dzień zaczyna się bez pośpiechu i bez miejskiego hałasu.
            </p>
            <p>
              To miejsce zaprojektowane pod rytm odpoczynku: wygodne wnętrza, przemyślane udogodnienia i górski krajobraz, który nie potrzebuje dodatkowych ozdobników.
            </p>
          </Reveal>
          <Reveal delayClassName="delay-2" className="mt-10 flex flex-wrap gap-4">
            <div className="surface-panel min-w-[200px] px-6 py-5">
              <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-muted)]">Adres</p>
              <p className="mt-3 text-lg text-[var(--color-deep)]">{contactDetails.address}</p>
            </div>
            <div className="surface-panel min-w-[200px] px-6 py-5">
              <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-muted)]">Kontakt</p>
              <a href={contactDetails.phoneHref} className="mt-3 block text-lg text-[var(--color-deep)]">
                {contactDetails.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function GallerySection() {
  return (
    <section id="galeria" className="section-shell">
      <SectionIntro
        eyebrow="Galeria"
        title="Wybrane kadry z domków i otoczenia."
        description="Na początek kilka kadrów, które najlepiej oddają klimat miejsca. Więcej zdjęć czeka w pełnej galerii."
      />
      <div className="mt-6 rounded-full border border-[rgba(137,107,65,0.16)] bg-[rgba(255,251,247,0.84)] px-5 py-3 text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">
        {homeGalleryPhotos.length} wybranych zdjęć
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {homeGalleryPhotos.map((photo) => (
          <div key={photo.src} className={cn("ambient-card overflow-hidden p-3")}>
            <img src={photo.src} alt={photo.alt} className="gallery-card-image h-[280px] w-full rounded-[2rem] object-cover" />
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        <Link to="/galeria" className="button-primary">
          Zobacz wszystkie zdjęcia
        </Link>
      </div>
    </section>
  );
}

export function FullGallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="section-shell pt-36">
      <SectionIntro
        eyebrow="Galeria"
        title="Galeria Domków na Zrąbku."
        description="Zdjęcia wnętrz, otoczenia i detali, które najlepiej pokazują charakter tego miejsca."
      />
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <div className="rounded-full border border-[rgba(137,107,65,0.16)] bg-[rgba(255,251,247,0.84)] px-5 py-3 text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">
          {galleryPhotos.length} zdjęć
        </div>
        <Link to="/" className="button-primary">
          Wróć na stronę główną
        </Link>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {galleryPhotos.map((photo, index) => (
          <div key={photo.src} className="ambient-card overflow-hidden p-3">
            <button type="button" className="gallery-card-button" onClick={() => setActiveIndex(index)} aria-label={`Otwórz zdjęcie ${index + 1}`}>
              <img src={photo.src} alt={photo.alt} className="gallery-card-image h-[300px] w-full rounded-[2rem] object-cover" />
            </button>
          </div>
        ))}
      </div>
      <GalleryLightbox photos={galleryPhotos} activeIndex={activeIndex} onClose={() => setActiveIndex(null)} onChange={setActiveIndex} />
    </section>
  );
}

type GalleryLightboxProps = {
  photos: typeof galleryPhotos;
  activeIndex: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

function GalleryLightbox({ photos, activeIndex, onClose, onChange }: GalleryLightboxProps) {
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowRight") {
        onChange((activeIndex + 1) % photos.length);
      }

      if (event.key === "ArrowLeft") {
        onChange((activeIndex - 1 + photos.length) % photos.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, onChange, onClose, photos.length]);

  if (activeIndex === null) {
    return null;
  }

  const photo = photos[activeIndex];

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Podgląd zdjęcia ${photo.title}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="lightbox-shell">
        <button type="button" className="lightbox-close" onClick={onClose} aria-label="Zamknij lightbox">
          <X size={20} />
        </button>
        <div
          className="lightbox-media"
          onTouchStart={(event) => {
            touchStartX.current = event.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const touchEndX = event.changedTouches[0]?.clientX ?? null;

            if (touchStartX.current === null || touchEndX === null) {
              return;
            }

            const deltaX = touchEndX - touchStartX.current;

            if (deltaX > 40) {
              onChange((activeIndex - 1 + photos.length) % photos.length);
            }

            if (deltaX < -40) {
              onChange((activeIndex + 1) % photos.length);
            }

            touchStartX.current = null;
          }}
        >
          <button
            type="button"
            className="lightbox-nav lightbox-nav--prev"
            onClick={() => onChange((activeIndex - 1 + photos.length) % photos.length)}
            aria-label="Poprzednie zdjęcie"
          >
            <ChevronLeft size={22} />
          </button>
          <img src={photo.src} alt={photo.alt} className="lightbox-image" />
          <button
            type="button"
            className="lightbox-nav lightbox-nav--next"
            onClick={() => onChange((activeIndex + 1) % photos.length)}
            aria-label="Następne zdjęcie"
          >
            <ChevronRight size={22} />
          </button>
        </div>
        <div className="lightbox-caption">
          <div>
            <p className="section-kicker">{photo.title}</p>
            <p className="mt-3 text-sm leading-7 text-[rgba(255,243,226,0.78)]">{photo.description}</p>
          </div>
          <p className="text-xs uppercase tracking-[0.24em] text-[rgba(255,243,226,0.52)]">
            {activeIndex + 1} / {photos.length}
          </p>
        </div>
      </div>
    </div>
  );
}
