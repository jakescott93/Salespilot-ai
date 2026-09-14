/**
 * Spüdeli wordmark — the umlaut over the "u" is rendered as two glowing
 * ember dots, tying the name to the smokehouse identity.
 */
export function Wordmark({
  className = "",
  emberDots = true,
}: {
  className?: string;
  emberDots?: boolean;
}) {
  return (
    <span
      className={`font-serif font-semibold tracking-tight leading-none ${className}`}
      aria-label="Spüdeli"
    >
      <span aria-hidden>Sp</span>
      <span aria-hidden className="relative inline-block">
        u
        <span className="absolute inset-x-0 -top-[0.18em] mx-auto flex justify-center gap-[0.12em]">
          <span
            className={`block h-[0.11em] w-[0.11em] rounded-full ${
              emberDots ? "bg-ember" : "bg-current"
            }`}
            style={emberDots ? { boxShadow: "0 0 0.35em #E0701C" } : undefined}
          />
          <span
            className={`block h-[0.11em] w-[0.11em] rounded-full ${
              emberDots ? "bg-ember" : "bg-current"
            }`}
            style={emberDots ? { boxShadow: "0 0 0.35em #E0701C" } : undefined}
          />
        </span>
      </span>
      <span aria-hidden>deli</span>
    </span>
  );
}

/** Spüdeli's real logo (their Instagram brand mark), as a circular badge. */
export function Logo({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <img
      src="/img/logo.png"
      alt="Spüdeli"
      width={size}
      height={size}
      className={`rounded-full object-cover ring-1 ring-ember/40 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/** Circular flame monogram badge. */
export function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Spüdeli">
      <circle
        cx="32"
        cy="32"
        r="30.5"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
      <path
        d="M32 15c3 5 7 7 7 13a7 7 0 1 1-14 0c0-2 1-3 2-4 0 3 2 4 3 4 1.5 0 2.5-1 2.5-2.5C32.5 34 29 32 32 15Z"
        fill="#E0701C"
      />
      <text
        x="32"
        y="52"
        textAnchor="middle"
        fontFamily="var(--font-serif), serif"
        fontSize="15"
        fontWeight="600"
        letterSpacing="2"
        fill="currentColor"
      >
        SD
      </text>
    </svg>
  );
}
