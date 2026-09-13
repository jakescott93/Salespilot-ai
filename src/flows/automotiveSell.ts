import { manufacturers, modelsByManufacturer } from "@/content/vehicles";
import { email, phone, required } from "./validators";
import { grp, str, type Answers, type FlowConfig } from "./types";

export const automotiveSell: FlowConfig = {
  id: "automotive-sell",
  house: "automotive",
  kind: "disposal",
  title: ["The Velmont", "Disposal Brief"],
  greetingSub: "Let’s place your car well.",
  submitLabel: "Submit for Private Review",
  confirmationHeadline: ["Securely submitted", "for private review."],
  confirmationBody:
    "A member of the Velmont Private Automotive Office will review the details and be in touch to discuss how best to proceed. Nothing is listed, shared or advertised without your instruction.",
  steps: [
    {
      kind: "choice",
      id: "intent",
      label: "The Instruction",
      question: "How would you like to proceed?",
      options: [
        "A discreet private sale",
        "Sell towards another acquisition",
        "I’d like advice first",
      ],
    },
    {
      kind: "select",
      id: "manufacturer",
      label: "The Vehicle",
      question: "Which marque?",
      options: [...manufacturers],
      placeholder: "Begin typing a manufacturer…",
    },
    {
      kind: "select",
      id: "model",
      label: "The Vehicle",
      question: "Which model?",
      options: (a) => modelsByManufacturer[str(a, "manufacturer")] ?? ["Other"],
      placeholder: "Begin typing a model…",
      when: (a) => !!str(a, "manufacturer") && str(a, "manufacturer") !== "Other",
    },
    {
      kind: "group",
      id: "vehicle",
      label: "The Vehicle",
      question: "The essentials.",
      fields: [
        { id: "variant", label: "Variant or derivative", optional: true },
        { id: "year", label: "Year", validate: required },
        { id: "mileage", label: "Mileage", validate: required },
        { id: "colour", label: "Exterior colour", optional: true },
        { id: "interior", label: "Interior", optional: true },
        { id: "registration", label: "Registration", optional: true },
      ],
    },
    {
      kind: "group",
      id: "history",
      label: "History",
      question: "Its story so far.",
      optional: true,
      fields: [
        { id: "owners", label: "Owners from new", optional: true },
        { id: "service", label: "Service history", optional: true, placeholder: "Full main dealer, specialist…" },
        { id: "condition", label: "Condition notes", optional: true },
        { id: "finance", label: "Finance outstanding", optional: true, placeholder: "If any" },
      ],
    },
    {
      kind: "upload",
      id: "photos",
      label: "Photographs",
      question: "Show us the car.",
      hint: "A handful of honest photographs — exterior, interior, details that matter.",
    },
    {
      kind: "choice",
      id: "expectation",
      label: "Expectation",
      question: "Do you have a figure in mind?",
      options: [
        "I have a figure in mind",
        "I’d like your view first",
      ],
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
        "No urgency — the right buyer matters",
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
      placeholder: "Provenance, cherished plates, anything that matters.",
    },
  ],
  review: (a: Answers) => {
    const v = grp(a, "vehicle");
    return {
      heroLines: [str(a, "manufacturer"), str(a, "model") || v.variant || ""].filter(Boolean),
      details: [v.variant, v.year, v.mileage && `${v.mileage} miles`, v.colour].filter(
        Boolean,
      ) as string[],
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
