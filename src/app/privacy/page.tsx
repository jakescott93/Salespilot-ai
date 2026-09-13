import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = { title: "Privacy — Velmont" };

export default function Page() {
  return (
    <LegalPage
      title="Privacy"
      updated="September 2026"
      sections={[
        {
          heading: "What we hold",
          body: "When you submit a mandate or enquiry we hold the details you give us: your name, contact details, and the specification of what you are looking for or selling. We hold nothing you have not chosen to tell us.",
        },
        {
          heading: "Why we hold it",
          body: "Solely to carry out the work you have asked of us — to search, assess, negotiate and coordinate on your behalf, and to contact you about it in the way you have asked.",
        },
        {
          heading: "Who sees it",
          body: "Mandate details are shared only as far as a search requires, and never in a way that identifies you without your instruction. We do not sell or trade personal information.",
        },
        {
          heading: "How long we keep it",
          body: "For the life of the engagement and as long afterwards as law and good record-keeping require. You may ask us at any time what we hold, ask for a copy, or ask us to delete it.",
        },
        {
          heading: "Your choices",
          body: "You may withdraw consent to be contacted at any time, using any of the contact routes on this site. Doing so ends the mandate but costs you nothing else.",
        },
      ]}
    />
  );
}
