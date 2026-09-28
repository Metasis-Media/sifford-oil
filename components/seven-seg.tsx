// LED segment displays, drawn like the red price numerals on the roadside sign.
// SevenSeg handles digits; FourteenSeg adds diagonals and center bars for real capital letters.

const T = 10; // segment thickness
const H = T / 2;
const G = 1.6; // gap between segments
const L = 5; // left edge (segment centerline)
const TOP = 5;
const MID = 50;
const BOT = 95;

type Point = [number, number];
const pts = (p: Point[]) => p.map((q) => q.join(",")).join(" ");

function hSeg(x1: number, x2: number, y: number) {
  return pts([
    [x1, y],
    [x1 + H, y - H],
    [x2 - H, y - H],
    [x2, y],
    [x2 - H, y + H],
    [x1 + H, y + H],
  ]);
}

function vSeg(x: number, y1: number, y2: number) {
  return pts([
    [x, y1],
    [x + H, y1 + H],
    [x + H, y2 - H],
    [x, y2],
    [x - H, y2 - H],
    [x - H, y1 + H],
  ]);
}

/** A slanted bar filling one quadrant of a 14-segment cell, from corner to opposite corner. */
function diag(x1: number, y1: number, x2: number, y2: number, falling: boolean) {
  const w = 6.5; // horizontal width of the bar
  return falling
    ? pts([[x1, y1], [x1 + w, y1], [x2, y2], [x2 - w, y2]])
    : pts([[x2 - w, y1], [x2, y1], [x1 + w, y2], [x1, y2]]);
}

// ── Seven segments ──────────────────────────────────────────────
const R7 = 51;

const SEG7 = {
  a: hSeg(L + G, R7 - G, TOP),
  b: vSeg(R7, TOP + G, MID - G),
  c: vSeg(R7, MID + G, BOT - G),
  d: hSeg(L + G, R7 - G, BOT),
  e: vSeg(L, MID + G, BOT - G),
  f: vSeg(L, TOP + G, MID - G),
  g: hSeg(L + G, R7 - G, MID),
};

const GLYPHS7: Record<string, (keyof typeof SEG7)[]> = {
  "0": ["a", "b", "c", "d", "e", "f"],
  "1": ["b", "c"],
  "2": ["a", "b", "g", "e", "d"],
  "3": ["a", "b", "g", "c", "d"],
  "4": ["f", "g", "b", "c"],
  "5": ["a", "f", "g", "c", "d"],
  "6": ["a", "f", "g", "e", "d", "c"],
  "7": ["a", "b", "c"],
  "8": ["a", "b", "c", "d", "e", "f", "g"],
  "9": ["a", "b", "c", "d", "f", "g"],
  S: ["a", "f", "g", "c", "d"],
  H: ["b", "c", "e", "f", "g"],
  r: ["e", "g"],
  "-": ["g"],
  " ": [],
};

// ── Fourteen segments ───────────────────────────────────────────
const R14 = 55;
const CX = 30; // center bar
// Inner edges of the four quadrants the diagonals sit in.
const QL = L + H + G;
const QR = R14 - H - G;
const QCL = CX - H - G;
const QCR = CX + H + G;
const QT = TOP + H + G;
const QMT = MID - H - G;
const QMB = MID + H + G;
const QB = BOT - H - G;

const SEG14 = {
  a: hSeg(L + G, R14 - G, TOP),
  b: vSeg(R14, TOP + G, MID - G),
  c: vSeg(R14, MID + G, BOT - G),
  d: hSeg(L + G, R14 - G, BOT),
  e: vSeg(L, MID + G, BOT - G),
  f: vSeg(L, TOP + G, MID - G),
  g1: hSeg(L + G, CX - G, MID),
  g2: hSeg(CX + G, R14 - G, MID),
  h: diag(QL, QT, QCL, QMT, true),
  i: vSeg(CX, TOP + H + G, MID - G),
  j: diag(QCR, QT, QR, QMT, false),
  k: diag(QL, QMB, QCL, QB, false),
  l: vSeg(CX, MID + G, BOT - H - G),
  m: diag(QCR, QMB, QR, QB, true),
};

const GLYPHS14: Record<string, (keyof typeof SEG14)[]> = {
  S: ["a", "f", "g1", "g2", "c", "d"],
  I: ["a", "i", "l", "d"],
  N: ["f", "e", "h", "m", "b", "c"],
  C: ["a", "f", "e", "d"],
  E: ["a", "f", "g1", "e", "d"],
  " ": [],
};

// ── Shared renderer ─────────────────────────────────────────────
const SKEW = -6; // degrees, the slight lean real LED signs have
const SKEW_SHIFT = 10.5; // how far the skew pushes the bottom of a cell left
const STAGGER = 0.14; // seconds between characters lighting up
const POWER_ON = 1.1; // seconds; keep in sync with --animate-led-on in globals.css

/** Seconds until the last character of a powerOn sequence has finished flickering on. */
export function powerOnEnd(text: string, delay = 0) {
  return delay + ([...text].length - 1) * STAGGER + POWER_ON;
}

type Props = {
  text: string;
  className?: string;
  /** Play the "sign powering on" flicker. Skipped for reduced-motion users. */
  powerOn?: boolean;
  /** Seconds before the first character lights. */
  delay?: number;
  label?: string;
};

function SegmentDisplay<K extends string>({
  segments,
  glyphs,
  cellWidth,
  text,
  className,
  powerOn = false,
  delay = 0,
  label,
}: Props & { segments: Record<K, string>; glyphs: Record<string, K[]>; cellWidth: number }) {
  const chars = [...text];
  const advance = cellWidth + 14;
  const offset = SKEW_SHIFT / 2;
  const width = (chars.length - 1) * advance + cellWidth + offset + 1;
  const keys = Object.keys(segments) as K[];

  return (
    <svg viewBox={`-6 -2 ${width + 6} 104`} className={className} role="img" aria-label={label ?? text}>
      {chars.map((ch, i) => {
        const lit = glyphs[ch] ?? [];
        return (
          <g key={i} transform={`translate(${i * advance + offset} 0) skewX(${SKEW})`}>
            {keys.map((s) => (
              <polygon key={s} points={segments[s]} className="led-dim" />
            ))}
            <g
              className={powerOn ? "motion-safe:animate-led-on" : undefined}
              style={powerOn ? { animationDelay: `${delay + i * STAGGER}s` } : undefined}
            >
              {lit.map((s) => (
                <polygon key={s} points={segments[s]} className="led-lit" />
              ))}
            </g>
          </g>
        );
      })}
    </svg>
  );
}

export function SevenSeg(props: Props) {
  return <SegmentDisplay {...props} segments={SEG7} glyphs={GLYPHS7} cellWidth={R7 + L} />;
}

export function FourteenSeg(props: Props) {
  return <SegmentDisplay {...props} segments={SEG14} glyphs={GLYPHS14} cellWidth={R14 + L} />;
}
