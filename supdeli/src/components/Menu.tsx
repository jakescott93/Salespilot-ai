import { menu, menuIsPlaceholder, site } from "@/content/site";
import { Reveal } from "./Reveal";

export function Menu() {
  return (
    <section id="menu" className="relative bg-bone">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-36">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="type-label text-ember">The Menu</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="type-display mt-3 text-ink">
                Fresh through the day.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href={site.justEatUrl}
              target="_blank"
              rel="noreferrer"
              className="type-label link-underline text-ink/70 hover:text-ink"
            >
              Full menu &amp; prices on Just Eat &rarr;
            </a>
          </Reveal>
        </div>

        {menuIsPlaceholder && (
          <Reveal delay={0.1}>
            <div className="mt-8 flex items-start gap-3 rounded-lg border border-ember/30 bg-ember/5 px-5 py-4">
              <span className="mt-0.5 text-ember">&#9679;</span>
              <p className="type-body text-sm text-stone">
                <span className="font-semibold text-ink">Sample layout.</span>{" "}
                The categories below show how the menu will look. Supdeli&rsquo;s
                real items and prices from Just Eat will be dropped in here.
              </p>
            </div>
          </Reveal>
        )}

        <div className="mt-14 grid gap-x-16 gap-y-16 md:grid-cols-2">
          {menu.map((cat, i) => (
            <Reveal key={cat.id} delay={0.05 + (i % 2) * 0.06}>
              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="type-title text-ink">{cat.name}</h3>
                  {cat.note && (
                    <span className="type-body text-xs italic text-stone">
                      {cat.note}
                    </span>
                  )}
                </div>
                <div className="mt-3 rule" />
                <ul className="mt-5 space-y-5">
                  {cat.items.map((item) => (
                    <li key={item.name} className="flex items-baseline gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="font-serif text-lg leading-snug text-ink">
                          {item.name}
                        </p>
                        <p className="type-body text-sm text-stone">
                          {item.desc}
                        </p>
                      </div>
                      <span
                        className="font-sans text-sm font-semibold text-ink/80"
                        aria-label="price"
                      >
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
