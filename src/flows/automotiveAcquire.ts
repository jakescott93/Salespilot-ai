import { manufacturers, modelsByManufacturer, variantsFor } from "@/content/vehicles";
import { email, phone, required } from "./validators";
import { arr, grp, str, type Answers, type FlowConfig } from "./types";

const PRIVATE_BANDS = ["£250k–£500k", "£500k+"];

export const automotiveAcquire: FlowConfig = {
  id: "automotive-acquire",
  house: "automotive",
  kind: "acquisition",
  title: ["The Velmont", "Acquisition Brief"],
  greetingSub: "Let’s find your next car.",
  submitLabel: "Submit Private Mandate",
  privateSubmitLabel: "Submit Private Client Mandate",
  confirmationHeadline: ["Your mandate", "has been received."],
  confirmationBody:
    "A member of the Velmont Private Automotive Office will review your brief and be in touch at the time you suggested.",
  isPrivateMandate: (a) =>
    PRIVATE_BANDS.includes(str(a, "budget")) ||
    str(a, "budgetPosition") === "Budget is secondary to finding the right example.",
  steps: [
    {
      kind: "choice",
      id: "intent",
      label: "The Search",
      question: "What are we looking for?",
      options: [
        "A specific vehicle",
        "Several vehicles I’m considering",
        "Something rare",
        "Replace my current vehicle",
        "Build a collection",
        "I’m not certain — advise me",
      ],
    },
    {
      kind: "select",
      id: "manufacturer",
      label: "Manufacturer",
      question: "Which marque?",
      options: [...manufacturers],
      placeholder: "Begin typing a manufacturer…",
      when: (a) => str(a, "intent") !== "I’m not certain — advise me",
    },
    {
      kind: "select",
      id: "model",
      label: "Model",
      question: "Which model?",
      options: (a) =>
        modelsByManufacturer[str(a, "manufacturer")] ?? ["Other"],
      placeholder: "Begin typing a model…",
      when: (a) =>
        !!str(a, "manufacturer") && str(a, "manufacturer") !== "Other",
    },
    {
      kind: "choice",
      id: "variant",
      label: "Variant",
      question: "Which derivative?",
      options: (a) => variantsFor(str(a, "model")),
      detailOn: ["Other"],
      detailLabel: "Tell us the derivative",
      when: (a) => !!str(a, "model") && str(a, "model") !== "Other",
    },
    {
      kind: "choice",
      id: "year",
      label: "Model Year",
      question: "Which years suit you?",
      options: ["An exact year", "From a year onward", "A range of years", "No preference"],
      detailOn: ["An exact year", "From a year onward", "A range of years"],
      detailLabel: "The year, or range",
    },
    {
      kind: "choice",
      id: "exterior",
      label: "Exterior",
      question: "How should it look?",
      hint: "Choose the family closest to your ideal — you can name the exact colour next.",
      columns: 2,
      options: [
        "Black",
        "Grey",
        "Silver",
        "White",
        "Blue",
        "Green",
        "Red",
        "Special or individual colour",
        "Other",
        "I will consider alternatives",
      ],
      detailOn: ["Black", "Grey", "Silver", "White", "Blue", "Green", "Red", "Special or individual colour", "Other"],
      detailLabel: "The exact colour, if you know it",
      detailOptional: true,
    },
    {
      kind: "group",
      id: "interior",
      label: "Interior",
      question: "And inside?",
      optional: true,
      fields: [
        { id: "colour", label: "Colour", optional: true, placeholder: "Nero, Arancio stitching…" },
        { id: "material", label: "Material", optional: true, placeholder: "Leather, Alcantara, carbon, wood…" },
        { id: "notes", label: "Anything particular", optional: true, placeholder: "Contrast stitching, carbon trim…" },
      ],
    },
    {
      kind: "multi",
      id: "options",
      label: "Specification",
      question: "Which options matter?",
      hint: "Select everything the right example should carry.",
      optional: true,
      options: [
        "Panoramic roof",
        "Carbon exterior",
        "Carbon interior",
        "Premium audio",
        "Rear-wheel steering",
        "Ceramic brakes",
        "Massage seats",
        "Rear entertainment",
        "Performance exhaust",
        "Driver assistance",
        "Specific wheels",
        "Other",
      ],
    },
    {
      kind: "choice",
      id: "mileage",
      label: "Mileage",
      question: "How far may it have travelled?",
      columns: 2,
      options: [
        "Under 5,000 miles",
        "Under 10,000 miles",
        "Under 20,000 miles",
        "Under 30,000 miles",
        "Flexible",
        "A specific figure",
      ],
      detailOn: ["A specific figure"],
      detailLabel: "The figure you have in mind",
    },
    {
      kind: "choice",
      id: "budget",
      label: "Budget",
      question: "Where shall we work?",
      columns: 2,
      options: [
        "£50k–£75k",
        "£75k–£100k",
        "£100k–£150k",
        "£150k–£250k",
        "£250k–£500k",
        "£500k+",
        "A custom figure",
      ],
      detailOn: ["A custom figure"],
      detailLabel: "The figure you have in mind",
    },
    {
      kind: "choice",
      id: "budgetPosition",
      label: "Budget",
      question: "And how firmly?",
      options: [
        "Work within the budget",
        "Budget is secondary to finding the right example.",
      ],
    },
    {
      kind: "choice",
      id: "purchase",
      label: "Purchase",
      question: "How would you prefer to purchase?",
      hint: "A preference only — your advisor will discuss the details with you directly.",
      options: [
        "Cash purchase",
        "Finance may be considered",
        "Business purchase",
        "Unsure — discuss with advisor",
      ],
    },
    {
      kind: "choice",
      id: "timeframe",
      label: "Timeframe",
      question: "When should it arrive?",
      columns: 2,
      options: [
        "Immediately",
        "Within 7 days",
        "Within 30 days",
        "1–3 months",
        "No deadline",
        "Waiting for the right example",
      ],
    },
    {
      kind: "choice",
      id: "tradeIn",
      label: "Disposal",
      question: "Is there a vehicle you may wish to dispose of?",
      options: ["Yes", "No"],
    },
    {
      kind: "group",
      id: "tradeInDetails",
      label: "Disposal",
      question: "Tell us about it.",
      when: (a) => str(a, "tradeIn") === "Yes",
      fields: [
        { id: "manufacturer", label: "Manufacturer", validate: required },
        { id: "model", label: "Model", validate: required },
        { id: "year", label: "Year", validate: required },
        { id: "mileage", label: "Mileage", validate: required },
        { id: "registration", label: "Registration", optional: true },
        { id: "finance", label: "Finance outstanding", optional: true, placeholder: "If any" },
        { id: "expectation", label: "Approximate expectation", optional: true },
      ],
    },
    {
      kind: "upload",
      id: "tradeInPhotos",
      label: "Disposal",
      question: "A few photographs help.",
      optional: true,
      when: (a) => str(a, "tradeIn") === "Yes",
    },
    {
      kind: "choice",
      id: "delivery",
      label: "Delivery",
      question: "How should it reach you?",
      options: [
        "Home delivery",
        "Collection",
        "Enclosed transport",
        "International delivery enquiry",
        "Discuss with advisor",
      ],
    },
    {
      kind: "group",
      id: "location",
      label: "Location",
      question: "Where in the world are you?",
      fields: [
        { id: "city", label: "Town or city", validate: required, autoComplete: "address-level2" },
        { id: "country", label: "Country", validate: required, autoComplete: "country-name" },
      ],
    },
    {
      kind: "group",
      id: "client",
      label: "Your Details",
      question: "How shall we address you?",
      fields: [
        { id: "firstName", label: "First name", validate: required, autoComplete: "given-name" },
        { id: "surname", label: "Surname", validate: required, autoComplete: "family-name" },
        { id: "email", label: "Email", type: "email", validate: email, autoComplete: "email" },
        { id: "mobile", label: "Mobile", type: "tel", validate: phone, autoComplete: "tel" },
      ],
    },
    {
      kind: "choice",
      id: "contactPreference",
      label: "Contact",
      question: "How shall we reach you?",
      options: ["Telephone", "WhatsApp", "Email"],
    },
    {
      kind: "choice",
      id: "bestTime",
      label: "Contact",
      question: "When suits you best?",
      options: ["Morning", "Afternoon", "Evening", "A specific time"],
      detailOn: ["A specific time"],
      detailLabel: "The time that suits",
    },
    {
      kind: "textarea",
      id: "notes",
      label: "In Closing",
      question: "Is there anything we should know that would help us find the right car?",
      optional: true,
      placeholder: "Anything at all — history you value, examples you’ve seen, details that matter.",
    },
  ],
  review: (a: Answers) => {
    const maker = str(a, "manufacturer");
    const model = str(a, "model");
    const variant = str(a, "variant");
    const heroLines =
      maker && maker !== "Other"
        ? [maker, variant && variant !== "Other" ? variant : model || ""]
        : [str(a, "intent") || "Advisory brief"];
    const details = [
      str(a, "yearDetail") || (str(a, "year") === "No preference" ? "" : str(a, "year")),
      str(a, "exteriorDetail") || (str(a, "exterior") === "I will consider alternatives" ? "Open on colour" : str(a, "exterior")),
      grp(a, "interior").colour,
      str(a, "mileageDetail") || str(a, "mileage"),
    ].filter(Boolean) as string[];
    const facts = [
      { label: "Budget", value: str(a, "budgetDetail") || str(a, "budget") },
      { label: "Timeframe", value: str(a, "timeframe") },
      { label: "Delivery", value: str(a, "delivery") },
      str(a, "tradeIn") === "Yes"
        ? {
            label: "Disposal",
            value: [grp(a, "tradeInDetails").manufacturer, grp(a, "tradeInDetails").model]
              .filter(Boolean)
              .join(" "),
          }
        : null,
      arr(a, "options").length
        ? { label: "Specification", value: arr(a, "options").join(" · ") }
        : null,
    ].filter(Boolean) as { label: string; value: string }[];
    return { heroLines: heroLines.filter(Boolean), details, facts };
  },
};
