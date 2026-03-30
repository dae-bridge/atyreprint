import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AtyrePrint — Custom Clothing & Gifts",
    short_name: "AtyrePrint",
    description:
      "Premium print-on-demand and embroidery services. Custom t-shirts, hoodies, mugs, tote bags & more.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3D6B1E",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
