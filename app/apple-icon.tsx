import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS home-screen icon: the LED "S" favicon on a full-bleed navy square (iOS rounds the corners itself).
export default async function AppleIcon() {
  const svg = await readFile(join(process.cwd(), "app/icon.svg"));
  const src = `data:image/svg+xml;base64,${svg.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0f1d38" }}>
        <img src={src} alt="" width={180} height={180} />
      </div>
    ),
    size,
  );
}
