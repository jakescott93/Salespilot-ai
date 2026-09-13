import type { Metadata } from "next";
import { HorologyAcquireFlow } from "@/components/flow/flows";

export const metadata: Metadata = {
  title: "The Watch Mandate — Velmont Horology",
  description: "Begin an acquisition with the Velmont Private Watch Office.",
  robots: { index: false },
};

export default function Page() {
  return (
    <div data-theme="horology" className="bg-ground text-ink">
      <HorologyAcquireFlow />
    </div>
  );
}
