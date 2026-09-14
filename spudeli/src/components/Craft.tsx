import { craft, img } from "@/content/site";
import { Reveal } from "./Reveal";

export function Craft() {
  return (
    <section id="craft" className="relative bg-obsidian">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-2 md:gap-16 md:px-8 md:py-36">
        {/* image */}
        <Reveal className="order-2 md:order-1">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={img.brisket}
              alt="Slow-smoked beef brisket being sliced"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-bone/10" />
          </div>
        </Reveal>

        {/* copy */}
        <div className="order-1 flex flex-col justify-center md:order-2">
          <Reveal>
            <p className="type-label text-ember">{craft.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="type-display mt-4 text-bone">{craft.title}</h2>
          </Reveal>
          <div className="mt-6 space-y-5">
            {craft.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className="type-body max-w-lg text-smoke">{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {craft.marks.map((m, i) => (
              <Reveal key={m.k} delay={0.15 + i * 0.08}>
                <div className="border-t border-ember/30 pt-4">
                  <p className="font-serif text-xl text-ember">{m.k}</p>
                  <p className="type-body mt-1 text-xs text-smoke">{m.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
