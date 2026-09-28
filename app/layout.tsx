import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, Yellowtail } from "next/font/google";
import { MobileActionBar, SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/json-ld";
import { baseOpenGraph } from "@/lib/seo";
import { fullAddress, hours, site } from "@/lib/site";
import "./globals.css";

// Barlow was drawn from California highway signage — fitting for a station on Hwy 152.
const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700"],
});

// Stand-in for the hand-lettered script on the Sifford sign. Swap for the real logo when available.
const yellowtail = Yellowtail({
  variable: "--font-yellowtail",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sifford Oil Company | Fuel, Auto Service & Propane in Rockwell, NC",
    template: "%s | Sifford Oil Company, Rockwell NC",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: baseOpenGraph,
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#1d4fa3",
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GasStation",
  "@id": `${site.url}/#business`,
  name: site.name,
  legalName: site.legalName,
  description: site.description,
  url: site.url,
  image: `${site.url}/images/station.jpg`,
  telephone: "+1-704-279-2125",
  faxNumber: "+1-704-279-1931",
  foundingDate: String(site.founded),
  founder: { "@type": "Person", name: site.founder },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  hasMap: site.links.directions,
  areaServed: [site.address.county, "Rockwell, NC"],
  sameAs: [site.links.facebook],
  paymentAccepted: "Credit Card, Debit Card, Apple Pay, Google Pay",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: days,
    opens: "00:00",
    closes: "23:59",
  },
  department: {
    "@type": "AutoRepair",
    name: `${site.name} Service Center`,
    telephone: "+1-704-279-2125",
    address: fullAddress,
    openingHoursSpecification: hours
      .filter((d) => d.hours)
      .map((d) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: d.day,
        opens: d.hours!.open,
        closes: d.hours!.close,
      })),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} ${yellowtail.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileActionBar />
        <JsonLd data={jsonLd} />
      </body>
    </html>
  );
}
