import type { Metadata } from "next";
import { AutomotiveAcquireFlow } from "@/components/flow/flows";

export const metadata: Metadata = {
  title: "The Acquisition Brief — Velmont Automotive",
  description:
    "Begin an acquisition with the Velmont Private Automotive Office.",
  robots: { index: false },
};

export default function Page() {
  return (
    <div data-theme="automotive" className="bg-ground text-ink">
      <AutomotiveAcquireFlow />
    </div>
  );
}
