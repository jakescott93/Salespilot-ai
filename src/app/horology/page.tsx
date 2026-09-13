import type { Metadata } from "next";
import { HousePage } from "@/components/site/HousePage";
import { horology } from "@/content/horology";

export const metadata: Metadata = {
  title: "Velmont Horology — Private Watch Office",
  description:
    "Rare watches. Exceptional people. Exceptional timepieces, privately acquired.",
};

export default function HorologyPage() {
  return (
    <div data-theme="horology" className="bg-ground text-ink">
      <HousePage content={horology} />
    </div>
  );
}
