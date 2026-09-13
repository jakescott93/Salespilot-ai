/** Manufacture and collection reference data — CMS-managed later. */

export const manufactures = [
  "Rolex",
  "Patek Philippe",
  "Audemars Piguet",
  "Richard Mille",
  "Vacheron Constantin",
  "F.P. Journe",
  "A. Lange & Söhne",
  "Cartier",
  "Omega",
  "Other",
] as const;

export const collectionsByManufacture: Record<string, string[]> = {
  Rolex: [
    "Daytona",
    "Submariner",
    "GMT-Master II",
    "Datejust",
    "Day-Date",
    "Sky-Dweller",
    "Explorer",
    "Other",
  ],
  "Patek Philippe": [
    "Nautilus",
    "Aquanaut",
    "Calatrava",
    "Grand Complications",
    "Complications",
    "Golden Ellipse",
    "Other",
  ],
  "Audemars Piguet": [
    "Royal Oak",
    "Royal Oak Offshore",
    "Royal Oak Concept",
    "Code 11.59",
    "Other",
  ],
  "Richard Mille": ["RM 011", "RM 035", "RM 055", "RM 67", "RM 72", "Other"],
  "Vacheron Constantin": [
    "Overseas",
    "Patrimony",
    "Traditionnelle",
    "Historiques",
    "Other",
  ],
  "F.P. Journe": [
    "Chronomètre Bleu",
    "Chronomètre à Résonance",
    "Tourbillon Souverain",
    "Élégante",
    "Other",
  ],
  "A. Lange & Söhne": [
    "Lange 1",
    "Datograph",
    "Zeitwerk",
    "Saxonia",
    "Odysseus",
    "Other",
  ],
  Cartier: ["Tank", "Santos", "Crash", "Cloche", "Pebble", "Other"],
  Omega: ["Speedmaster", "Seamaster", "Constellation", "De Ville", "Other"],
};

export function collectionsFor(manufacture: string): string[] {
  return collectionsByManufacture[manufacture] ?? ["Other"];
}
