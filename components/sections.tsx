import Image from "next/image";
import { Navigation, Phone, Quote } from "lucide-react";
import { fuelGrades, reviews, site } from "@/lib/site";
import { HoursTable } from "./hours";
import { btn, Container, SectionHeading } from "./ui";

const chipClass = {
  blue: "bg-canopy text-white",
  green: "bg-diesel text-white",
  white: "bg-white text-ink",
} as const;

// Styled after the LED cabinet on the roadside sign: grade chips on the left, detail on the right.
export function FuelBoard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-xl bg-white p-3 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] ${className}`}>
      <ul className="divide-y divide-white/5 rounded-md bg-[#0a1428] shadow-[inset_0_2px_10px_rgb(0_0_0/0.6)]">
        {fuelGrades.map((g) => (
          <li key={g.code} className="flex items-center gap-4 px-4 py-4 sm:px-5">
            <span
              className={`flex h-10 w-16 shrink-0 items-center justify-center rounded-sm font-display text-lg font-bold tracking-wider ${chipClass[g.chip]}`}
              aria-hidden
            >
              {g.code}
            </span>
            <div className="min-w-0">
              <p className="font-display text-2xl leading-tight font-semibold text-white">{g.name}</p>
              <p className="text-white/65">{g.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Reviews() {
  return (
    <section className="bg-sky py-20 sm:py-28" aria-labelledby="reviews-heading">
      <Container>
        <SectionHeading className="max-w-xl">
          <span id="reviews-heading">What customers say</span>
        </SectionHeading>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {reviews.map((r) => (
            <figure key={r.quote} className="flex flex-col">
              <Quote className="size-7 text-canopy" aria-hidden />
              <blockquote className="mt-4 flex-1 text-xl leading-relaxed text-ink">
                <p>“{r.quote}”</p>
              </blockquote>
              <figcaption className="mt-5 text-asphalt">
                <span className="font-semibold text-ink">{r.author}</span>, on {r.source}
              </figcaption>
            </figure>
          ))}
        </div>
        <ul className="mt-16 flex flex-col gap-3 border-t border-sky-2 pt-8 text-asphalt sm:flex-row sm:flex-wrap sm:gap-x-10">
          <li>
            <span className="font-semibold text-ink">Nextdoor Neighborhood Favorite</span> in 2023 and 2024
          </li>
          <li>
            <span className="font-semibold text-ink">4.4 stars</span> from 195 GasBuddy reviews
          </li>
          <li>
            <span className="font-semibold text-ink">A+ rating</span> with the Better Business Bureau
          </li>
        </ul>
      </Container>
    </section>
  );
}

export function VisitSection() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="visit-heading">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading>
            <span id="visit-heading">Stop by the station</span>
          </SectionHeading>
          <address className="mt-6 text-xl leading-relaxed not-italic">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </address>
          <p className="mt-2 text-asphalt">The pumps are open 24 hours. The shop and store keep the hours below.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={site.links.directions} className={btn.primary} rel="noopener" target="_blank">
              <Navigation className="size-4" aria-hidden />
              Get directions
            </a>
            <a href={site.phoneHref} className={btn.secondary}>
              <Phone className="size-4" aria-hidden />
              {site.phone}
            </a>
          </div>
          <HoursTable className="mt-10 max-w-md text-lg" />
        </div>
        <div className="overflow-hidden rounded-xl ring-1 ring-line">
          <iframe
            title="Map showing Sifford Oil Company on Hwy 152 East in Rockwell, NC"
            src={site.links.mapEmbed}
            className="h-[380px] w-full sm:h-full sm:min-h-[520px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Container>
    </section>
  );
}

export function CallBand({ heading, body }: { heading: string; body: string }) {
  return (
    <section className="on-dark bg-canopy text-white">
      <Container className="flex flex-col gap-6 py-14 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl leading-none font-semibold sm:text-5xl">{heading}</h2>
          <p className="mt-3 text-lg text-white/80">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={site.phoneHref} className={btn.onDark}>
            <Phone className="size-4" aria-hidden />
            Call {site.phone}
          </a>
          <a href={site.links.directions} className={btn.ghostOnDark} rel="noopener" target="_blank">
            <Navigation className="size-4" aria-hidden />
            Get directions
          </a>
        </div>
      </Container>
    </section>
  );
}

export function StationPhoto({ className = "", preload = false }: { className?: string; preload?: boolean }) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-xl ring-1 ring-line">
        <Image
          src="/images/station.jpg"
          alt="The Sifford Oil Co. sign, blue-and-white canopy and three-bay service center on Hwy 152 East, with an American flag out front"
          width={720}
          height={720}
          preload={preload}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="aspect-[4/3] w-full object-cover object-[center_45%]"
        />
      </div>
      <figcaption className="mt-3 text-sm text-asphalt">The station on Hwy 152 East in Rockwell.</figcaption>
    </figure>
  );
}
