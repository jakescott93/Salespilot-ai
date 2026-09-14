import { img, site } from "@/content/site";
import { Reveal } from "./Reveal";

/** Full-bleed cinematic image band with a single line — a moment of drama. */
export function Divider() {
  return (
    <section className="relative flex min-h-[70svh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={img.sploaded}
          alt="A loaded sweet potato spud with slow-cooked BBQ pulled pork"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-obsidian/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian" />
      </div>
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="type-label text-ember">{site.descriptor}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="type-hero mt-5 text-bone">Built different since day one.</p>
        </Reveal>
      </div>
    </section>
  );
}

/** Compact teaser linking to the Film page. */
export function FilmTeaser() {
  return (
    <section className="relative overflow-hidden border-y border-ember/15 bg-char">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <Reveal>
            <p className="type-label text-ember">Spüdeli on Film</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="type-title mt-3 max-w-xl text-bone">
              Watch it come off the smoke — real reels &amp; reviews.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <a
            href="/film"
            className="group inline-flex items-center gap-3 rounded-full border border-ember/60 px-7 py-4 text-bone transition-colors duration-300 hover:bg-ember hover:text-obsidian"
          >
            <span className="type-label">Watch the film</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
