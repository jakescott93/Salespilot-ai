"use client";

import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

/**
 * Underline text inputs — no boxes, no native chrome. The line warms to
 * champagne on focus; error text is calm and complete-sentence.
 */

export function TextField({
  label,
  error,
  optional,
  className,
  id,
  ...props
}: {
  label: string;
  error?: string;
  optional?: boolean;
} & ComponentProps<"input">) {
  const fieldId = id ?? `f-${label.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <div className={className}>
      <label htmlFor={fieldId} className="flex items-baseline gap-3">
        <span className="type-label-sm text-ink-soft">{label}</span>
        {optional && (
          <span className="text-[0.625rem] font-light tracking-wide2 text-ink-faint">
            Optional
          </span>
        )}
      </label>
      <input
        id={fieldId}
        className={cn("v-field mt-2", error && "border-accent")}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        {...props}
      />
      {error && (
        <p
          id={`${fieldId}-error`}
          className="mt-3 text-[0.8125rem] font-light text-accent"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function TextArea({
  label,
  error,
  optional,
  className,
  id,
  ...props
}: {
  label?: string;
  error?: string;
  optional?: boolean;
} & ComponentProps<"textarea">) {
  const fieldId =
    id ?? `f-${(label ?? "notes").replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <div className={className}>
      {label && (
        <label htmlFor={fieldId} className="flex items-baseline gap-3">
          <span className="type-label-sm text-ink-soft">{label}</span>
          {optional && (
            <span className="text-[0.625rem] font-light tracking-wide2 text-ink-faint">
              Optional
            </span>
          )}
        </label>
      )}
      <textarea
        id={fieldId}
        rows={5}
        className={cn(
          "mt-2 w-full resize-none rounded-none border border-line-strong/60 bg-transparent px-5 py-4",
          "font-display text-xl font-light leading-relaxed text-ink placeholder:text-ink-faint/70",
          "transition-colors duration-500 focus:border-accent/70",
          error && "border-accent",
        )}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      {error && (
        <p className="mt-3 text-[0.8125rem] font-light text-accent">{error}</p>
      )}
    </div>
  );
}
