import { site, hours } from "@/content/site";
import { Reveal } from "./Reveal";

export function Find() {
  return (
    <section id="find" className="relative bg-bone">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-36">
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          {/* Address & contact */}
          <div>
            <Reveal>
              <p className="type-label text-ember">Find Us</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="type-display mt-3 text-ink">
                Your corner of the Wirral.
              </h2>
            </Reveal>

            <div className="mt-10 space-y-8">
              <div>
                <p className="type-label text-stone">Address</p>
                <p className="type-lede mt-2 not-italic text-ink">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.postcode}
                </p>
              </div>
              <div>
                <p className="type-label text-stone">Call</p>
                <p className="type-lede mt-2 not-italic text-ink">
                  {site.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <Reveal>
              <p className="type-label text-ember">Opening Hours</p>
            </Reveal>
            <div className="mt-6 overflow-hidden rounded-lg border border-olive/15">
              {hours.map((h, i) => (
                <div
                  key={h.day}
                  className={`flex items-center justify-between px-5 py-4 ${
                    i % 2 === 0 ? "bg-cream/50" : "bg-transparent"
                  }`}
                >
                  <span className="type-body text-ink">{h.day}</span>
                  <span className="type-body text-stone">{h.time}</span>
                </div>
              ))}
            </div>
            <p className="type-body mt-4 text-xs text-stone">
              Hours to be confirmed from the live listing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
