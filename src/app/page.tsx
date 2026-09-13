import type { Metadata } from "next";
import { Gateway } from "@/components/site/Gateway";

export const metadata: Metadata = {
  title: "VELMONT — Exceptional Things. Privately Acquired.",
  description:
    "VELMONT represents private clients in the acquisition and disposal of exceptional assets. Private Automotive Office. Private Watch Office.",
};

export default function Page() {
  return <Gateway />;
}
