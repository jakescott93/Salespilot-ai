import type { Metadata } from "next";
import { PrivateAccess } from "@/components/flow/PrivateAccess";

export const metadata: Metadata = {
  title: "Private Client Access — Velmont Automotive",
  robots: { index: false },
};

export default function Page() {
  return (
    <div data-theme="automotive" className="bg-ground text-ink">
      <PrivateAccess
        house="automotive"
        housePath="/automotive"
        descriptor="Private Automotive Office"
      />
    </div>
  );
}
