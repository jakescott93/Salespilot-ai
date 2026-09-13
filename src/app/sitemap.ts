import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://velmont.example";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/automotive",
    "/automotive/acquire",
    "/automotive/sell",
    "/automotive/private",
    "/horology",
    "/horology/acquire",
    "/horology/sell",
    "/horology/private",
    "/privacy",
    "/terms",
    "/cookies",
  ].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path.split("/").length > 2 ? 0.6 : 0.9,
  }));
}
