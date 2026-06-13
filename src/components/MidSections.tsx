import { Reveal, SectionIntro } from "@/components/SectionAtoms";
import { googleMapsEmbed, locationBadges } from "@/data/site-content";

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
