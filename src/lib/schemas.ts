import { z } from "zod";

/**
 * Mandate schemas — shared by the client (draft typing) and the server
 * (authoritative validation in /api/mandates). Structured for later CRM
 * mapping: every flow submits { house, kind, answers, client, consent }.
 */

const trimmed = z.string().trim();
const shortText = trimmed.max(200);
const longText = trimmed.max(4000);

export const clientSchema = z.object({
  firstName: shortText.min(1, "Please complete this detail before continuing."),
  surname: shortText.min(1, "Please complete this detail before continuing."),
  email: trimmed
    .email("Please check this email address.")
    .max(254),
  mobile: trimmed
    .min(7, "Please check this telephone number.")
    .max(32)
    .regex(/^[+()\d\s.-]+$/, "Please check this telephone number."),
  contactPreference: shortText.optional(),
  bestTime: shortText.optional(),
});

export type ClientDetails = z.infer<typeof clientSchema>;

/** Flow answers are a flat map of stepId -> value; values are constrained. */
export const answerValue = z.union([
  shortText,
  longText,
  z.array(shortText).max(40),
  z.record(shortText, z.union([shortText, longText])),
]);

export const answersSchema = z.record(z.string().max(64), answerValue);

export const submissionSchema = z.object({
  house: z.enum(["automotive", "horology"]),
  kind: z.enum(["acquisition", "disposal", "private-access", "consultation"]),
  answers: answersSchema,
  client: clientSchema,
  consent: z.literal(true, {
    errorMap: () => ({
      message: "Please confirm you are happy for us to hold these details.",
    }),
  }),
  /** Anti-spam: honeypot must stay empty; startedAt gates instant bots. */
  company: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.number().int().positive(),
});

export type Submission = z.infer<typeof submissionSchema>;

export interface SubmissionReceipt {
  reference: string;
  receivedAt: string;
}
