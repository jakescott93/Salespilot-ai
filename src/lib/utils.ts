export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Client-side reference preview only — the server issues the real one. */
export function referencePrefix(house: "automotive" | "horology") {
  return house === "automotive" ? "VA" : "VH";
}
