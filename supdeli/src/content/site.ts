/**
 * SUPDELI — single source of truth for all site content.
 *
 * Fields marked `// VERIFY` are PLACEHOLDERS awaiting the real details from
 * Supdeli's Just Eat listing (menu, prices, address, hours, phone). Nothing
 * here should be treated as fact until it is confirmed and the VERIFY note is
 * removed. No menu item, price, or claim has been invented as real.
 */

export const site = {
  name: "Supdeli",
  // A short, honest positioning line. Adjust to the owner's own words.
  tagline: "The neighbourhood deli, done properly.",
  place: "Wirral",
  // VERIFY — full trading address from Just Eat / Companies listing.
  address: {
    line1: "[ Street address ]",
    line2: "[ Town ], Wirral",
    postcode: "[ CH— ]",
  },
  // VERIFY — public contact number from the listing.
  phone: "[ Phone number ]",
  // VERIFY — the live Just Eat menu URL. Order button points here.
  justEatUrl: "https://www.just-eat.co.uk/",
  // Optional secondary ordering platform.
  deliverooUrl: "",
  social: {
    // VERIFY — real handles if they exist.
    instagram: "",
    facebook: "",
  },
  seo: {
    title: "Supdeli — Wirral delicatessen & kitchen",
    description:
      "Supdeli — a Wirral delicatessen serving fresh sandwiches, breakfasts and daily specials. Order for collection or delivery.",
  },
} as const;

export const hero = {
  eyebrow: "Wirral · Delicatessen & Kitchen",
  // Kept factual and generic until the owner's own line is confirmed.
  line1: "Good food,",
  line2: "made close to home.",
  lede:
    "A neighbourhood delicatessen on the Wirral — fresh sandwiches, proper breakfasts and daily specials, made to order and ready when you are.",
} as const;

export const story = {
  eyebrow: "Our Kitchen",
  title: "A deli built on the simple things, done well.",
  // Generic, non-fabricated copy. Replace with the owner's real story.
  paragraphs: [
    "Supdeli is a local kitchen and delicatessen on the Wirral. Everything is prepared fresh through the day — from the morning breakfast rush to lunchtime sandwiches and the specials board.",
    "The idea is uncomplicated: good ingredients, generous portions and a warm welcome. Order ahead for collection, or have it brought to your door.",
  ],
  // Small, honest signals — swap for the real ones you can stand behind.
  marks: [
    { label: "Prepared fresh", detail: "Made to order, daily" },
    { label: "Collection & delivery", detail: "Order online in minutes" },
    { label: "On the Wirral", detail: "Your neighbourhood kitchen" },
  ],
} as const;

/**
 * MENU — PLACEHOLDER STRUCTURE ONLY.
 * The categories and item names below are generic deli fare shown to
 * demonstrate the layout. Prices are intentionally left as "—" because real
 * prices must come from the live Just Eat menu. Replace this whole block with
 * Supdeli's actual menu once provided.
 */
export const menuIsPlaceholder = true;

export const menu = [
  {
    id: "breakfast",
    name: "Breakfast",
    note: "Served through the morning",
    items: [
      { name: "The Full Breakfast", desc: "The classic plate, cooked to order", price: "—" },
      { name: "Breakfast Muffin", desc: "Toasted muffin, your choice of filling", price: "—" },
      { name: "Porridge & Fruit", desc: "Warm oats, seasonal fruit, honey", price: "—" },
    ],
  },
  {
    id: "sandwiches",
    name: "Sandwiches & Subs",
    note: "Freshly made to order",
    items: [
      { name: "Signature Sub", desc: "The house favourite, built to order", price: "—" },
      { name: "Classic Deli Sandwich", desc: "Fresh bread, quality fillings", price: "—" },
      { name: "Toasted Panini", desc: "Pressed hot, choose your filling", price: "—" },
      { name: "Wrap of the Day", desc: "Ask about today's wrap", price: "—" },
    ],
  },
  {
    id: "specials",
    name: "From the Board",
    note: "Changes daily",
    items: [
      { name: "Soup of the Day", desc: "Made fresh, served with bread", price: "—" },
      { name: "Daily Special", desc: "Ask in store or check online", price: "—" },
    ],
  },
  {
    id: "drinks",
    name: "Drinks & Extras",
    note: "",
    items: [
      { name: "Coffee", desc: "Freshly brewed", price: "—" },
      { name: "Cold Drinks", desc: "Range of soft drinks", price: "—" },
      { name: "Cakes & Treats", desc: "A selection at the counter", price: "—" },
    ],
  },
] as const;

// VERIFY — real opening hours from the listing.
export const hours = [
  { day: "Monday", time: "[ — ]" },
  { day: "Tuesday", time: "[ — ]" },
  { day: "Wednesday", time: "[ — ]" },
  { day: "Thursday", time: "[ — ]" },
  { day: "Friday", time: "[ — ]" },
  { day: "Saturday", time: "[ — ]" },
  { day: "Sunday", time: "[ — ]" },
] as const;
