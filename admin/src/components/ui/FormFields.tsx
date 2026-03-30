"use client";

import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";
import { InfoTooltip } from "./InfoTooltip";
import { ImageCropDialog } from "./ImageCropDialog";
import { compressImage } from "@/lib/imageUtils";

// ─── Label Helper ────────────────────────────────────────────────────────

const FieldLabel = ({
  htmlFor,
  label,
  tooltip,
  required,
}: {
  htmlFor?: string;
  label: string;
  tooltip?: string;
  required?: boolean;
}) => (
  <label
    htmlFor={htmlFor}
    className="flex items-center gap-1.5 text-sm font-medium text-foreground"
  >
    {label}
    {required && <span className="text-error">*</span>}
    {tooltip && <InfoTooltip text={tooltip} position="right" />}
  </label>
);

// ─── Input ───────────────────────────────────────────────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  tooltip?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, tooltip, className, id, required, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        {label && (
          <FieldLabel
            htmlFor={inputId}
            label={label}
            tooltip={tooltip}
            required={required}
          />
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
            error
              ? "border-error focus:ring-error/20 focus:border-error"
              : "border-border",
            props.disabled && "bg-gray-50 text-text-muted cursor-not-allowed",
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-error">{error}</p>}
        {hint && !error && <p className="text-xs text-text-muted">{hint}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";

// ─── Textarea ────────────────────────────────────────────────────────────

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  tooltip?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, tooltip, className, id, required, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        {label && (
          <FieldLabel
            htmlFor={inputId}
            label={label}
            tooltip={tooltip}
            required={required}
          />
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y min-h-[80px]",
            error
              ? "border-error focus:ring-error/20 focus:border-error"
              : "border-border",
            className,
          )}
          {...props}
        />
        {hint && !error && <p className="text-xs text-text-muted">{hint}</p>}
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

// ─── Select ──────────────────────────────────────────────────────────────

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  tooltip?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      tooltip,
      options,
      placeholder,
      className,
      id,
      required,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        {label && (
          <FieldLabel
            htmlFor={inputId}
            label={label}
            tooltip={tooltip}
            required={required}
          />
        )}
        <select
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white",
            error
              ? "border-error focus:ring-error/20 focus:border-error"
              : "border-border",
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    );
  },
);
Select.displayName = "Select";

// ─── Toggle ──────────────────────────────────────────────────────────────

interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Toggle = ({
  label,
  description,
  checked,
  onChange,
}: ToggleProps) => (
  <label className="flex items-center justify-between cursor-pointer group">
    <div>
      <span className="text-sm font-medium text-foreground">{label}</span>
      {description && (
        <p className="text-xs text-text-muted mt-0.5">{description}</p>
      )}
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20",
        checked ? "bg-primary" : "bg-gray-200",
      )}
    >
      <span
        className={cn(
          "inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform",
          checked ? "translate-x-[18px]" : "translate-x-[3px]",
        )}
      />
    </button>
  </label>
);

// ─── Image Upload ────────────────────────────────────────────────────────

interface ImageUploadProps {
  label?: string;
  tooltip?: string;
  value?: string;
  onChange: (file: File) => void;
  onRemove?: () => void;
  /** Aspect ratio for crop (width/height). Null = free crop */
  cropAspectRatio?: number | null;
  /** Enable crop dialog. Default: true */
  enableCrop?: boolean;
  className?: string;
}

export const ImageUpload = ({
  label,
  tooltip,
  value,
  onChange,
  onRemove,
  cropAspectRatio = null,
  enableCrop = true,
  className,
}: ImageUploadProps) => {
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [showCrop, setShowCrop] = useState(false);

  const handleFileSelect = (file: File) => {
    if (enableCrop) {
      setPendingFile(file);
      setShowCrop(true);
    } else {
      processAndUpload(file);
    }
  };

  const processAndUpload = async (file: File) => {
    const compressed = await compressImage(file);
    onChange(compressed);
  };

  const handleCropped = (croppedFile: File) => {
    processAndUpload(croppedFile);
    setPendingFile(null);
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <FieldLabel label={label} tooltip={tooltip} />
      )}
      {value ? (
        <div className="relative group w-full aspect-video rounded-lg overflow-hidden border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Upload preview"
            className="w-full h-full object-cover"
          />
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-2 right-2 bg-error text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Remove
            </button>
          )}
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/40 transition-colors">
          <div className="text-center p-4">
            <p className="text-sm text-text-secondary">Click to upload</p>
            <p className="text-xs text-text-muted">PNG, JPG up to 5MB</p>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
          />
        </label>
      )}

      <ImageCropDialog
        open={showCrop}
        onClose={() => { setShowCrop(false); setPendingFile(null); }}
        imageFile={pendingFile}
        aspectRatio={cropAspectRatio}
        onCrop={handleCropped}
      />
    </div>
  );
};
