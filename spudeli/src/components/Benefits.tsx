import { benefits, img } from "@/content/site";
import { Reveal } from "./Reveal";

export function Benefits() {
  return (
    <section className="relative bg-char">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-2 md:gap-16 md:px-8 md:py-36">
        <div className="flex flex-col justify-center">
          <Reveal>
            <p className="type-label text-ember">{benefits.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="type-display mt-4 text-bone">{benefits.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="type-lede mt-5 text-smoke">{benefits.lede}</p>
          </Reveal>

          <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {benefits.points.map((p, i) => (
              <Reveal key={p.k} delay={0.12 + i * 0.07}>
                <div className="border-t border-ember/30 pt-4">
                  <p className="font-serif text-2xl text-ember">{p.k}</p>
                  <p className="type-body mt-1 text-sm text-smoke">{p.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="order-first md:order-last">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={img.spbenefit}
              alt="Roasted sweet potatoes with vivid orange flesh"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-bone/10" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
