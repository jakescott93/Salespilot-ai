import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = { title: "Cookies — Velmont" };

export default function Page() {
  return (
    <LegalPage
      title="Cookies"
      updated="September 2026"
      sections={[
        {
          heading: "What this site stores",
          body: "This site stores a small amount of information on your device to work properly: your progress through a brief (so an accidental refresh loses nothing) and whether you have already seen the opening sequence. Both stay on your device and are never transmitted to us until you choose to submit.",
        },
        {
          heading: "Analytics",
          body: "We measure how the site is used — which stages of a brief are reached and where people leave — without reading the content of what you write. Free-text answers are never collected by analytics.",
        },
        {
          heading: "Your control",
          body: "You can clear this site’s stored data at any time through your browser. The site will simply start fresh.",
        },
      ]}
    />
  );
}
