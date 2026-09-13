import { site } from "@/content/site";
import { Reveal } from "./Reveal";

export function Order() {
  return (
    <section className="relative overflow-hidden bg-ember text-bone">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(50% 80% at 85% 20%, rgba(0,0,0,0.25), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="type-label text-bone/70">Collection &amp; Delivery</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="type-display mt-3 text-bone">
                Order ahead. Ready when you are.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href={site.justEatUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-bone transition-colors duration-300 hover:bg-espresso"
            >
              <span className="type-label">Order on Just Eat</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
