import Link from "next/link";
import { Fuel, MapPin, Navigation, Phone, Wrench } from "lucide-react";
import { formatTime, fullAddress, hours, nav, site } from "@/lib/site";
import { Container, FacebookIcon, Wordmark } from "./ui";

export function SiteFooter() {
  const weekday = hours[1].hours!;
  const saturday = hours[6].hours!;

  return (
    <footer className="on-dark bg-ink pb-24 text-white/75 md:pb-0">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Wordmark light />
          <p className="mt-4 leading-relaxed">
            Family owned and operated in Rockwell, North Carolina since {site.founded}.
          </p>
          <a
            href={site.links.facebook}
            className="mt-5 inline-flex items-center gap-2 font-medium text-white hover:underline"
            rel="noopener"
            target="_blank"
          >
            <FacebookIcon />
            Follow us on Facebook
          </a>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-white">Visit</h2>
          <address className="mt-3 not-italic leading-relaxed">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </address>
          <a
            href={site.links.directions}
            className="mt-3 inline-flex items-center gap-2 font-medium text-white hover:underline"
            rel="noopener"
            target="_blank"
          >
            <Navigation className="size-4" aria-hidden />
            Get directions
          </a>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-white">Hours</h2>

          <h3 className="mt-3 flex items-center gap-2 font-semibold text-white">
            <Fuel className="size-4" aria-hidden />
            Pumps
          </h3>
          <p className="mt-0.5 leading-relaxed">Open 24 hours, 7 days a week</p>

          <h3 className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 font-semibold text-white">
            <Wrench className="size-4" aria-hidden />
            Service center and store
          </h3>
          <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 leading-relaxed">
            <dt>Mon–Fri</dt>
            <dd className="text-white tabular-nums">
              {formatTime(weekday.open)} – {formatTime(weekday.close)}
            </dd>
            <dt>Saturday</dt>
            <dd className="text-white tabular-nums">
              {formatTime(saturday.open)} – {formatTime(saturday.close)}
            </dd>
            <dt>Sunday</dt>
            <dd className="text-white">Closed</dd>
          </dl>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-white">Call</h2>
          <a href={site.phoneHref} className="mt-3 flex items-center gap-2 text-lg font-semibold text-white tabular-nums hover:underline">
            <Phone className="size-4" aria-hidden />
            {site.phone}
          </a>
          <p className="mt-1 tabular-nums">Fax {site.fax}</p>
          <nav aria-label="Footer" className="mt-6">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-sm text-white/55 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. <span className="sr-only">{fullAddress}.</span>
            <span className="mt-1 block lg:mt-0 lg:ml-5 lg:inline">
              Website by{" "}
              <a
                href="https://metasismedia.com"
                className="text-white/75 underline decoration-white/25 underline-offset-4 hover:text-white hover:decoration-white"
                rel="noopener"
                target="_blank"
              >
                Metasis Media
              </a>
            </span>
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <span>NAPA AutoCare Center</span>
            <span>NC LP-gas dealer, Class A license #{site.propaneLicense}</span>
            <span>USDOT {site.usdot}</span>
          </p>
        </Container>
      </div>
    </footer>
  );
}

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-white/95 p-3 backdrop-blur-md md:hidden">
      <a
        href={site.phoneHref}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-canopy py-3 font-semibold text-white"
      >
        <Phone className="size-4" aria-hidden />
        Call
      </a>
      <a
        href={site.links.directions}
        rel="noopener"
        target="_blank"
        className="inline-flex items-center justify-center gap-2 rounded-md py-3 font-semibold text-ink ring-1 ring-ink/15"
      >
        <MapPin className="size-4" aria-hidden />
        Directions
      </a>
    </div>
  );
}
