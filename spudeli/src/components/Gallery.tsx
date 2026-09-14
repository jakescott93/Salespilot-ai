import { gallery, site } from "@/content/site";
import { Reveal } from "./Reveal";

export function Gallery() {
  return (
    <section className="relative bg-obsidian">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-36">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="type-label text-ember">{gallery.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="type-display mt-3 text-bone">{gallery.title}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="type-label link-underline text-bone/70 hover:text-bone"
            >
              {gallery.note} &rarr;
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.shots.map((s, i) => (
            <Reveal key={i} delay={0.05 + (i % 4) * 0.07}>
              <figure className="group relative overflow-hidden rounded-xl ring-1 ring-bone/10">
                <img
                  src={s.image}
                  alt={s.caption}
                  className="aspect-square w-full object-cover transition-transform duration-700 ease-smoke group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 type-body text-sm text-bone">
                  {s.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
