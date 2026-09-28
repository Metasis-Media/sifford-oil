import type { Metadata } from "next";
import { HoursTable } from "@/components/hours";
import { RequestForm } from "@/components/request-form";
import { CallBand, StationPhoto } from "@/components/sections";
import { btn, Container, PageHeader, SectionHeading } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Auto Service & Repair",
  description:
    "NAPA AutoCare service center in Rockwell, NC: oil changes, NC state inspections, new and used tires, wheel alignments, engine, transmission and clutch repair.",
  path: "/auto-service",
});

const services = [
  {
    title: "Oil changes and maintenance",
    body: "Oil and filter, fluids, belts, hoses, wiper blades and bulbs. The routine work that keeps a vehicle out of the shop.",
  },
  {
    title: "NC state inspections",
    body: "Your annual North Carolina inspection, done here so you can renew your registration.",
  },
  {
    title: "Tires",
    body: "New and used tires, mounted and balanced. Tell us your size and budget when you call.",
  },
  {
    title: "Wheel alignment",
    body: "If the truck pulls to one side or the tires are wearing unevenly, an alignment will set it straight.",
  },
  {
    title: "Engine repair and tune-ups",
    body: "From a check engine light to a rough idle, we find the cause and fix it.",
  },
  {
    title: "Transmission and clutch",
    body: "Slipping, grinding or hard shifting. Transmission service and clutch replacement for cars and trucks.",
  },
];

export default function AutoServicePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Auto service", "/auto-service")} />
      <PageHeader
        title="Auto service and repair"
        intro="Our service center is a NAPA AutoCare Center. That means quality NAPA parts, and repairs backed by the NAPA AutoCare nationwide warranty. Ask us what’s covered."
      >
        <a href="#book" className={btn.primary}>
          Request an appointment
        </a>
        <a href={site.phoneHref} className={btn.secondary}>
          Call {site.phone}
        </a>
      </PageHeader>

      <section className="py-20 sm:py-28" aria-labelledby="services-heading">
        <Container>
          <SectionHeading>
            <span id="services-heading">What we work on</span>
          </SectionHeading>
          <ul className="mt-12 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.title} className="border-t-2 border-ink py-7">
                <h3 className="font-display text-2xl font-semibold sm:text-[1.7rem]">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-asphalt">{s.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-lg text-asphalt">
            Don’t see your problem listed? Call {site.phone} and describe what’s going on.
          </p>
        </Container>
      </section>

      <section className="bg-sky py-20 sm:py-28" aria-labelledby="shop-heading">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <StationPhoto />
          <div>
            <SectionHeading>
              <span id="shop-heading">Three bays behind the pumps</span>
            </SectionHeading>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-asphalt">
              The service center sits right behind the canopy on Hwy 152, so you can fill up and check in for service
              in the same stop.
            </p>
            <HoursTable className="mt-8 max-w-md" />
          </div>
        </Container>
      </section>

      <section id="book" className="scroll-mt-24 py-20 sm:py-28" aria-labelledby="book-heading">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading>
              <span id="book-heading">Request an appointment</span>
            </SectionHeading>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-asphalt">
              Tell us about the vehicle and what it needs. We’ll call you to set a time that works.
            </p>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-asphalt">
              Need it looked at today? Calling is faster:{" "}
              <a href={site.phoneHref} className="font-semibold whitespace-nowrap text-canopy underline underline-offset-4">
                {site.phone}
              </a>
              .
            </p>
          </div>
          <RequestForm topic="service" />
        </Container>
      </section>

      <CallBand heading="Car making a noise?" body="Call and tell us what’s going on, and we’ll get it on the schedule." />
    </>
  );
}
