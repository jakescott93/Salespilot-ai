import { site } from "@/content/site";
import { Wordmark } from "./Brand";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ember/15 bg-obsidian text-bone">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <a href="#top" className="text-4xl text-bone">
              <Wordmark />
            </a>
            <p className="type-lede mt-4 text-smoke">{site.tagline}</p>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href={site.order.wirralBites}
              target="_blank"
              rel="noreferrer"
              className="type-label link-underline w-fit text-bone/80 hover:text-bone"
            >
              Order Online &rarr;
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="type-label link-underline w-fit text-bone/80 hover:text-bone"
            >
              Instagram {site.instagramHandle}
            </a>
          </div>
        </div>

        <div className="mt-14 hair" />
        <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="type-body text-xs text-smoke">
            &copy; {year} {site.name}. {site.descriptor}.
          </p>
          <p className="type-body text-xs text-smoke">
            {site.address.line1}, {site.address.line2} {site.address.postcode}
          </p>
        </div>
      </div>
    </footer>
  );
}
