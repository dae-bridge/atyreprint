import type { Metadata } from "next";
import { DesignEditorWrapper } from "@/components/designer/DesignEditorWrapper";

export const metadata: Metadata = {
  title: "Personalise It — Design Your Own Custom Products | AtyrePrint",
  description:
    "Use our powerful online design tool to customise t-shirts, hoodies, mugs, tote bags and more. Add text, images, logos and shapes — we print or embroider it for you.",
  openGraph: {
    title: "Personalise It — Design Your Own Custom Products | AtyrePrint",
    description:
      "Create one-of-a-kind printed and embroidered products with our easy-to-use design studio.",
    type: "website",
  },
};

const PersonaliseItPage = () => {
  return (
    <main>
      <DesignEditorWrapper />
    </main>
  );
};

export default PersonaliseItPage;
