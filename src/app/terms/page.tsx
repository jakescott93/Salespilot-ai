import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = { title: "Terms — Velmont" };

export default function Page() {
  return (
    <LegalPage
      title="Terms"
      updated="September 2026"
      sections={[
        {
          heading: "What this site is",
          body: "This site describes Velmont’s private sourcing, acquisition and disposal services and lets you open a conversation with us. Submitting a brief or mandate through this site is an enquiry — it does not by itself create a contract, an obligation to buy or sell, or a guarantee that any particular asset can be found or placed.",
        },
        {
          heading: "Engagements",
          body: "Every engagement is agreed individually and set out in writing before anything is committed on your behalf. The written engagement — not this site — governs the work.",
        },
        {
          heading: "Finance",
          body: "Velmont does not itself provide regulated finance. Where you tell us finance may be considered, we record that preference so it can be handled appropriately and compliantly with you directly.",
        },
        {
          heading: "Accuracy",
          body: "We take care that what appears here is accurate, and we do not publish claims we cannot stand behind. Illustrative mandates shown on this site are examples of how we work.",
        },
      ]}
    />
  );
}
