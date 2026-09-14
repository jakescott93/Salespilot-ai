import { signatures, site } from "@/content/site";
import { Reveal } from "./Reveal";

export function Signatures() {
  return (
    <section className="relative bg-char">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-36">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="type-label text-ember">The Signatures</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="type-display mt-3 text-bone">
                Straight off the smoke.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href={site.order.wirralBites}
              target="_blank"
              rel="noreferrer"
              className="type-label link-underline text-bone/70 hover:text-bone"
            >
              Order the full menu &rarr;
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {signatures.map((s, i) => (
            <Reveal key={s.name} delay={0.05 + (i % 4) * 0.07}>
              <article className="group relative h-full overflow-hidden rounded-xl bg-ash ring-1 ring-bone/10">
                <div className="relative overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-smoke group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ash via-transparent to-transparent" />
                  <span className="absolute right-3 top-3 rounded-full bg-obsidian/70 px-3 py-1 font-sans text-sm font-semibold text-ember backdrop-blur">
                    £{s.price}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl leading-tight text-bone">
                    {s.name}
                  </h3>
                  <p className="type-body mt-2 text-sm text-smoke">{s.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
