import { Phone } from "lucide-react";
import { Reveal, SectionIntro } from "@/components/SectionAtoms";
import { baliaInfo, baliaPhotos, contactDetails, googleMapsEmbed, locationBadges } from "@/data/site-content";

export function BaliaSection() {
  return (
    <section id="balia" className="section-shell">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal as="figure" className="order-2 grid gap-4 sm:grid-cols-2 lg:order-1">
          {baliaPhotos.map((photo) => (
            <div
              key={photo.src}
              className="ambient-card overflow-hidden p-3"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-[220px] w-full rounded-[2rem] object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </Reveal>
        <div className="order-1 lg:order-2">
          <SectionIntro
            eyebrow="Balia ogrodowa"
            title={baliaInfo.title}
            description={baliaInfo.description}
          />
          <Reveal
            delayClassName="delay-1"
            className="mt-8 rounded-[2rem] border border-[rgba(137,107,65,0.2)] bg-[linear-gradient(135deg,rgba(255,248,235,0.9),rgba(255,251,247,0.96))] p-6"
          >
            <p className="text-sm leading-8 text-[var(--color-deep)]">
              {baliaInfo.note}
            </p>
          </Reveal>
          <Reveal delayClassName="delay-2" className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a href={contactDetails.phoneHref} className="button-primary">
              <Phone size={16} strokeWidth={1.6} />
              <span>Zapytaj o balię przy rezerwacji</span>
            </a>
            <a href="#kontakt" className="button-secondary">
              Przejdź do kontaktu
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function LocationSection() {
  return (
    <section id="lokalizacja" className="section-shell">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="overflow-hidden rounded-[2.5rem] border border-[rgba(137,107,65,0.18)] bg-[var(--color-surface)] p-3">
          <iframe
            title="Mapa Google - Domki na Zrąbku Pod Gubałówką"
            src={googleMapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[460px] w-full rounded-[2rem] border-0 grayscale-[0.2] saturate-[0.9]"
          />
        </Reveal>
        <div className="flex flex-col justify-center">
          <SectionIntro
            eyebrow="Lokalizacja"
            title="Widokowy adres, który zostawia przestrzeń na oddech."
            description="Nowe Bystre i okolice Gubałówki pozwalają zacząć dzień od ciszy, a skończyć go w miejscu, które nadal jest blisko górskich planów na jutro."
          />
          <div className="mt-10 flex flex-wrap gap-3">
            {locationBadges.map((badge, index) => (
              <Reveal
                key={badge}
                className="rounded-full border border-[rgba(137,107,65,0.18)] bg-[rgba(255,250,245,0.9)] px-5 py-3 text-xs uppercase tracking-[0.22em] text-[var(--color-deep)]"
                delayClassName={`delay-${(index % 3) + 1}`}
              >
                {badge}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
