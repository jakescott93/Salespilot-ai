import Link from "next/link";
import { Monogram } from "@/components/brand/Monogram";
import type { HouseContent } from "@/content/types";

const legal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

export function Footer({ content }: { content: HouseContent }) {
  const links = [
    { label: "Private Clients", href: `${content.path}#private` },
    { label: "Source", href: `${content.path}/acquire` },
    { label: "Sell", href: `${content.path}/sell` },
    { label: "About", href: `${content.path}#office` },
    { label: "Contact", href: `${content.path}#contact` },
  ];

  return (
    <footer id="contact" className="border-t border-line/60 bg-ground">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 py-20 sm:py-28">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Monogram className="h-8 w-9 text-accent/80" />
            <p className="mt-6 font-sans font-light text-sm tracking-wide3 uppercase text-ink">
              Velmont
            </p>
            <p className="mt-2 type-label-sm text-ink-soft">
              {content.descriptor}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-16 gap-y-4 sm:grid-cols-3 lg:grid-cols-1">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="type-label-sm font-light text-ink-soft transition-colors duration-500 hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <ul className="flex gap-8 lg:flex-col lg:gap-4">
              {legal.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="type-label-sm font-light text-ink-faint transition-colors duration-500 hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex gap-8" aria-label="Social">
            <li>
              <a
                href="https://instagram.com"
                rel="noopener noreferrer"
                target="_blank"
                className="type-label-sm font-light text-ink-faint transition-colors duration-500 hover:text-ink"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                rel="noopener noreferrer"
                target="_blank"
                className="type-label-sm font-light text-ink-faint transition-colors duration-500 hover:text-ink"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div className="v-rule mt-20" />

        <p className="mt-14 font-display text-2xl sm:text-3xl font-light leading-snug text-ink-soft">
          Exceptional things.
          <br />
          <span className="text-ink">Privately acquired.</span>
        </p>

        <p className="mt-12 text-[0.6875rem] font-light tracking-wide2 text-ink-faint">
          © {new Date().getFullYear()} Velmont. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
