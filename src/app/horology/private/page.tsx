import type { Metadata } from "next";
import { PrivateAccess } from "@/components/flow/PrivateAccess";

export const metadata: Metadata = {
  title: "Private Client Access — Velmont Horology",
  robots: { index: false },
};

export default function Page() {
  return (
    <div data-theme="horology" className="bg-ground text-ink">
      <PrivateAccess
        house="horology"
        housePath="/horology"
        descriptor="Private Watch Office"
      />
    </div>
  );
}
