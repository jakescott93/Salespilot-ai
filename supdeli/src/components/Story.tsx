import { story } from "@/content/site";
import { Reveal } from "./Reveal";

export function Story() {
  return (
    <section id="story" className="relative bg-espresso text-bone">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-36">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <Reveal>
              <p className="type-label text-ember">{story.eyebrow}</p>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <Reveal delay={0.05}>
              <h2 className="type-display max-w-2xl text-bone">{story.title}</h2>
            </Reveal>

            <div className="mt-8 max-w-xl space-y-5">
              {story.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <p className="type-body text-bone/70">{p}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-bone/10 bg-bone/10 sm:grid-cols-3">
              {story.marks.map((m, i) => (
                <Reveal key={i} delay={0.15 + i * 0.08}>
                  <div className="h-full bg-espresso px-6 py-7">
                    <p className="font-serif text-2xl text-ember">{m.label}</p>
                    <p className="type-body mt-1 text-sm text-bone/60">
                      {m.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
