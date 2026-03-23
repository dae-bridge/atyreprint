"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const CONSENT_KEY = "atyreprint-cookie-consent";

type ConsentValue = "accepted" | "necessary-only";

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      // Small delay so it doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (value: ConsentValue) => {
    localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-white border border-border rounded-2xl shadow-2xl p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex w-10 h-10 bg-accent/20 rounded-full items-center justify-center flex-shrink-0 mt-0.5">
            <Cookie size={20} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-foreground text-sm sm:text-base">
                We use cookies
              </h3>
              <button
                onClick={() => handleConsent("necessary-only")}
                className="text-text-muted hover:text-foreground transition-colors flex-shrink-0"
                aria-label="Dismiss"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-text-secondary text-sm mt-1 leading-relaxed">
              We use cookies to improve your experience, analyse site traffic,
              and personalise content. By clicking &quot;Accept All&quot;, you
              consent to our use of cookies. You can also choose to allow only
              essential cookies.{" "}
              <Link
                href="/privacy-policy"
                className="text-primary hover:text-primary-light font-medium underline underline-offset-2"
              >
                Privacy Policy
              </Link>
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={() => handleConsent("accepted")}
                className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={() => handleConsent("necessary-only")}
                className="px-5 py-2.5 border border-border text-foreground text-sm font-semibold rounded-lg hover:bg-surface transition-colors"
              >
                Necessary Only
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
