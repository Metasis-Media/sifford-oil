import type { Metadata } from "next";
import { FourteenSeg, powerOnEnd, SevenSeg } from "@/components/seven-seg";
import { CallBand, Reviews, StationPhoto } from "@/components/sections";
import { Container, FacebookIcon, PageHeader, SectionHeading, TextLink } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Our Story",
  description:
    "Sifford Oil Company was founded in 1955 by Air Force veteran Max Sifford and is still owned and run by the Sifford family in Rockwell, NC.",
  path: "/about",
});

const today = [
  { title: "The station", body: "Marathon fuel and ethanol-free premium, 24-hour pumps, and a convenience store." },
  { title: "The service center", body: "A NAPA AutoCare Center handling inspections, tires, alignments and repairs." },
  { title: "Propane", body: `A licensed Class A LP-gas dealer (NC #${site.propaneLicense}) for refills, delivery and tank setup.` },
  { title: "Delivery", body: "Our own trucks deliver heating oil and fuel to customers in the area." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("About", "/about")} />
      <PageHeader
        title="A family business on Highway 152 since 1955"
        intro="Sifford Oil Company has served Rockwell and the surrounding area for seven decades, and it’s still owned and run by the family that started it."
      />

      <section className="py-20 sm:py-28" aria-labelledby="story-heading">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <figure className="max-w-md">
            <div className="rounded-xl bg-white p-3 shadow-[0_30px_60px_-30px_rgb(15_29_56/0.55)] ring-1 ring-ink/10">
              <div
                role="img"
                aria-label="Since 1955"
                className="rounded-md bg-[#0a1428] px-7 pt-7 pb-5 shadow-[inset_0_2px_10px_rgb(0_0_0/0.6)]"
              >
                <SevenSeg text="1955" className="h-auto w-full" powerOn delay={0.2} />
                {/* Pops up and blinks once the year has finished lighting. */}
                <div
                  className="mt-4 flex justify-end motion-safe:animate-led-flash"
                  style={{ animationDelay: `${powerOnEnd("1955", 0.2) + 0.15}s` }}
                >
                  <FourteenSeg text="SINCE" className="h-9 w-auto sm:h-11" />
                </div>
              </div>
            </div>
            <figcaption className="mt-4 text-asphalt">The year Max Sifford opened for business.</figcaption>
          </figure>
          <div>
            <SectionHeading>
              <span id="story-heading">How it started</span>
            </SectionHeading>
            <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-asphalt">
              <p>
                {site.founder} founded Sifford Oil Company in {site.founded}, after serving in the United States Air
                Force.
              </p>
              <p>
                Seventy years on, the business is still in the family, with {site.owner} at the helm. The brand on the
                canopy has changed over the years. The way we treat customers hasn’t.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-sky py-20 sm:py-28" aria-labelledby="today-heading">
        <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading>
              <span id="today-heading">What we do today</span>
            </SectionHeading>
            <dl className="mt-8 space-y-6">
              {today.map((t) => (
                <div key={t.title} className="border-t border-sky-2 pt-5">
                  <dt className="font-display text-2xl font-semibold">{t.title}</dt>
                  <dd className="mt-1 text-lg leading-relaxed text-asphalt">{t.body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <StationPhoto />
        </Container>
      </section>

      <section className="py-20 sm:py-28" aria-labelledby="veterans-heading">
        <Container className="max-w-[46rem]">
          <SectionHeading>
            <span id="veterans-heading">For the veterans</span>
          </SectionHeading>
          <p className="mt-6 text-lg leading-relaxed text-asphalt">
            Our founder served in the Air Force, and we haven’t forgotten it. On Veterans Day we’ve offered $11 off all
            services for veterans in his honor. Follow us on Facebook to catch this year’s details.
          </p>
          <a
            href={site.links.facebook}
            className="mt-6 inline-flex items-center gap-2 font-semibold text-canopy hover:underline"
            rel="noopener"
            target="_blank"
          >
            <FacebookIcon />
            Sifford Oil Company on Facebook
          </a>
          <p className="mt-10 text-lg text-asphalt">
            Want to talk to us? <TextLink href="/contact">Get in touch</TextLink> or stop by the station.
          </p>
        </Container>
      </section>

      <Reviews />
      <CallBand heading="Come see us" body={`${site.address.street}, ${site.address.city}. Pumps open 24 hours.`} />
    </>
  );
}
