import { site } from "@/content/site";
import { Reveal } from "./Reveal";
import { Embers } from "./Embers";

const platforms = [
  {
    name: "The Wirral Bites",
    note: "Wirral's local food app",
    href: site.order.wirralBites,
    primary: true,
  },
  { name: "Just Eat", note: "Search Spüdeli, Birkenhead", href: site.order.justEat },
  { name: "Deliveroo", note: "Search Spüdeli, Birkenhead", href: site.order.deliveroo },
];

export function Order() {
  return (
    <section className="relative overflow-hidden bg-char">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 60% at 50% 0%, rgba(224,112,28,0.18), transparent 70%)",
        }}
        aria-hidden
      />
      <Embers count={22} />
      <div className="relative mx-auto max-w-6xl px-5 py-24 text-center md:px-8 md:py-32">
        <Reveal>
          <p className="type-label text-ember">Collection &amp; Delivery</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="type-hero mx-auto mt-4 max-w-3xl text-bone">
            Hungry? It&rsquo;s already on the smoke.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="type-body mx-auto mt-5 max-w-md text-smoke">
            {site.order.minOrder} · {site.order.freeDelivery}. Order for
            collection on Laird Street or delivery across the Wirral.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
          {platforms.map((p, i) => (
            <Reveal key={p.name} delay={0.12 + i * 0.07}>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className={`group flex h-full flex-col items-center justify-center gap-1 rounded-xl px-5 py-6 transition-transform duration-300 hover:-translate-y-1 ${
                  p.primary
                    ? "bg-ember text-obsidian"
                    : "bg-ash text-bone ring-1 ring-bone/10"
                }`}
              >
                <span className="font-serif text-2xl">{p.name}</span>
                <span
                  className={`type-body text-xs ${
                    p.primary ? "text-obsidian/70" : "text-smoke"
                  }`}
                >
                  {p.note}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
