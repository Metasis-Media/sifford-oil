import type { Metadata } from "next";
import Link from "next/link";
import { Flame, Fuel, House, MapPin, Navigation, Phone, Wrench } from "lucide-react";
import { OpenStatus } from "@/components/hours";
import { RoadSign } from "@/components/road-sign";
import { FuelBoard, Reviews, StationPhoto, VisitSection } from "@/components/sections";
import { btn, Container, SectionHeading, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({ description: site.description, path: "/" });

const services = [
  {
    icon: Fuel,
    title: "Fuel",
    body: "Marathon regular, mid-grade, premium and diesel, plus ethanol-free premium for boats and small engines. Tap to pay at the pump any hour.",
    href: "/fuel",
    link: "See fuel grades",
  },
  {
    icon: Wrench,
    title: "Auto service",
    body: "Oil changes, NC state inspections, tires, alignments, engine and transmission work in our NAPA AutoCare service center.",
    href: "/auto-service",
    link: "Book a service visit",
  },
  {
    icon: Flame,
    title: "Propane",
    body: "Grill and camper tank refills at the station, plus delivery and tank setup for homes. Licensed Class A LP-gas dealer.",
    href: "/propane",
    link: "Propane refills and delivery",
  },
  {
    icon: House,
    title: "Heating oil",
    body: "Home heating oil delivered from our own trucks. Order before the tank runs low and we’ll put you on the route.",
    href: "/heating-oil",
    link: "Order heating oil",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky via-sky/60 to-white">
        <Container className="grid items-end gap-12 pt-14 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:pt-24">
          <div className="pb-4 lg:pb-28">
            <h1 className="font-display text-[3.4rem] leading-[0.92] font-semibold tracking-tight text-balance sm:text-7xl xl:text-[5.5rem]">
              Fuel, repairs and propane on Highway 152.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-asphalt sm:text-xl">
              Sifford Oil Company has been family owned and run in Rockwell, NC since {site.founded}. Fill up at any
              hour, bring your car to our service center, and get propane or heating oil delivered to your home.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={site.phoneHref} className={btn.primary}>
                <Phone className="size-4" aria-hidden />
                Call {site.phone}
              </a>
              <a href={site.links.directions} className={btn.secondary} rel="noopener" target="_blank">
                <Navigation className="size-4" aria-hidden />
                Get directions
              </a>
            </div>
          </div>
          <RoadSign className="mx-auto w-full max-w-[25rem] lg:mr-0" />
        </Container>
      </section>

      {/* Canopy band, after the blue fascia over the pumps */}
      <div className="on-dark border-t-[6px] border-white bg-canopy text-white">
        <Container className="flex flex-col gap-3 py-4 font-medium sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10">
          <span className="inline-flex items-center gap-2">
            <Fuel className="size-4 opacity-80" aria-hidden />
            Pumps open 24 hours
          </span>
          <OpenStatus />
          <a
            href={site.links.directions}
            className="inline-flex items-center gap-2 hover:underline sm:ml-auto"
            rel="noopener"
            target="_blank"
          >
            <MapPin className="size-4 opacity-80" aria-hidden />
            {site.address.street}, {site.address.city}
          </a>
        </Container>
      </div>

      {/* Services */}
      <section className="py-20 sm:py-28" aria-labelledby="services-heading">
        <Container className="grid gap-14 lg:grid-cols-[0.8fr_2fr] lg:gap-16">
          <div>
            <SectionHeading className="lg:sticky lg:top-28">
              <span id="services-heading">What your car, truck and house run on</span>
            </SectionHeading>
          </div>
          <ul className="grid gap-x-12 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.title} className="border-t-2 border-ink py-8">
                <s.icon className="size-7 text-canopy" aria-hidden strokeWidth={1.75} />
                <h3 className="mt-5 font-display text-3xl font-semibold">{s.title}</h3>
                <p className="mt-3 max-w-sm leading-relaxed text-asphalt">{s.body}</p>
                <TextLink href={s.href} className="mt-5 inline-block">
                  {s.link}
                </TextLink>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* At the pumps */}
      <section className="on-dark bg-ink py-20 text-white sm:py-28" aria-labelledby="pumps-heading">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading>
              <span id="pumps-heading">At the pumps</span>
            </SectionHeading>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/75">
              Marathon fuel, open around the clock. Pay right at the pump with Apple Pay, Google Pay or a chip card.
              Inside there’s a convenience store and restrooms, and the air pump is out front.
            </p>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/75">
              We also carry ethanol-free premium, which not every station has. It keeps boat motors, mowers,
              chainsaws and older engines from gumming up.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/fuel" className={btn.onDark}>
                Fuel grades and amenities
              </Link>
              <a href={site.links.gasbuddy} className={btn.ghostOnDark} rel="noopener" target="_blank">
                Today’s prices on GasBuddy
              </a>
            </div>
          </div>
          <FuelBoard />
        </Container>
      </section>

      {/* Heritage */}
      <section className="py-20 sm:py-28" aria-labelledby="family-heading">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <StationPhoto />
          <div>
            <SectionHeading>
              <span id="family-heading">Family owned since {site.founded}</span>
            </SectionHeading>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-asphalt">
              {site.founder} started Sifford Oil Company in {site.founded} after serving in the United States Air
              Force. Seven decades later it’s still owned and run by the Sifford family.
            </p>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-asphalt">
              Neighbors come in for a fill-up, a state inspection, a propane refill or a load of heating oil, and they
              talk to the people who own the place.
            </p>
            <TextLink href="/about" className="mt-7 inline-block text-lg">
              Read our story
            </TextLink>
          </div>
        </Container>
      </section>

      <Reviews />
      <VisitSection />
    </>
  );
}
