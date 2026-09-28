import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export const btn = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-md bg-canopy px-5 py-3 font-semibold text-white transition-colors hover:bg-canopy-dark",
  secondary:
    "inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 font-semibold text-ink ring-1 ring-ink/15 transition-colors hover:bg-sky hover:ring-ink/25",
  onDark:
    "inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 font-semibold text-ink transition-colors hover:bg-sky",
  ghostOnDark:
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold text-white ring-1 ring-white/30 transition-colors hover:bg-white/10",
};

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Wordmark({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 font-script leading-none ${light ? "text-white" : "text-canopy"} ${className}`}>
      <span className="text-[2rem]">Sifford</span>
      <span className="text-lg">Oil Co.</span>
    </span>
  );
}

export function TextLink({ className = "", ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={`font-semibold text-canopy underline decoration-canopy/30 decoration-2 underline-offset-4 transition-colors hover:decoration-canopy ${className}`}
      {...props}
    />
  );
}

export function FacebookIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9z" />
    </svg>
  );
}

export function PageHeader({ title, intro, children }: { title: string; intro: string; children?: ReactNode }) {
  return (
    <header className="border-b border-line bg-gradient-to-b from-sky to-white">
      <Container className="pt-14 pb-12 sm:pt-20 sm:pb-16">
        <h1 className="max-w-3xl font-display text-5xl leading-[0.95] font-semibold tracking-tight text-balance sm:text-7xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-asphalt sm:text-xl">{intro}</p>
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </Container>
    </header>
  );
}

export function SectionHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`font-display text-4xl leading-none font-semibold tracking-tight text-balance sm:text-5xl ${className}`}>
      {children}
    </h2>
  );
}
