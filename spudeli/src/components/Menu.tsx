import { menu, site } from "@/content/site";
import { Reveal } from "./Reveal";

export function Menu() {
  return (
    <section id="menu" className="relative bg-obsidian">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-36">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="type-label text-ember">The Menu</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="type-display mt-3 text-bone">
                Everything, off the counter.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="type-body text-sm text-smoke">
              {site.order.minOrder} · {site.order.freeDelivery}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-16 gap-y-16 md:grid-cols-2">
          {menu.map((cat, i) => (
            <Reveal key={cat.id} delay={0.04 + (i % 2) * 0.06}>
              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="type-title text-bone">{cat.name}</h3>
                  {cat.note && (
                    <span className="type-body text-xs italic text-smoke">
                      {cat.note}
                    </span>
                  )}
                </div>
                <div className="mt-3 rule-ember" />
                <ul className="mt-5 space-y-5">
                  {cat.items.map((item) => (
                    <li key={item.name} className="flex items-baseline gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="flex flex-wrap items-center gap-2 font-serif text-lg leading-snug text-bone">
                          {item.name}
                          {item.tag && (
                            <span className="rounded-full border border-ember/40 px-2 py-[1px] font-sans text-[9px] font-semibold uppercase tracking-widest text-ember">
                              {item.tag}
                            </span>
                          )}
                        </p>
                        {item.desc && (
                          <p className="type-body text-sm text-smoke">
                            {item.desc}
                          </p>
                        )}
                      </div>
                      <span className="whitespace-nowrap font-sans text-sm font-semibold text-bone/85">
                        {item.soldOut ? (
                          <span className="text-smoke/60">Sold out</span>
                        ) : (
                          `£${item.price}`
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-14 text-center type-body text-xs text-smoke">
            Menu and availability as listed on The Wirral Bites. Items rotate on
            the hot counter — check online for today&rsquo;s specials.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
