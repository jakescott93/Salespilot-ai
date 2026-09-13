/** Manufacturer and model reference data — CMS-managed later. */

export const manufacturers = [
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Ferrari",
  "Lamborghini",
  "Land Rover",
  "McLaren",
  "Mercedes-AMG",
  "Porsche",
  "Rolls-Royce",
  "Other",
] as const;

export const modelsByManufacturer: Record<string, string[]> = {
  "Aston Martin": ["DB12", "DBX", "Vantage", "DBS", "Valour", "Other"],
  Audi: ["RS6 Avant", "RS7", "R8", "RS Q8", "RS3", "Other"],
  Bentley: ["Continental GT", "Flying Spur", "Bentayga", "Other"],
  BMW: ["M3", "M4", "M5", "M8", "X5 M", "X6 M", "XM", "Other"],
  Ferrari: ["296 GTB", "SF90", "Roma", "Purosangue", "812", "F8", "Other"],
  Lamborghini: ["Urus", "Huracán", "Revuelto", "Aventador", "Other"],
  "Land Rover": ["Range Rover", "Range Rover Sport", "Defender", "Other"],
  McLaren: ["750S", "Artura", "720S", "765LT", "GT", "Other"],
  "Mercedes-AMG": ["G 63", "GT", "SL 63", "C 63", "E 63", "S 63", "Other"],
  Porsche: ["911", "Taycan", "Cayenne", "Panamera", "Macan", "718", "Other"],
  "Rolls-Royce": ["Cullinan", "Ghost", "Spectre", "Phantom", "Other"],
};

export const variantsByModel: Record<string, string[]> = {
  Urus: ["Urus", "Urus S", "Urus Performante", "Urus SE", "Other"],
  "911": ["Carrera", "Carrera S", "GTS", "GT3", "GT3 RS", "Turbo", "Turbo S", "Other"],
  "Range Rover": ["Autobiography", "SV", "First Edition", "Other"],
  "Continental GT": ["Azure", "S", "Speed", "Mulliner", "Other"],
  Cullinan: ["Cullinan", "Black Badge", "Series II", "Other"],
  "G 63": ["G 63", "G 63 Magno Edition", "Grand Edition", "Other"],
  Huracán: ["EVO", "Tecnica", "STO", "Sterrato", "Other"],
};

export function variantsFor(model: string): string[] {
  return (
    variantsByModel[model] ?? [
      "Standard",
      "Performance derivative",
      "Special edition",
      "Not certain",
      "Other",
    ]
  );
}
