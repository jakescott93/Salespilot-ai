import type { Metadata } from "next";
import { HorologySellFlow } from "@/components/flow/flows";

export const metadata: Metadata = {
  title: "Sell a Timepiece — Velmont Horology",
  description:
    "A discreet disposal, handled by the Velmont Private Watch Office.",
  robots: { index: false },
};

export default function Page() {
  return (
    <div data-theme="horology" className="bg-ground text-ink">
      <HorologySellFlow />
    </div>
  );
}
