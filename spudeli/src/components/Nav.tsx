"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Wordmark, Logo } from "./Brand";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#craft", label: "The Craft" },
  { href: "#find", label: "Find Us" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smoke ${
        scrolled
          ? "bg-obsidian/85 backdrop-blur-md border-b border-ember/15"
          : "bg-gradient-to-b from-obsidian/70 to-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="flex items-center gap-3 text-2xl text-bone md:text-3xl">
          <Logo size={38} />
          <Wordmark />
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="type-label link-underline text-bone/75 hover:text-bone"
            >
              {l.label}
            </a>
          ))}
          <a
            href={site.order.wirralBites}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-ember px-5 py-2.5 text-obsidian transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span className="type-label">Order</span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              &rarr;
            </span>
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-bone"
          aria-label="Menu"
          aria-expanded={open}
        >
          <div className="flex flex-col gap-[5px]">
            <span
              className={`h-[1.5px] w-6 bg-bone transition-transform duration-300 ${
                open ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-6 bg-bone transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-6 bg-bone transition-transform duration-300 ${
                open ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      <div
        className={`overflow-hidden border-t border-ember/15 bg-obsidian/95 backdrop-blur-md transition-[max-height] duration-500 ease-smoke md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-6 px-6 py-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="type-title text-bone"
            >
              {l.label}
            </a>
          ))}
          <a
            href={site.order.wirralBites}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-ember px-6 py-3 text-obsidian"
          >
            <span className="type-label">Order Online</span>
            <span>&rarr;</span>
          </a>
        </div>
      </div>
    </header>
  );
}
