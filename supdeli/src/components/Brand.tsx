export function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Supdeli"
      fill="none"
    >
      <circle
        cx="24"
        cy="24"
        r="22.5"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <text
        x="24"
        y="31"
        textAnchor="middle"
        fontFamily="var(--font-serif), serif"
        fontSize="24"
        fontWeight="600"
        fill="currentColor"
      >
        S
      </text>
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-serif font-semibold tracking-tight ${className}`}
      style={{ fontVariantLigatures: "none" }}
    >
      Sup<span className="text-ember">deli</span>
    </span>
  );
}
