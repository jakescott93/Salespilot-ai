import { site, img } from "@/content/site";
import { Reveal } from "./Reveal";

export function Find() {
  return (
    <section id="find" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={img.interior}
          alt="Inside the Spüdeli smokehouse deli"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-obsidian/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/60 to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-36">
        <div className="max-w-xl">
          <Reveal>
            <p className="type-label text-ember">Find Us</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="type-display mt-3 text-bone">
              On Laird Street, Birkenhead.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <Reveal delay={0.1}>
              <div>
                <p className="type-label text-smoke">Address</p>
                <p className="type-lede mt-2 not-italic text-bone">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.postcode}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div>
                <p className="type-label text-smoke">Opening</p>
                <p className="type-lede mt-2 not-italic text-bone">
                  {site.openLine}
                </p>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="type-label link-underline mt-4 inline-block text-ember"
                >
                  {site.instagramHandle} &rarr;
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <a
              href={site.order.wirralBites}
              target="_blank"
              rel="noreferrer"
              className="group mt-12 inline-flex items-center gap-3 rounded-full bg-ember px-7 py-4 text-obsidian transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="type-label">Order Online</span>
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
