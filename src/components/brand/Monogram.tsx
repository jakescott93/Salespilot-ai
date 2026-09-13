import { cn } from "@/lib/utils";

/**
 * The VELMONT V monogram — an engraved double stroke, drawn to survive
 * embossing, stamping and watermarking. Rendered in currentColor so it
 * takes the ink of wherever it sits.
 */
export function Monogram({
  className,
  title = "VELMONT",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 56"
      className={cn("block", className)}
      role="img"
      aria-label={title}
    >
      <path
        d="M8 4 L32 52 L56 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
      />
      <path
        d="M17.5 4 L32 33 L46.5 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
      />
    </svg>
  );
}
