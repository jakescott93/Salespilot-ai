import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

/**
 * The two house calls-to-action.
 *
 * Primary: a hairline-bordered rectangle; on hover an ivory fill rises
 * from the baseline and the label inverts. Secondary: a tracked label
 * over a hairline that draws itself. No gradients, no glow.
 */

type BaseProps = {
  children: ReactNode;
  className?: string;
  tone?: "ivory" | "champagne";
};

function primaryClasses(tone: "ivory" | "champagne") {
  return cn(
    "group relative inline-flex items-center justify-center overflow-hidden",
    "border px-9 py-4 min-h-[52px]",
    "type-label font-light select-none",
    "transition-colors duration-700 ease-velvet",
    tone === "ivory"
      ? "border-ink/40 text-ink hover:text-ground"
      : "border-accent/50 text-accent hover:text-ground",
  );
}

function PrimaryInner({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "ivory" | "champagne";
}) {
  return (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-velvet group-hover:scale-y-100",
          tone === "ivory" ? "bg-ink" : "bg-accent",
        )}
      />
      <span className="relative z-10">{children}</span>
    </>
  );
}

export function CtaLink({
  children,
  className,
  tone = "ivory",
  ...props
}: BaseProps & ComponentProps<typeof Link>) {
  return (
    <Link {...props} className={cn(primaryClasses(tone), className)}>
      <PrimaryInner tone={tone}>{children}</PrimaryInner>
    </Link>
  );
}

export function CtaButton({
  children,
  className,
  tone = "ivory",
  ...props
}: BaseProps & ComponentProps<"button">) {
  return (
    <button {...props} className={cn(primaryClasses(tone), className)}>
      <PrimaryInner tone={tone}>{children}</PrimaryInner>
    </button>
  );
}

export function QuietLink({
  children,
  className,
  ...props
}: { children: ReactNode; className?: string } & ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        "group relative inline-flex flex-col items-start gap-2 pb-1",
        "type-label font-light text-ink-soft hover:text-ink transition-colors duration-500",
        className,
      )}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className="block h-px w-full origin-left scale-x-[0.35] bg-current opacity-50 transition-transform duration-700 ease-velvet group-hover:scale-x-100"
      />
    </Link>
  );
}
