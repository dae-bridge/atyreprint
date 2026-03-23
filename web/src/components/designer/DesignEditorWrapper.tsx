"use client";

import dynamic from "next/dynamic";

const DesignEditor = dynamic(
  () =>
    import("@/components/designer/DesignEditor").then(
      (mod) => mod.DesignEditor,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary font-medium">
            Loading Design Studio…
          </p>
        </div>
      </div>
    ),
  },
);

export const DesignEditorWrapper = () => {
  return <DesignEditor />;
};
