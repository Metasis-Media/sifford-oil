// Single source of truth for business details. Update here and every page follows.

export const site = {
  name: "Sifford Oil Company",
  legalName: "Sifford Oil Company, LLC",
  shortName: "Sifford Oil",
  founded: 1955,
  founder: "Max Sifford",
  owner: "Steve Sifford",
  description:
    "Family-owned fuel station, NAPA AutoCare service center, propane dealer and heating oil delivery in Rockwell, NC since 1955.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

  phone: "(704) 279-2125",
  phoneHref: "tel:+17042792125",
  fax: "(704) 279-1931",

  address: {
    street: "6130 Hwy 152 E",
    city: "Rockwell",
    state: "NC",
    zip: "28138",
    county: "Rowan County",
  },

  links: {
    facebook: "https://www.facebook.com/p/Sifford-Oil-Company-61559932874152/",
    gasbuddy: "https://www.gasbuddy.com/station/58173",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=6130+Hwy+152+E%2C+Rockwell%2C+NC+28138",
    mapEmbed:
      "https://www.google.com/maps?q=Sifford+Oil+Company,+6130+Hwy+152+E,+Rockwell,+NC+28138&output=embed",
  },

  propaneLicense: "321",
  usdot: "3215700",
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;

// Service center hours. The pumps are open 24 hours.
// Times are 24h "HH:MM" in America/New_York. `null` means closed.
export type DayHours = { open: string; close: string } | null;

export const hours: { day: string; short: string; hours: DayHours }[] = [
  { day: "Sunday", short: "Sun", hours: null },
  { day: "Monday", short: "Mon", hours: { open: "07:00", close: "18:00" } },
  { day: "Tuesday", short: "Tue", hours: { open: "07:00", close: "18:00" } },
  { day: "Wednesday", short: "Wed", hours: { open: "07:00", close: "18:00" } },
  { day: "Thursday", short: "Thu", hours: { open: "07:00", close: "18:00" } },
  { day: "Friday", short: "Fri", hours: { open: "07:00", close: "18:00" } },
  { day: "Saturday", short: "Sat", hours: { open: "07:00", close: "13:00" } },
];

export const timeZone = "America/New_York";

export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour} ${suffix}` : `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

export const nav = [
  { href: "/fuel", label: "Fuel" },
  { href: "/auto-service", label: "Auto service" },
  { href: "/propane", label: "Propane" },
  { href: "/heating-oil", label: "Heating oil" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const fuelGrades = [
  {
    code: "REG",
    name: "Regular unleaded",
    note: "Everyday fuel for most cars and trucks.",
    chip: "blue",
  },
  {
    code: "MID",
    name: "Mid-grade",
    note: "For engines that call for a step up from regular.",
    chip: "blue",
  },
  {
    code: "PREM",
    name: "Premium",
    note: "For performance and turbocharged engines.",
    chip: "blue",
  },
  {
    code: "E0",
    name: "Ethanol-free premium",
    note: "For boats, mowers, chainsaws, generators and classic cars.",
    chip: "white",
  },
  {
    code: "DSL",
    name: "Diesel",
    note: "For diesel trucks, tractors and equipment.",
    chip: "green",
  },
] as const;

export const reviews = [
  {
    quote:
      "I cannot say enough about this family owned business. From oil changes and auto repair, to ensuring fuel and propane are available to citizens during times of crisis.",
    author: "April W.",
    source: "Yelp",
  },
  {
    quote:
      "Oil for my house, bulbs, inspections. They do an amazing job and they are always friendly!",
    author: "Rebekah W.",
    source: "Yelp",
  },
  {
    quote: "24hr pumps, good prices, safe area and have ethanol free premium.",
    author: "A GasBuddy reviewer",
    source: "GasBuddy",
  },
] as const;
