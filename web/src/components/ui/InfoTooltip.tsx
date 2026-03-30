// src/components/ui/InfoTooltip.tsx
"use client";

import { Info, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface InfoTooltipProps {
  text: string;
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
}

export function InfoTooltip({
  text,
  className = "",
  position = "top",
}: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Calculate tooltip position when opened
  useEffect(() => {
    if (!isOpen || !buttonRef.current) return;

    const updatePosition = () => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();

      // Use viewport-relative coordinates since tooltip is position:fixed
      let top = 0;
      let left = 0;

      switch (position) {
        case "bottom":
          top = rect.bottom + 8;
          left = rect.left + rect.width / 2;
          break;
        case "left":
          top = rect.top + rect.height / 2;
          left = rect.left - 8;
          break;
        case "right":
          top = rect.top + rect.height / 2;
          left = rect.right + 8;
          break;
        case "top":
        default:
          top = rect.top - 8;
          left = rect.left + rect.width / 2;
          break;
      }

      setCoords({ top, left });
    };

    // Update position immediately and on scroll/resize
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, position]);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const tooltipContent = isOpen ? (
    <div
      ref={tooltipRef}
      className="fixed z-[9999] w-64 p-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg shadow-lg"
      style={{
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        transform:
          position === "top"
            ? "translate(-50%, -100%)"
            : position === "bottom"
              ? "translate(-50%, 0)"
              : position === "left"
                ? "translate(-100%, -50%)"
                : "translate(0, -50%)",
      }}
    >
      <div className="relative">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(false);
          }}
          className="absolute top-0 right-0 -mt-1 -mr-1 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="w-3 h-3" />
        </button>
        <div className="pr-6">{text}</div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => {
          // Optional: auto-close on mouse leave
          // setIsOpen(false);
        }}
        className={`text-gray-400 hover:text-gray-600 transition-colors focus:outline-none ${className}`}
        aria-label="More information"
      >
        <Info className="w-4 h-4" />
      </button>
      {typeof document !== "undefined" &&
        createPortal(tooltipContent, document.body)}
    </>
  );
}

export default InfoTooltip;
