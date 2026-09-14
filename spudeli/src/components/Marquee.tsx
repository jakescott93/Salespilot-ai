import { marquee } from "@/content/site";

export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="relative overflow-hidden border-y border-ember/20 bg-char py-5">
      <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
        {items.map((t, i) => (
          <span key={i} className="flex items-center">
            <span className="type-label mx-7 text-bone/80">{t}</span>
            <span className="text-ember">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
