import { cn } from "@/lib/utils";

export function Wordmark({
  descriptor,
  className,
  align = "left",
}: {
  descriptor?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <span
      className={cn(
        "inline-flex flex-col gap-1",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <span className="font-sans font-light text-[0.9375rem] tracking-wide3 text-ink uppercase leading-none">
        Velmont
      </span>
      {descriptor ? (
        <span className="font-sans font-light text-[0.5625rem] tracking-label text-ink-soft uppercase leading-none">
          {descriptor}
        </span>
      ) : null}
    </span>
  );
}
