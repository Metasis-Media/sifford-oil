import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ogImage } from "@/lib/seo";

export const alt = ogImage.alt;
export const size = { width: ogImage.width, height: ogImage.height };
export const contentType = "image/png";

export default async function Image() {
  const [condensed, script, photo] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/BarlowCondensed-SemiBold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/Yellowtail-Regular.ttf")),
    readFile(join(process.cwd(), "public/images/station.jpg")),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0f1d38" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 660,
            padding: "64px 64px 56px",
            color: "white",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, fontFamily: "Yellowtail", color: "white" }}>
            <span style={{ fontSize: 92, lineHeight: 1 }}>Sifford</span>
            <span style={{ fontSize: 44 }}>Oil Co.</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "Barlow Condensed",
                fontSize: 80,
                lineHeight: 0.98,
                letterSpacing: -1,
              }}
            >
              <span>Fuel, repairs</span>
              <span>and propane on</span>
              <span>Highway 152.</span>
            </div>
            <div style={{ marginTop: 26, fontFamily: "Barlow Condensed", fontSize: 34, color: "rgba(255,255,255,0.7)" }}>
              Rockwell, NC. Family owned since 1955.
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, borderLeft: "10px solid #1d4fa3" }}>
          <img src={photoSrc} alt="" width={540} height={630} style={{ objectFit: "cover", objectPosition: "0% 50%", width: "100%", height: "100%" }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Barlow Condensed", data: condensed, weight: 600, style: "normal" },
        { name: "Yellowtail", data: script, weight: 400, style: "normal" },
      ],
    },
  );
}
