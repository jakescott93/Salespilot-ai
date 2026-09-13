import type { Metadata } from "next";
import { AutomotiveSellFlow } from "@/components/flow/flows";

export const metadata: Metadata = {
  title: "Sell a Vehicle — Velmont Automotive",
  description:
    "A discreet disposal, handled by the Velmont Private Automotive Office.",
  robots: { index: false },
};

export default function Page() {
  return (
    <div data-theme="automotive" className="bg-ground text-ink">
      <AutomotiveSellFlow />
    </div>
  );
}
