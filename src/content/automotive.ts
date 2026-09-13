import type { HouseContent } from "./types";

export const automotive: HouseContent = {
  house: "automotive",
  descriptor: "Private Automotive Office",
  path: "/automotive",
  nav: [
    { label: "Source", href: "/automotive/acquire" },
    { label: "Sell", href: "/automotive/sell" },
    { label: "The Office", href: "/automotive#office" },
    { label: "Private Clients", href: "/automotive#private" },
    { label: "Contact", href: "/automotive#contact" },
  ],
  cta: { label: "Begin an Acquisition", href: "/automotive/acquire" },
  secondaryCta: { label: "Discover Velmont", href: "/automotive#difference" },
  hero: {
    media: {},
    headline: [
      "The car you want",
      "doesn’t need to be",
      "the car everyone can find.",
    ],
    support:
      "Private vehicle sourcing, acquisition and disposal for discerning clients.",
  },
  difference: {
    headline: ["We don’t sell", "what we have.", "We find", "what you want."],
    intro:
      "Velmont holds no forecourt and carries no inventory to move. Each engagement begins with your specification — and ends when the right example is in your hands.",
    capabilities: [
      "Client-led sourcing",
      "National and international network",
      "Specification-led search",
      "Market intelligence",
      "Negotiation",
      "Due diligence coordination",
      "Acquisition",
      "Delivery coordination",
      "Disposal",
    ],
  },
  mandates: {
    label: "Current Mandates",
    note: "A selection of live client instructions. Details are shared only as far as discretion allows.",
    items: [
      {
        index: "01",
        maker: "Lamborghini",
        model: "Urus S",
        details: ["2023 or later", "Grigio", "Nero interior", "High specification"],
        status: "Active Search",
      },
      {
        index: "02",
        maker: "Porsche",
        model: "911 GT3",
        details: ["PTS preferred", "Low mileage", "Exceptional provenance"],
        status: "Private Mandate",
      },
      {
        index: "03",
        maker: "Range Rover",
        model: "SV",
        details: ["Bespoke specification"],
        status: "Acquisition",
      },
    ],
  },
  process: {
    label: "How Velmont Works",
    steps: [
      {
        index: "01",
        title: "The Brief",
        copy: "Tell us precisely what you’re looking for.",
      },
      {
        index: "02",
        title: "The Search",
        copy: "Our network searches the market and private channels.",
      },
      {
        index: "03",
        title: "The Assessment",
        copy: "We assess suitable opportunities against your mandate.",
      },
      {
        index: "04",
        title: "The Acquisition",
        copy: "We coordinate the agreed acquisition process.",
      },
      {
        index: "05",
        title: "The Handover",
        copy: "Delivery should feel like an occasion.",
      },
      {
        index: "06",
        title: "The Relationship",
        copy: "When you’re ready for what’s next, we’re already here.",
      },
    ],
  },
  privateSection: {
    headline: "Private Clients.",
    intro: "Not everything needs to be publicly advertised.",
    points: [
      "Introductions to off-market opportunities as they arise",
      "Priority handling of standing mandates",
      "Assistance shaping and maintaining a collection",
      "Discreet disposals, handled without publicity",
      "Private introductions across our professional network",
    ],
    cta: "Request Private Client Access",
  },
  trust: {
    headline: ["Discretion is not", "an extra.", "It is the standard."],
    points: [
      {
        title: "Private by default",
        copy: "Client information and mandate details are held in confidence and shared only as a search requires.",
      },
      {
        title: "A transparent process",
        copy: "You see what we are doing on your behalf at every stage, from first brief to handover.",
      },
      {
        title: "Careful partners",
        copy: "Inspection, transport and documentation are coordinated with carefully selected professional partners.",
      },
      {
        title: "Clear documentation",
        copy: "Every engagement is set out in writing before anything is committed on your behalf.",
      },
    ],
  },
  proof: { label: "In Confidence", items: [] },
};
