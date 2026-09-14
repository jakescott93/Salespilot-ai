import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Embers } from "@/components/Embers";
import { film, site, img } from "@/content/site";

export const metadata: Metadata = {
  title: "Spüdeli on Film — reels & reviews",
  description:
    "Watch Spüdeli come off the smoke — real reels from @spudeli_ and influencer reviews.",
};

export default function FilmPage() {
  return (
    <>
      <Nav />
      <main>
        {/* header */}
        <section className="relative flex min-h-[62svh] items-end overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <img
              src={img.enterbg}
              alt=""
              aria-hidden
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-obsidian/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/60" />
          </div>
          <Embers count={18} />
          <div className="mx-auto w-full max-w-6xl px-5 pb-16 md:px-8 md:pb-20">
            <Reveal>
              <p className="type-label text-ember">{film.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="type-hero mt-4 max-w-3xl text-bone">{film.title}</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="type-lede mt-5 max-w-xl text-cream">{film.lede}</p>
            </Reveal>
          </div>
        </section>

        {/* reels */}
        <section className="bg-obsidian">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
            <Reveal>
              <p className="type-label text-ember">From the counter · {site.instagramHandle}</p>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {film.reels.map((r, i) => (
                <Reveal key={r.shortcode} delay={0.04 + (i % 3) * 0.06}>
                  <figure className="overflow-hidden rounded-xl bg-ash ring-1 ring-bone/10">
                    <div className="relative w-full" style={{ aspectRatio: "9 / 12" }}>
                      <iframe
                        src={`https://www.instagram.com/reel/${r.shortcode}/embed`}
                        title={r.caption}
                        loading="lazy"
                        allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full border-0"
                      />
                    </div>
                    <figcaption className="px-4 py-3 type-body text-sm text-smoke">
                      {r.caption}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* influencer reviews */}
        <section className="border-t border-ember/15 bg-char">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
            <Reveal>
              <p className="type-label text-ember">Influencer Reviews</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="type-display mt-3 text-bone">As seen around the Wirral.</h2>
            </Reveal>

            {film.youtube.length > 0 ? (
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {film.youtube.map((v) => (
                  <Reveal key={v.id}>
                    <figure className="overflow-hidden rounded-xl ring-1 ring-bone/10">
                      <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
                        <iframe
                          src={`https://www.youtube.com/embed/${v.id}`}
                          title={v.who}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 h-full w-full border-0"
                        />
                      </div>
                      <figcaption className="bg-ash px-4 py-3 type-body text-sm text-smoke">
                        {v.who}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal delay={0.1}>
                <div className="mt-8 max-w-2xl rounded-xl border border-ember/25 bg-ember/5 px-6 py-6">
                  <p className="type-body text-smoke">
                    Reviewed by a Wirral food creator?{" "}
                    <span className="text-bone">We&rsquo;ll feature it here.</span>{" "}
                    Send Spüdeli the link on{" "}
                    <a
                      href={site.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="text-ember link-underline"
                    >
                      Instagram
                    </a>{" "}
                    and it goes straight onto the wall.
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
