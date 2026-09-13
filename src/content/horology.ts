import type { HouseContent } from "./types";

export const horology: HouseContent = {
  house: "horology",
  descriptor: "Private Watch Office",
  path: "/horology",
  nav: [
    { label: "Source", href: "/horology/acquire" },
    { label: "Sell", href: "/horology/sell" },
    { label: "The Office", href: "/horology#office" },
    { label: "Private Clients", href: "/horology#private" },
    { label: "Contact", href: "/horology#contact" },
  ],
  cta: { label: "Begin an Acquisition", href: "/horology/acquire" },
  secondaryCta: { label: "Sell a Timepiece", href: "/horology/sell" },
  hero: {
    media: {},
    headline: ["Rare watches.", "Exceptional people."],
    support: "Exceptional timepieces. Privately acquired.",
  },
  difference: {
    headline: ["Time is common.", "The exceptional", "is not."],
    intro:
      "The pieces worth waiting for rarely appear in a window. Velmont works from your reference outward — through collectors, specialists and private channels — until the right example surfaces.",
    capabilities: [
      "Private sourcing",
      "Collector relationships",
      "Rare and discontinued references",
      "Authentication and due diligence coordination",
      "Acquisition",
      "Disposal",
      "Collection building",
    ],
  },
  mandates: {
    label: "Current Mandates",
    note: "A selection of live client instructions. References are shared only as far as discretion allows.",
    items: [
      {
        index: "01",
        maker: "Patek Philippe",
        model: "Nautilus",
        details: ["Discontinued reference", "Full set required", "Unpolished preferred"],
        status: "Active Search",
      },
      {
        index: "02",
        maker: "A. Lange & Söhne",
        model: "Datograph",
        details: ["Platinum", "Excellent condition", "Service history"],
        status: "Private Mandate",
      },
      {
        index: "03",
        maker: "Rolex",
        model: "Daytona",
        details: ["Vintage", "Important provenance"],
        status: "Under Review",
      },
    ],
  },
  process: {
    label: "How Velmont Works",
    steps: [
      {
        index: "01",
        title: "The Reference",
        copy: "Tell us the piece — or the idea of it.",
      },
      {
        index: "02",
        title: "The Search",
        copy: "We work through collectors, specialists and private channels.",
      },
      {
        index: "03",
        title: "The Examination",
        copy: "Condition, originality and provenance are assessed against your mandate.",
      },
      {
        index: "04",
        title: "The Acquisition",
        copy: "We coordinate the agreed acquisition, quietly.",
      },
      {
        index: "05",
        title: "The Presentation",
        copy: "A piece like this deserves a proper arrival.",
      },
      {
        index: "06",
        title: "The Collection",
        copy: "One piece becomes a direction. We keep watch for what belongs next.",
      },
    ],
  },
  privateSection: {
    headline: "Private Clients.",
    intro: "The most interesting pieces change hands quietly.",
    points: [
      "Introductions to pieces offered privately, as they arise",
      "Priority handling of standing mandates",
      "Collection strategy and long-term direction",
      "Discreet disposals between collectors",
      "Private introductions across the collecting world",
    ],
    cta: "Request Private Client Access",
  },
  trust: {
    headline: ["Discretion is not", "an extra.", "It is the standard."],
    points: [
      {
        title: "Private by default",
        copy: "Who is looking, and for what, is nobody else’s business. Mandates are held in strict confidence.",
      },
      {
        title: "Due diligence, coordinated",
        copy: "Authentication and condition assessment are coordinated with carefully selected specialists before any commitment.",
      },
      {
        title: "A transparent process",
        copy: "You see what we are doing on your behalf at every stage, from reference to presentation.",
      },
      {
        title: "Clear documentation",
        copy: "Every engagement is set out in writing before anything is committed on your behalf.",
      },
    ],
  },
  proof: { label: "In Confidence", items: [] },
};
