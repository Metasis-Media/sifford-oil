import { SevenSeg } from "./seven-seg";

// The roadside sign out front on Hwy 152: script logo panel over an LED cabinet.
export function RoadSign({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <div className="relative w-full rounded-xl bg-white p-3 shadow-[0_30px_60px_-30px_rgb(15_29_56/0.55)] ring-1 ring-ink/10 sm:p-4">
        {/* Logo panel */}
        <div className="rounded-md border-[3px] border-canopy/85 px-5 pt-3 pb-4 text-canopy sm:px-7">
          <p className="font-script text-[4.25rem] leading-[0.9] sm:text-[5.5rem]" aria-hidden>
            Sifford
          </p>
          <p className="-mt-1 text-right font-script text-2xl leading-none sm:text-3xl" aria-hidden>
            Oil Co.
          </p>
        </div>

        {/* LED cabinet */}
        <div className="mt-3 space-y-2 rounded-md bg-ink p-2.5 sm:p-3">
          <SignRow chip="Since" chipClass="bg-canopy" text="1955" label="Since 1955" delay={0.35} />
          <SignRow chip="Pumps" chipClass="bg-diesel" text="24Hr" label="Pumps open 24 hours" delay={0.95} />
        </div>
      </div>

      {/* Posts */}
      <div className="flex w-full justify-between px-[16%]" aria-hidden>
        <span className="h-24 w-3.5 bg-gradient-to-r from-white via-sky-2 to-white shadow-inner sm:h-32 sm:w-4" />
        <span className="h-24 w-3.5 bg-gradient-to-r from-white via-sky-2 to-white shadow-inner sm:h-32 sm:w-4" />
      </div>
    </div>
  );
}

function SignRow({
  chip,
  chipClass,
  text,
  label,
  delay,
}: {
  chip: string;
  chipClass: string;
  text: string;
  label: string;
  delay: number;
}) {
  return (
    <div className="flex items-stretch gap-2.5">
      <span
        className={`flex w-[4.75rem] shrink-0 items-center justify-center rounded-sm font-display text-sm font-bold tracking-wider text-white uppercase sm:w-24 sm:text-base ${chipClass}`}
      >
        {chip}
      </span>
      <div className="flex flex-1 items-center justify-end rounded-sm bg-[#0a1428] px-3 py-2.5 shadow-[inset_0_2px_8px_rgb(0_0_0/0.6)]">
        <SevenSeg text={text} label={label} powerOn delay={delay} className="h-12 w-auto sm:h-16" />
      </div>
    </div>
  );
}
