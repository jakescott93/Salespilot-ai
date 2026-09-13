import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";

export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <div data-theme="automotive" className="min-h-screen bg-ground text-ink">
      <header className="flex items-center justify-between px-5 py-6 sm:px-10">
        <Link href="/" aria-label="Velmont">
          <Wordmark />
        </Link>
        <Link
          href="/"
          className="type-label-sm text-ink-soft transition-colors duration-500 hover:text-ink"
        >
          Close
        </Link>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-20 sm:px-10 sm:py-28">
        <p className="type-label text-accent/80">Velmont</p>
        <h1 className="mt-6 font-display type-title font-light text-ink">{title}</h1>
        <p className="mt-4 text-[0.8125rem] font-light text-ink-faint">
          Last updated {updated}
        </p>
        <div className="mt-16 space-y-14">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="type-label-sm text-ink">{s.heading}</h2>
              <p className="mt-4 text-[0.9375rem] font-light leading-loose text-ink-soft">
                {s.body}
              </p>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
