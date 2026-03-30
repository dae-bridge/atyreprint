import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "AtyrePrint — Custom Clothing & Gifts that Speak for You";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const logoData = await readFile(join(process.cwd(), "public/logo.png"));
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #f0f7e8 0%, #ffffff 50%, #f5f0e0 100%)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "6px",
          background:
            "linear-gradient(90deg, #3D6B1E 0%, #A7CF45 50%, #D4A853 100%)",
          display: "flex",
        }}
      />

      {/* Logo */}
      <img
        src={logoBase64}
        width={180}
        height={180}
        style={{ objectFit: "contain" }}
      />

      {/* Title */}
      <div
        style={{
          marginTop: 32,
          fontSize: 48,
          fontWeight: 700,
          color: "#1A3A10",
          letterSpacing: "-1px",
          display: "flex",
        }}
      >
        Custom Clothing & Gifts
      </div>

      {/* Subtitle */}
      <div
        style={{
          marginTop: 12,
          fontSize: 24,
          color: "#6B7280",
          display: "flex",
        }}
      >
        Premium print-on-demand & embroidery services
      </div>

      {/* Tagline pills */}
      <div
        style={{
          marginTop: 28,
          display: "flex",
          gap: "16px",
        }}
      >
        {["T-Shirts", "Hoodies", "Mugs", "Tote Bags", "Caps", "Embroidery"].map(
          (item) => (
            <div
              key={item}
              style={{
                padding: "8px 20px",
                borderRadius: "20px",
                background: "#3D6B1E",
                color: "white",
                fontSize: 16,
                fontWeight: 500,
                display: "flex",
              }}
            >
              {item}
            </div>
          ),
        )}
      </div>

      {/* Bottom URL */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          fontSize: 18,
          color: "#9CA3AF",
          display: "flex",
        }}
      >
        atyreprint.com
      </div>
    </div>,
    { ...size },
  );
}
