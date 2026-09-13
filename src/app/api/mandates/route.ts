import { NextRequest, NextResponse } from "next/server";
import { submissionSchema, type Submission, type SubmissionReceipt } from "@/lib/schemas";

export const runtime = "nodejs";

/**
 * Mandate intake.
 *
 * Authoritative validation happens here (zod), whatever the client sent.
 * Spam architecture: a honeypot field ("company"), a minimum-composition
 * time, and a light per-IP rate limit. All three fail quietly — a bot
 * receives a plausible response and nothing is stored.
 */

const MIN_COMPOSE_MS = 15_000;
const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX = 6;

const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5_000) hits.clear();
  return list.length > RATE_MAX;
}

function makeReference(house: Submission["house"]): string {
  const prefix = house === "automotive" ? "VA" : "VH";
  const n = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${n}`;
}

/**
 * Delivery adapter — the single integration point for CRM, notification
 * email, or webhook. Swap the body for an HTTP call when the CRM exists;
 * the shape of `submission` is already CRM-ready (see lib/schemas.ts).
 */
async function deliverMandate(reference: string, submission: Submission) {
  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify({
      type: "velmont.mandate.received",
      reference,
      house: submission.house,
      kind: submission.kind,
      receivedAt: new Date().toISOString(),
      client: { email: submission.client.email },
      stages: Object.keys(submission.answers).length,
    }),
  );
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Please try again." },
      { status: 400 },
    );
  }

  const parsed = submissionSchema.safeParse(json);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { message: first?.message ?? "Please check the details and try again." },
      { status: 422 },
    );
  }

  const submission = parsed.data;
  const reference = makeReference(submission.house);

  // Quiet rejections: bots get a normal-looking receipt, nothing is kept.
  const tooFast = Date.now() - submission.startedAt < MIN_COMPOSE_MS;
  const honeyTripped = !!submission.company;
  if (honeyTripped || tooFast || rateLimited(ip)) {
    const receipt: SubmissionReceipt = {
      reference,
      receivedAt: new Date().toISOString(),
    };
    return NextResponse.json(receipt, { status: 200 });
  }

  await deliverMandate(reference, submission);

  const receipt: SubmissionReceipt = {
    reference,
    receivedAt: new Date().toISOString(),
  };
  return NextResponse.json(receipt, { status: 200 });
}
