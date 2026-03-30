import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "AtyrePrint — Custom Clothing & Gifts that Speak for You";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function TwitterImage() {
  const logoData = await readFile(join(process.cwd(), "public/logo.png"));
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "48px",
        background: "linear-gradient(135deg, #1A3A10 0%, #3D6B1E 100%)",
        fontFamily: "system-ui, sans-serif",
        padding: "60px 80px",
      }}
    >
      {/* Logo on the left */}
      <div
        style={{
          width: 200,
          height: 200,
          borderRadius: "24px",
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <img
          src={logoBase64}
          width={170}
          height={170}
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Text on the right */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.1,
            display: "flex",
          }}
        >
          Custom Clothing & Gifts that Speak for You
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#A7CF45",
            display: "flex",
          }}
        >
          Premium print-on-demand & embroidery services
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 18,
            color: "#D4A853",
            display: "flex",
          }}
        >
          atyreprint.com
        </div>
      </div>
    </div>,
    { ...size },
  );
}
