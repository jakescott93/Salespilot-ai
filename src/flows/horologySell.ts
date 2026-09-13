import { manufactures, collectionsFor } from "@/content/watches";
import { email, phone, required } from "./validators";
import { grp, str, type Answers, type FlowConfig } from "./types";

export const horologySell: FlowConfig = {
  id: "horology-sell",
  house: "horology",
  kind: "disposal",
  title: ["The Velmont", "Disposal Mandate"],
  greetingSub: "Let’s place the piece well.",
  submitLabel: "Submit for Private Review",
  confirmationHeadline: ["Securely submitted", "for private review."],
  confirmationBody:
    "A member of the Velmont Private Watch Office will review the details and be in touch to discuss how best to proceed. Nothing is offered, shared or advertised without your instruction.",
  steps: [
    {
      kind: "choice",
      id: "intent",
      label: "The Instruction",
      question: "How would you like to proceed?",
      options: [
        "A discreet private sale",
        "Sell or trade towards another piece",
        "I’d like advice first",
      ],
    },
    {
      kind: "select",
      id: "manufacture",
      label: "The Piece",
      question: "Which manufacture?",
      options: [...manufactures],
      placeholder: "Begin typing a manufacture…",
    },
    {
      kind: "select",
      id: "collection",
      label: "The Piece",
      question: "Which collection?",
      options: (a) => collectionsFor(str(a, "manufacture")),
      placeholder: "Begin typing…",
      when: (a) => !!str(a, "manufacture") && str(a, "manufacture") !== "Other",
    },
    {
      kind: "group",
      id: "piece",
      label: "The Piece",
      question: "The essentials.",
      fields: [
        { id: "reference", label: "Reference", optional: true },
        { id: "year", label: "Year", optional: true },
        { id: "condition", label: "Condition", validate: required, placeholder: "Unworn, excellent, worn…" },
        { id: "set", label: "Box and papers", validate: required, placeholder: "Full set, box only, watch only…" },
        { id: "service", label: "Service history", optional: true },
      ],
    },
    {
      kind: "upload",
      id: "photos",
      label: "Photographs",
      question: "Show us the piece.",
      hint: "Dial, case, bracelet, and the set — natural light is kindest.",
    },
    {
      kind: "choice",
      id: "expectation",
      label: "Expectation",
      question: "Do you have a figure in mind?",
      options: ["I have a figure in mind", "I’d like your view first"],
      detailOn: ["I have a figure in mind"],
      detailLabel: "The figure",
    },
    {
      kind: "choice",
      id: "timeframe",
      label: "Timeframe",
      question: "How quickly would you like this handled?",
      options: [
        "As soon as possible",
        "Within 30 days",
        "1–3 months",
        "No urgency — the right home matters",
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
      kind: "textarea",
      id: "notes",
      label: "In Closing",
      question: "Anything else we should know?",
      optional: true,
      placeholder: "Provenance, originality, the story it carries.",
    },
  ],
  review: (a: Answers) => {
    const p = grp(a, "piece");
    return {
      heroLines: [str(a, "manufacture"), str(a, "collection")].filter(Boolean),
      details: [p.reference, p.year, p.condition, p.set].filter(Boolean) as string[],
      facts: [
        {
          label: "Expectation",
          value: str(a, "expectationDetail") || str(a, "expectation"),
        },
        { label: "Timeframe", value: str(a, "timeframe") },
        { label: "Instruction", value: str(a, "intent") },
      ].filter((f) => f.value),
    };
  },
};
