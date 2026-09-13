import type { Metadata } from "next";
import { HousePage } from "@/components/site/HousePage";
import { automotive } from "@/content/automotive";

export const metadata: Metadata = {
  title: "Velmont Automotive — Private Automotive Office",
  description:
    "Exceptional vehicles. Privately acquired. Private vehicle sourcing, acquisition and disposal for discerning clients.",
};

export default function AutomotivePage() {
  return (
    <div data-theme="automotive" className="bg-ground text-ink">
      <HousePage content={automotive} />
    </div>
  );
}
