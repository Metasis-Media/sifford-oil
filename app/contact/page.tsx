import type { Metadata } from "next";
import { Mail, Navigation, Phone, Printer } from "lucide-react";
import { HoursTable } from "@/components/hours";
import { RequestForm } from "@/components/request-form";
import { Container, FacebookIcon, PageHeader, TextLink } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Directions",
  description: `Call Sifford Oil Company at ${site.phone}, send a message, or get directions to 6130 Hwy 152 E, Rockwell, NC 28138.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Contact", "/contact")} />
      <PageHeader
        title="Call, write or stop by"
        intro="The fastest way to reach us is by phone during business hours. You can also send a message and we’ll call you back."
      />

      <section className="py-16 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="space-y-10">
            <ul className="space-y-5 text-lg">
              <li>
                <a href={site.phoneHref} className="group flex items-start gap-4">
                  <Phone className="mt-1 size-5 text-canopy" aria-hidden />
                  <span>
                    <span className="block font-display text-3xl font-semibold tabular-nums group-hover:text-canopy">
                      {site.phone}
                    </span>
                    <span className="text-asphalt">Call during business hours</span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-4">
                <Printer className="mt-1 size-5 text-canopy" aria-hidden />
                <span className="tabular-nums">Fax {site.fax}</span>
              </li>
              <li>
                <a href={site.links.directions} className="group flex items-start gap-4" rel="noopener" target="_blank">
                  <Navigation className="mt-1 size-5 text-canopy" aria-hidden />
                  <address className="not-italic group-hover:text-canopy">
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.state} {site.address.zip}
                    <span className="mt-0.5 block font-semibold text-canopy underline underline-offset-4">Get directions</span>
                  </address>
                </a>
              </li>
              <li>
                <a href={site.links.facebook} className="group flex items-start gap-4" rel="noopener" target="_blank">
                  <FacebookIcon className="mt-1 size-5 text-canopy" />
                  <span className="group-hover:text-canopy">Message us on Facebook</span>
                </a>
              </li>
            </ul>

            <div>
              <h2 className="font-display text-3xl font-semibold">Service center and store</h2>
              <p className="mt-1 text-asphalt">The pumps are open 24 hours.</p>
              <HoursTable className="mt-4 text-lg" />
            </div>
          </div>

          <div>
            <h2 className="flex items-center gap-3 font-display text-4xl font-semibold">
              <Mail className="size-7 text-canopy" aria-hidden strokeWidth={1.75} />
              Send a message
            </h2>
            <p className="mt-3 mb-8 text-lg text-asphalt">
              Booking a repair or ordering fuel? The <TextLink href="/auto-service#book">service</TextLink>,{" "}
              <TextLink href="/propane#request">propane</TextLink> and <TextLink href="/heating-oil#order">heating oil</TextLink>{" "}
              forms ask for the details we need.
            </p>
            <RequestForm topic="contact" submitLabel="Send message" />
          </div>
        </Container>
      </section>

      <section aria-label="Map">
        <iframe
          title="Map showing Sifford Oil Company on Hwy 152 East in Rockwell, NC"
          src={site.links.mapEmbed}
          className="block h-[420px] w-full border-t border-line"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
