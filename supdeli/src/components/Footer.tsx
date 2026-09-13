import { site } from "@/content/site";
import { Wordmark } from "./Brand";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <a href="#top" className="text-3xl text-bone">
              <Wordmark />
            </a>
            <p className="type-body mt-4 max-w-xs text-sm text-bone/50">
              {site.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href={site.justEatUrl}
              target="_blank"
              rel="noreferrer"
              className="type-label link-underline w-fit text-bone/80 hover:text-bone"
            >
              Order on Just Eat &rarr;
            </a>
            {site.social.instagram && (
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="type-label link-underline w-fit text-bone/80 hover:text-bone"
              >
                Instagram
              </a>
            )}
            {site.social.facebook && (
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="type-label link-underline w-fit text-bone/80 hover:text-bone"
              >
                Facebook
              </a>
            )}
          </div>
        </div>

        <div className="mt-14 hair" />
        <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="type-body text-xs text-bone/40">
            &copy; {year} {site.name}. {site.place}.
          </p>
          <p className="type-body text-xs text-bone/40">
            {site.address.line1}, {site.address.line2} {site.address.postcode}
          </p>
        </div>
      </div>
    </footer>
  );
}
