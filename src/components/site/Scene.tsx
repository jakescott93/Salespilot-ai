"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { HeroMedia, House } from "@/content/types";

/**
 * Hero atmosphere.
 *
 * When the CMS supplies media it renders that (video preferred, poster
 * image otherwise). Until then it composes a cinematic scene in light —
 * dusk over wet stone for Automotive, lamplit deep-green velvet for
 * Horology — with a very slow drift-in. No stock photography, ever.
 */
export function Scene({
  house,
  media,
  className = "",
}: {
  house: House;
  media?: HeroMedia;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: [0.22, 1, 0.36, 1] }}
      >
        {media?.videoSrc ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={media.videoSrc}
            poster={media.imageSrc}
            autoPlay={!reduce}
            muted
            loop
            playsInline
          />
        ) : media?.imageSrc ? (
          <Image
            src={media.imageSrc}
            alt={media.alt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : house === "automotive" ? (
          <AutomotiveScene />
        ) : (
          <HorologyScene />
        )}
      </motion.div>

      {/* Cinematic grade: lifts the type, grounds the base. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75" />
      <div className="absolute inset-0 [background:radial-gradient(120%_90%_at_50%_10%,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}

function AutomotiveScene() {
  return (
    <div className="absolute inset-0 bg-[#08090b]">
      {/* Dusk sky falling to gunmetal */}
      <div className="absolute inset-0 [background:linear-gradient(to_bottom,#11151c_0%,#0b0d11_42%,#060607_70%,#050505_100%)]" />
      {/* Last light on the horizon */}
      <div className="absolute inset-x-0 top-[30%] h-[34%] opacity-70 [background:radial-gradient(85%_100%_at_50%_100%,rgba(64,74,92,0.5)_0%,transparent_65%)]" />
      {/* Warm city lights, low right */}
      <div className="absolute right-0 top-[46%] h-[26%] w-[58%] opacity-60 [background:radial-gradient(70%_100%_at_78%_60%,rgba(212,176,115,0.20)_0%,rgba(212,176,115,0.05)_45%,transparent_70%)]" />
      <div className="absolute left-[8%] top-[52%] h-[10%] w-[30%] opacity-40 [background:radial-gradient(60%_100%_at_40%_50%,rgba(150,160,180,0.16)_0%,transparent_70%)]" />
      {/* Horizon hairline */}
      <div className="absolute inset-x-0 top-[58%] h-px bg-white/[0.07]" />
      {/* Wet stone forecourt — vertical reflections */}
      <div className="absolute inset-x-0 top-[58%] bottom-0 [background:linear-gradient(to_bottom,rgba(30,34,42,0.75)_0%,rgba(8,8,9,0.95)_60%,#050505_100%)]" />
      <div className="absolute right-[6%] top-[58%] bottom-[8%] w-[42%] opacity-25 [background:linear-gradient(to_bottom,rgba(212,176,115,0.30)_0%,transparent_75%)] [mask-image:repeating-linear-gradient(to_right,black_0px,black_2px,transparent_2px,transparent_9px)]" />
      <div className="absolute left-[10%] top-[58%] bottom-[20%] w-[24%] opacity-15 [background:linear-gradient(to_bottom,rgba(170,180,200,0.35)_0%,transparent_70%)] [mask-image:repeating-linear-gradient(to_right,black_0px,black_1px,transparent_1px,transparent_7px)]" />
    </div>
  );
}

function HorologyScene() {
  return (
    <div className="absolute inset-0 bg-[#07120e]">
      {/* Deep green velvet ground */}
      <div className="absolute inset-0 [background:linear-gradient(160deg,#0d221b_0%,#081a14_45%,#050d0a_100%)]" />
      {/* Lamplight falling across the cloth */}
      <div className="absolute left-[10%] top-[12%] h-[65%] w-[55%] opacity-70 [background:radial-gradient(60%_55%_at_40%_40%,rgba(212,176,115,0.16)_0%,rgba(212,176,115,0.04)_50%,transparent_72%)]" />
      {/* A narrow shaft of light, as through a tall window */}
      <div className="absolute left-[58%] top-0 bottom-0 w-[16%] opacity-30 [background:linear-gradient(to_bottom,rgba(246,244,237,0.10)_0%,rgba(246,244,237,0.02)_55%,transparent_85%)] [transform:skewX(-8deg)]" />
      {/* Velvet nap — barely-there vertical texture */}
      <div className="absolute inset-0 opacity-[0.05] [background:repeating-linear-gradient(to_right,rgba(255,255,255,0.4)_0px,transparent_1px,transparent_5px)]" />
      {/* Guilloché suggestion, lower right */}
      <div className="absolute right-[-10%] bottom-[-18%] h-[70%] w-[60%] opacity-[0.10] [background:repeating-radial-gradient(circle_at_70%_80%,rgba(212,176,115,0.5)_0px,transparent_1.5px,transparent_16px)]" />
    </div>
  );
}
