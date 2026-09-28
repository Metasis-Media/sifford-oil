# Sifford Oil Company website

Marketing site for Sifford Oil Company, a family-owned fuel station, NAPA AutoCare service center, propane dealer and heating oil distributor at 6130 Hwy 152 E, Rockwell, NC (since 1955).

Built with Next.js 16 (App Router), React 19 and Tailwind CSS v4. Every page is statically prerendered. The request forms use a server action.

## Develop

```bash
npm install
npm run dev
```

## Where things live

| What | File |
| --- | --- |
| Phone, address, hours, links, fuel grades, reviews | `lib/site.ts` |
| Colors and fonts (design tokens) | `app/globals.css`, `app/layout.tsx` |
| Roadside sign and LED digits | `components/road-sign.tsx`, `components/seven-seg.tsx` |
| Live "open now" status and hours table | `components/hours.tsx` |
| Request forms and email sending | `components/request-form.tsx`, `app/actions.ts` |
| Share image, favicon, sitemap, robots | `app/opengraph-image.tsx`, `app/icon.svg`, `app/sitemap.ts`, `app/robots.ts` |

Business hours only need changing in `lib/site.ts`. The header status, hours tables, footer and structured data all read from it.

## Deploy to Vercel

1. Push the repo to GitHub and import it in Vercel (framework preset: Next.js, no build settings to change).
2. Add the environment variables from `.env.example`:
   - `NEXT_PUBLIC_SITE_URL`: the final domain, e.g. `https://siffordoil.com`
   - `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`: so the forms can email the shop
3. Add the custom domain under Project → Settings → Domains.

Until the email variables are set, production forms show "call us at (704) 279-2125" rather than silently dropping requests.
