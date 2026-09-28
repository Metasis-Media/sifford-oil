import type { Metadata } from "next";
import { Clock, Droplets, Flame, Gauge, SmartphoneNfc, Store } from "lucide-react";
import { CallBand, FuelBoard } from "@/components/sections";
import { btn, Container, PageHeader, SectionHeading, TextLink } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Fuel & Ethanol-Free Gas",
  description:
    "Marathon regular, mid-grade, premium, diesel and ethanol-free premium on Hwy 152 E in Rockwell, NC. Touchless pay at the pump with Apple Pay, Google Pay or a chip card, 24 hours a day.",
  path: "/fuel",
});

const amenities = [
  { icon: Clock, title: "Open 24 hours", body: "The pumps never close. Fill up any time, day or night." },
  {
    icon: SmartphoneNfc,
    title: "Touchless pay at the pump",
    body: "Tap to pay with Apple Pay, Google Pay or a contactless card, or insert a chip card.",
  },
  { icon: Store, title: "Convenience store", body: "Drinks, snacks and the everyday things you stop in for." },
  { icon: Gauge, title: "Air pump", body: "Top off your tires before you get back on the road." },
  { icon: Flame, title: "Propane refills", body: "Bring your grill or camper tank during business hours." },
  { icon: Droplets, title: "Restrooms", body: "Restrooms are open to customers during store hours." },
];

export default function FuelPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Fuel", "/fuel")} />
      <PageHeader
        title="Fuel for cars, trucks, boats and mowers"
        intro="Marathon gasoline and diesel, plus ethanol-free premium that not every station carries. The pumps are open 24 hours."
      >
        <a href={site.links.gasbuddy} className={btn.primary} rel="noopener" target="_blank">
          Today’s prices on GasBuddy
        </a>
        <a href={site.links.directions} className={btn.secondary} rel="noopener" target="_blank">
          Get directions
        </a>
      </PageHeader>

      <section className="on-dark bg-ink py-20 text-white sm:py-24" aria-labelledby="grades-heading">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <SectionHeading>
              <span id="grades-heading">Grades at the pump</span>
            </SectionHeading>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/75">
              Five choices, from everyday regular to ethanol-free premium for engines that sit between uses. Not sure
              what your engine needs? Check the owner’s manual or ask us inside.
            </p>
          </div>
          <FuelBoard />
        </Container>
      </section>

      <section className="py-20 sm:py-28" aria-labelledby="e0-heading">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading>
              <span id="e0-heading">Why ethanol-free?</span>
            </SectionHeading>
            <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-asphalt">
              <p>
                Most pump gas is blended with up to 10% ethanol. Ethanol draws water out of the air, and over a few
                weeks that water can separate out and gum up carburetors, fuel lines and small engines.
              </p>
              <p>
                Ethanol-free gas doesn’t have that problem, so it’s the safer choice for anything that sits between
                uses.
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-sky p-8 sm:p-10">
            <h3 className="font-display text-3xl font-semibold">Good for</h3>
            <ul className="mt-5 grid gap-x-8 gap-y-3 text-lg sm:grid-cols-2">
              {[
                "Boats and outboard motors",
                "Lawn mowers and tractors",
                "Chainsaws and trimmers",
                "Generators",
                "Motorcycles and ATVs",
                "Classic and collector cars",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 size-2 shrink-0 rounded-full bg-canopy" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-28" aria-labelledby="amenities-heading">
        <Container>
          <SectionHeading>
            <span id="amenities-heading">While you’re here</span>
          </SectionHeading>
          <ul className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map((a) => (
              <li key={a.title} className="flex gap-4">
                <a.icon className="mt-1 size-6 shrink-0 text-canopy" aria-hidden strokeWidth={1.75} />
                <div>
                  <h3 className="font-display text-2xl font-semibold">{a.title}</h3>
                  <p className="mt-1 text-asphalt">{a.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-12 text-lg text-asphalt">
            Need your car looked at while you’re here? <TextLink href="/auto-service">See our service center</TextLink>.
          </p>
        </Container>
      </section>

      <CallBand heading="On your way?" body={`We’re at ${site.address.street} in ${site.address.city}, and the pumps are always on.`} />
    </>
  );
}
