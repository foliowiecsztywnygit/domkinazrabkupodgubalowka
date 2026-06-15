import { useState } from "react";
import { ChevronDown, Phone, Quote, Star } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Reveal, SectionIntro } from "@/components/SectionAtoms";
import { cn } from "@/lib/utils";
import { bookingWidgetUrl, contactDetails, faqItems, hotresIntegrationEnabled, navItems, reviews, socialItems } from "@/data/site-content";

export function ReviewsSection() {
  return (
    <section className="section-shell">
      <SectionIntro
        eyebrow="Opinie"
        title={`${contactDetails.rating} na podstawie ${contactDetails.reviewCount} opinii`}
        description="Kilka krótkich słów, które potwierdzają to, co najważniejsze: czystość, spokój, jakość pobytu i przyjemność z samego przebywania w tym miejscu."
      />
      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <Reveal key={review.author} className="ambient-card p-7" delayClassName={`delay-${(index % 3) + 1}`}>
            <Quote className="text-[var(--color-accent-dark)]" strokeWidth={1.5} />
            <div className="mt-8 flex gap-1 text-[var(--color-accent-dark)]">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star key={starIndex} size={15} fill="currentColor" />
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-[var(--color-muted)]">{review.quote}</p>
            <p className="mt-8 font-semibold uppercase tracking-[0.22em] text-[var(--color-deep)]">{review.author}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-shell">
      <SectionIntro
        eyebrow="FAQ"
        title="Lokalne pytania, konkretne odpowiedzi."
        description="Zebraliśmy pytania, które najczęściej pojawiają się przed przyjazdem do Zębu, Nowego Bystrego i okolic Gubałówki."
      />
      <div className="mt-12 divide-y divide-[rgba(137,107,65,0.16)] rounded-[2.2rem] border border-[rgba(137,107,65,0.16)] bg-[rgba(255,250,245,0.8)] px-6 sm:px-8">
        {faqItems.map((item, index) => {
          const open = openIndex === index;

          return (
            <Reveal key={item.question} className="py-2" delayClassName={`delay-${(index % 3) + 1}`}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-6 text-left"
                onClick={() => setOpenIndex(open ? -1 : index)}
                aria-expanded={open}
              >
                <span className="font-display text-2xl text-[var(--color-deep)]">{item.question}</span>
                <span className={cn("rounded-full border border-[rgba(137,107,65,0.16)] p-3 transition duration-300", open && "rotate-180 bg-[var(--color-accent)]/20")}>
                  <ChevronDown size={18} />
                </span>
              </button>
              <div className={cn("grid transition-all duration-500", open ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]")}>
                <div className="overflow-hidden">
                  <p className="max-w-3xl text-sm leading-7 text-[var(--color-muted)]">{item.answer}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    arrival: "",
    departure: "",
    guests: "2",
    message: "",
  });
  const smsNumber = contactDetails.phoneHref.replace("tel:", "");
  const smsBody = [
    "Dzien dobry, prosze o informacje o dostepnosci domku.",
    `Imie: ${formData.name || "-"}`,
    `Telefon: ${formData.phone || "-"}`,
    `Termin od: ${formData.arrival || "-"}`,
    `Termin do: ${formData.departure || "-"}`,
    `Liczba gosci: ${formData.guests || "-"}`,
    `Dodatkowe informacje: ${formData.message || "-"}`,
  ].join("\n");
  const smsHref = `sms:${smsNumber}?body=${encodeURIComponent(smsBody)}`;

  if (hotresIntegrationEnabled) {
    return (
      <section id="kontakt" className="section-shell">
        <div className="dark-panel grid gap-8 overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-14">
          <div className="flex flex-col justify-between gap-8">
            <SectionIntro
              eyebrow="Rezerwacja online i kontakt"
              title="Sprawdź termin i zarezerwuj bezpośrednio."
              description="Tutaj możesz od razu sprawdzić termin, przejść do rezerwacji albo skontaktować się z nami telefonicznie."
              dark
            />
            <Reveal delayClassName="delay-1" className="grid gap-4 text-[var(--color-cream)]">
              <a href={contactDetails.phoneHref} className="contact-chip">
                <Phone size={18} strokeWidth={1.6} />
                <span>{contactDetails.phone}</span>
              </a>
              <a href={bookingWidgetUrl} target="_blank" rel="noreferrer" className="contact-chip">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-xs font-semibold uppercase tracking-[0.2em]">24/7</span>
                <span>Przejdź do rezerwacji online</span>
              </a>
            </Reveal>
          </div>
          <Reveal delayClassName="delay-2" className="rounded-[2.2rem] border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm sm:p-4">
            <div className="booking-widget-shell">
              <iframe title="Widżet rezerwacji online" src={bookingWidgetUrl} className="booking-widget-frame" loading="lazy" />
            </div>
            <div className="mt-4 flex flex-col gap-3 px-2 pb-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[rgba(255,243,226,0.68)]">Jeśli wolisz, możesz też otworzyć rezerwację w osobnej karcie.</p>
              <a href={bookingWidgetUrl} target="_blank" rel="noreferrer" className="button-primary justify-center">
                Otwórz rezerwację
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="kontakt" className="section-shell">
      <div className="dark-panel grid gap-8 overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-14">
        <div className="flex flex-col justify-between gap-8">
          <SectionIntro
            eyebrow="Zapytanie i kontakt"
            title="Zapytaj o termin, a wrócimy z odpowiedzią."
            description="Zamiast kierować do rezerwacji online, zbieramy teraz krótkie zapytania. Uzupełnij formularz lub zadzwoń bezpośrednio."
            dark
          />
          <Reveal delayClassName="delay-1" className="grid gap-4 text-[var(--color-cream)]">
            <a href={contactDetails.phoneHref} className="contact-chip">
              <Phone size={18} strokeWidth={1.6} />
              <span>{contactDetails.phone}</span>
            </a>
            <a href={smsHref} className="contact-chip">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-xs font-semibold uppercase tracking-[0.2em]">SMS</span>
              <span>Wyślij szybkie zapytanie</span>
            </a>
            <p className="max-w-md text-sm leading-7 text-[rgba(255,243,226,0.68)]">
              Hotres pozostaje w kodzie, ale na ten moment formularz i kontakt bezpośredni są główną ścieżką pozyskiwania zapytań.
            </p>
          </Reveal>
        </div>
        <Reveal delayClassName="delay-2" className="rounded-[2.2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:p-6">
          <form className="grid gap-4" aria-label="Formularz zapytania o pobyt">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-[var(--color-cream)]">
                <span>Imię</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                  className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-[var(--color-cream)] outline-none transition placeholder:text-[rgba(255,243,226,0.36)] focus:border-[var(--color-accent)]"
                  placeholder="Jak mamy się do Ciebie zwracać?"
                />
              </label>
              <label className="grid gap-2 text-sm text-[var(--color-cream)]">
                <span>Telefon</span>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
                  className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-[var(--color-cream)] outline-none transition placeholder:text-[rgba(255,243,226,0.36)] focus:border-[var(--color-accent)]"
                  placeholder="Numer do kontaktu"
                />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="grid gap-2 text-sm text-[var(--color-cream)]">
                <span>Przyjazd</span>
                <input
                  type="date"
                  value={formData.arrival}
                  onChange={(event) => setFormData((current) => ({ ...current, arrival: event.target.value }))}
                  className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-[var(--color-cream)] outline-none transition focus:border-[var(--color-accent)]"
                />
              </label>
              <label className="grid gap-2 text-sm text-[var(--color-cream)]">
                <span>Wyjazd</span>
                <input
                  type="date"
                  value={formData.departure}
                  onChange={(event) => setFormData((current) => ({ ...current, departure: event.target.value }))}
                  className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-[var(--color-cream)] outline-none transition focus:border-[var(--color-accent)]"
                />
              </label>
              <label className="grid gap-2 text-sm text-[var(--color-cream)]">
                <span>Liczba gości</span>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={formData.guests}
                  onChange={(event) => setFormData((current) => ({ ...current, guests: event.target.value }))}
                  className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-[var(--color-cream)] outline-none transition focus:border-[var(--color-accent)]"
                />
              </label>
            </div>
            <label className="grid gap-2 text-sm text-[var(--color-cream)]">
              <span>Dodatkowe informacje</span>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-[var(--color-cream)] outline-none transition placeholder:text-[rgba(255,243,226,0.36)] focus:border-[var(--color-accent)]"
                placeholder="Np. domek dla rodziny, pobyt z dzieckiem, pytanie o parking lub zwierzęta."
              />
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-7 text-[rgba(255,243,226,0.68)]">
                CTA przygotowuje gotową treść zapytania SMS na numer kontaktowy. Dla szybszej odpowiedzi możesz też od razu zadzwonić.
              </p>
              <div className="flex flex-col gap-3 sm:min-w-[260px]">
                <a href={smsHref} className="button-primary justify-center">
                  Wyślij zapytanie
                </a>
                <a href={contactDetails.phoneHref} className="button-secondary justify-center border-white/15 text-[var(--color-cream)] hover:bg-white/10">
                  Zadzwoń teraz
                </a>
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function MobileStickyReservationBar() {
  return (
    <div className="mobile-sticky-cta md:hidden">
      <div className="mobile-sticky-cta__inner">
        <a href={contactDetails.phoneHref} className="mobile-sticky-cta__phone">
          {contactDetails.phone}
        </a>
        {hotresIntegrationEnabled ? (
          <a href={bookingWidgetUrl} target="_blank" rel="noreferrer" className="mobile-sticky-cta__button">
            Rezerwuj online
          </a>
        ) : (
          <a href="#kontakt" className="mobile-sticky-cta__button">
            Zapytaj o termin
          </a>
        )}
      </div>
    </div>
  );
}

export function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const resolveSectionHref = (href: string) => (isHomePage ? href : `/${href}`);

  return (
    <footer className="bg-[var(--color-deep)] px-4 pb-10 text-[var(--color-cream)]">
      <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.02)] px-6 py-8 sm:px-8 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">
        <div>
          <p className="font-display text-3xl">Domki na Zrąbku Pod Gubałówką</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-[rgba(255,243,226,0.72)]">{contactDetails.address}</p>
          <a href={contactDetails.phoneHref} className="mt-4 inline-block text-sm uppercase tracking-[0.22em] text-[var(--color-accent)]">
            {contactDetails.phone}
          </a>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[rgba(255,243,226,0.54)]">Szybkie linki</p>
          <div className="mt-5 grid gap-3">
            {navItems.map((item) => (
              <a key={item.href} href={resolveSectionHref(item.href)} className="text-sm text-[rgba(255,243,226,0.82)] transition hover:text-white">
                {item.label}
              </a>
            ))}
            <Link to="/galeria" className="text-sm text-[rgba(255,243,226,0.82)] transition hover:text-white">
              Pełna galeria
            </Link>
            <Link to="/blog" className="text-sm text-[rgba(255,243,226,0.82)] transition hover:text-white">
              Blog
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[rgba(255,243,226,0.54)]">Lokalizacja</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {socialItems.map((item) => (
              <a key={item.label} href={item.href} className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-[rgba(255,243,226,0.82)] transition hover:border-[var(--color-accent)] hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
