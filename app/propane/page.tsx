import type { Metadata } from "next";
import { Cylinder, House, TriangleAlert, Truck } from "lucide-react";
import { RequestForm } from "@/components/request-form";
import { CallBand } from "@/components/sections";
import { btn, Container, PageHeader, SectionHeading } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Propane Refills, Delivery & Tank Setup",
  description:
    "Propane tank refills, home propane delivery and tank installation in Rockwell, NC. Sifford Oil Company is a licensed Class A LP-gas dealer.",
  path: "/propane",
});

const offerings = [
  {
    icon: Cylinder,
    title: "Tank refills at the station",
    body: "Bring your grill, heater or camper tank by during business hours and we’ll refill it. No appointment needed.",
  },
  {
    icon: Truck,
    title: "Delivery to your home",
    body: "Propane delivered to the tank at your house for heat, hot water, cooking or a generator.",
  },
  {
    icon: House,
    title: "New tank setup",
    body: "Switching to propane or adding a tank? We can install and connect it. Call to talk through what you need.",
  },
];

const safety = [
  "Put out any flames and don’t smoke. Don’t flip light switches, use phones or start vehicles near the smell.",
  "Get everyone out of the building and away from the area.",
  "If it’s safe to reach, turn off the main gas valve on the tank.",
  "From a safe distance, call 911, then call us.",
  "Don’t go back inside until a qualified technician says it’s safe.",
];

export default function PropanePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Propane", "/propane")} />
      <PageHeader
        title="Propane for the grill, the camper and the whole house"
        intro={`Refill a tank at the station or have propane delivered to your home. We’re a licensed Class A LP-gas dealer (North Carolina license #${site.propaneLicense}).`}
      >
        <a href="#request" className={btn.primary}>
          Request propane delivery
        </a>
        <a href={site.phoneHref} className={btn.secondary}>
          Call {site.phone}
        </a>
      </PageHeader>

      <section className="py-20 sm:py-28" aria-labelledby="options-heading">
        <Container>
          <SectionHeading>
            <span id="options-heading">Three ways to get propane</span>
          </SectionHeading>
          <ul className="mt-12 grid gap-x-12 gap-y-4 md:grid-cols-3">
            {offerings.map((o) => (
              <li key={o.title} className="border-t-2 border-ink py-7">
                <o.icon className="size-7 text-canopy" aria-hidden strokeWidth={1.75} />
                <h3 className="mt-5 font-display text-3xl font-semibold">{o.title}</h3>
                <p className="mt-3 leading-relaxed text-asphalt">{o.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="on-dark bg-ink py-20 text-white sm:py-24" aria-labelledby="safety-heading">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <TriangleAlert className="size-9 text-[#ffb020]" aria-hidden strokeWidth={1.75} />
            <SectionHeading className="mt-5">
              <span id="safety-heading">If you smell gas</span>
            </SectionHeading>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/75">
              Propane is treated with an odor like rotten eggs so you can tell when there’s a leak. If you smell it,
              act right away.
            </p>
          </div>
          <ol className="space-y-5">
            {safety.map((step, i) => (
              <li key={step} className="flex gap-5 border-b border-white/10 pb-5 last:border-0">
                <span className="font-display text-3xl leading-none font-semibold text-white/40 tabular-nums">{i + 1}</span>
                <span className="text-lg leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="request" className="scroll-mt-24 py-20 sm:py-28" aria-labelledby="request-heading">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading>
              <span id="request-heading">Request propane delivery</span>
            </SectionHeading>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-asphalt">
              Send us your address and what you need, and we’ll call with pricing and a delivery day.
            </p>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-asphalt">
              Just refilling a grill tank? No need to call ahead. Bring it by during business hours.
            </p>
          </div>
          <RequestForm topic="propane" />
        </Container>
      </section>

      <CallBand heading="Questions about propane?" body="Call and we’ll help you sort out tank size, delivery and pricing." />
    </>
  );
}
