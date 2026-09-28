import Link from "next/link";
import { SevenSeg } from "@/components/seven-seg";
import { btn, Container } from "@/components/ui";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start py-24 sm:py-32">
      <div className="rounded-xl bg-white p-2.5 shadow-[0_24px_48px_-24px_rgb(15_29_56/0.5)] ring-1 ring-ink/10">
        <div className="rounded-md bg-[#0a1428] px-6 py-5 shadow-[inset_0_2px_8px_rgb(0_0_0/0.6)]">
          <SevenSeg text="404" className="h-16 w-auto sm:h-20" label="404" />
        </div>
      </div>
      <h1 className="mt-10 font-display text-5xl font-semibold tracking-tight sm:text-6xl">This page isn’t here</h1>
      <p className="mt-4 max-w-lg text-lg text-asphalt">
        The link may be old or mistyped. Head back to the home page, or call us at {site.phone}.
      </p>
      <Link href="/" className={`${btn.primary} mt-8`}>
        Go to the home page
      </Link>
    </Container>
  );
}
