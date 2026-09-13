import type { House } from "@/content/types";
import type { UploadedImage } from "@/components/ui/Upload";

/**
 * Data-driven mandate flows.
 *
 * Both houses' acquisition and disposal experiences are configurations
 * rendered by one engine (FlowShell). New questions, reordered stages or
 * a whole new flow are content changes, not component surgery — the same
 * boundary a CMS will own later.
 */

export type AnswerValue = string | string[] | Record<string, string> | UploadedImage[];
export type Answers = Record<string, AnswerValue | undefined>;

interface StepBase {
  id: string;
  /** Small tracked eyebrow, e.g. "Manufacturer". */
  label: string;
  /** The advisor's question, set large. */
  question: string;
  hint?: string;
  optional?: boolean;
  /** Conditional stages (e.g. trade-in details only after a yes). */
  when?: (answers: Answers) => boolean;
}

export interface GroupField {
  id: string;
  label: string;
  type?: "text" | "email" | "tel";
  optional?: boolean;
  placeholder?: string;
  autoComplete?: string;
  validate?: (value: string) => string | null;
}

export type FlowStep =
  | (StepBase & {
      kind: "choice";
      options: string[] | ((a: Answers) => string[]);
      columns?: 1 | 2;
      /** When the selection matches, ask for a line of detail. */
      detailOn?: string[];
      detailLabel?: string;
      /** Detail may be left blank (e.g. "the exact colour, if known"). */
      detailOptional?: boolean;
    })
  | (StepBase & {
      kind: "multi";
      options: string[];
    })
  | (StepBase & {
      kind: "select";
      options: string[] | ((a: Answers) => string[]);
      placeholder?: string;
    })
  | (StepBase & {
      kind: "text" | "textarea";
      placeholder?: string;
    })
  | (StepBase & {
      kind: "group";
      fields: GroupField[];
    })
  | (StepBase & {
      kind: "upload";
    });

export interface ReviewSpec {
  /** The composed headline of the brief, e.g. maker over model. */
  heroLines: string[];
  /** Short specification lines beneath it. */
  details: string[];
  /** Labelled facts (budget, timeframe…). */
  facts: { label: string; value: string }[];
}

export interface FlowConfig {
  id: string;
  house: House;
  kind: "acquisition" | "disposal";
  /** e.g. ["The Velmont", "Acquisition Brief"] */
  title: string[];
  greetingSub: string;
  steps: FlowStep[];
  /** High-value mandates quietly change register — never "VIP detected". */
  isPrivateMandate?: (a: Answers) => boolean;
  review: (a: Answers) => ReviewSpec;
  submitLabel: string;
  privateSubmitLabel?: string;
  confirmationHeadline: string[];
  confirmationBody: string;
}

export function str(a: Answers, id: string): string {
  const v = a[id];
  return typeof v === "string" ? v : "";
}

export function arr(a: Answers, id: string): string[] {
  const v = a[id];
  return Array.isArray(v) ? (v as string[]) : [];
}

export function grp(a: Answers, id: string): Record<string, string> {
  const v = a[id];
  return v && typeof v === "object" && !Array.isArray(v)
    ? (v as Record<string, string>)
    : {};
}
