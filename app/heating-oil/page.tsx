import type { Metadata } from "next";
import { RequestForm } from "@/components/request-form";
import { CallBand } from "@/components/sections";
import { btn, Container, PageHeader, SectionHeading } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Heating Oil & Fuel Delivery",
  description:
    "Home heating oil delivery in Rockwell, NC and the surrounding area from Sifford Oil Company, family owned since 1955.",
  path: "/heating-oil",
});

const steps = [
  {
    title: "Check your gauge",
    body: "The gauge is on top of the tank. When it reads about 1/4, it’s time to order.",
  },
  {
    title: "Call or send a request",
    body: "Tell us your address and how much you need. You can call or use the form below.",
  },
  {
    title: "We deliver",
    body: "We’ll give you a delivery day and bring the oil on our own truck. Keep the path to the fill pipe clear.",
  },
];

export default function HeatingOilPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Heating oil", "/heating-oil")} />
      <PageHeader
        title="Heating oil delivered to your door"
        intro="We deliver home heating oil to Rockwell and the surrounding area on our own trucks. Order before the tank runs low and we’ll get you on the schedule."
      >
        <a href="#order" className={btn.primary}>
          Order heating oil
        </a>
        <a href={site.phoneHref} className={btn.secondary}>
          Call {site.phone}
        </a>
      </PageHeader>

      <section className="py-20 sm:py-28" aria-labelledby="how-heading">
        <Container>
          <SectionHeading>
            <span id="how-heading">How ordering works</span>
          </SectionHeading>
          <ol className="mt-12 grid gap-x-12 gap-y-4 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t-2 border-ink py-7">
                <span className="font-display text-5xl leading-none font-semibold text-canopy tabular-nums">{i + 1}</span>
                <h3 className="mt-4 font-display text-3xl font-semibold">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-asphalt">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-sky py-20 sm:py-24" aria-labelledby="tips-heading">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading>
              <span id="tips-heading">Don’t wait for a cold snap</span>
            </SectionHeading>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-asphalt">
              When the first hard freeze hits, everyone calls at once. Ordering early in the fall, and again before your
              tank drops below a quarter, keeps you from running out and having to bleed the burner.
            </p>
          </div>
          <div className="rounded-xl bg-white p-8 ring-1 ring-line sm:p-10">
            <h3 className="font-display text-3xl font-semibold">Farm or business?</h3>
            <p className="mt-3 text-lg leading-relaxed text-asphalt">
              Ask us about bulk fuel delivery for equipment, generators and job sites. Call {site.phone} to talk through
              what you need and how often.
            </p>
            <a href={site.phoneHref} className={`${btn.primary} mt-6`}>
              Call about bulk delivery
            </a>
          </div>
        </Container>
      </section>

      <section id="order" className="scroll-mt-24 py-20 sm:py-28" aria-labelledby="order-heading">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading>
              <span id="order-heading">Order heating oil</span>
            </SectionHeading>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-asphalt">
              Send your address and how much you need. We’ll call to confirm the price and delivery day.
            </p>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-asphalt">
              Out of oil right now? Call instead:{" "}
              <a href={site.phoneHref} className="font-semibold whitespace-nowrap text-canopy underline underline-offset-4">
                {site.phone}
              </a>
              .
            </p>
          </div>
          <RequestForm topic="heating-oil" />
        </Container>
      </section>

      <CallBand heading="Keep the house warm this winter" body="Call to order heating oil or ask about delivery to your area." />
    </>
  );
}
