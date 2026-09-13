"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Monogram } from "@/components/brand/Monogram";
import { ProgressLine, ProgressTrail } from "@/components/ui/ProgressTrail";
import { ChoiceList, MultiChoice, ConsentMark } from "@/components/ui/Choice";
import { SearchSelect } from "@/components/ui/Select";
import { TextField, TextArea } from "@/components/ui/Field";
import { ImageUpload, type UploadedImage } from "@/components/ui/Upload";
import { CtaButton } from "@/components/ui/Cta";
import { useDraft } from "@/lib/useDraft";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { COMPLETE } from "@/flows/validators";
import { grp, str, type Answers, type FlowConfig, type FlowStep } from "@/flows/types";

const EASE = [0.22, 1, 0.36, 1] as const;

type Phase = "greeting" | "steps" | "review" | "done";

function greetingFor(hour: number) {
  if (hour < 12) return "Good morning.";
  if (hour < 18) return "Good afternoon.";
  return "Good evening.";
}

/**
 * The full-screen mandate experience. One question at a time, in the
 * voice of a private client advisor; progress as a drawn trail; drafts
 * persisted locally; a composed review; a quiet confirmation.
 */
export function FlowShell({
  flow,
  housePath,
  descriptor,
}: {
  flow: FlowConfig;
  housePath: string;
  descriptor: string;
}) {
  const reduce = useReducedMotion();
  const { draft, update, clear, hydrated } = useDraft(flow.id);
  const [phase, setPhase] = useState<Phase>("greeting");
  const [direction, setDirection] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [consult, setConsult] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [greeting, setGreeting] = useState("Good evening.");
  const autoRef = useRef<number | null>(null);
  const startedRef = useRef(false);
  const doneRef = useRef(false);

  useEffect(() => setGreeting(greetingFor(new Date().getHours())), []);

  const answers = draft.answers as Answers;

  const visibleSteps = useMemo(
    () => flow.steps.filter((s) => !s.when || s.when(answers)),
    [flow.steps, answers],
  );
  const stepIndex = Math.min(draft.step, Math.max(visibleSteps.length - 1, 0));
  const step = visibleSteps[stepIndex];

  const eventBase = flow.kind === "acquisition" ? "source" : "sell";

  /* Abandonment: fires only if the client leaves mid-flow. */
  useEffect(() => {
    const onLeave = () => {
      if (startedRef.current && !doneRef.current) {
        track(`${eventBase}_abandoned` as never, {
          house: flow.house,
          flow: flow.id,
          stage: visibleSteps[stepIndex]?.id,
        });
      }
    };
    window.addEventListener("pagehide", onLeave);
    return () => window.removeEventListener("pagehide", onLeave);
  }, [eventBase, flow.house, flow.id, stepIndex, visibleSteps]);

  useEffect(
    () => () => {
      if (autoRef.current) window.clearTimeout(autoRef.current);
    },
    [],
  );

  const setAnswer = useCallback(
    (id: string, value: Answers[string]) => {
      setError(null);
      update((d) => ({ ...d, answers: { ...d.answers, [id]: value } }));
    },
    [update],
  );

  const begin = () => {
    startedRef.current = true;
    track(`${eventBase}_started` as never, { house: flow.house, flow: flow.id });
    setDirection(1);
    setPhase("steps");
    track(`${eventBase}_step_viewed` as never, {
      house: flow.house,
      flow: flow.id,
      stage: visibleSteps[0]?.id,
      position: 1,
    });
  };

  const validate = (s: FlowStep): string | null => {
    if (s.optional) return null;
    const v = answers[s.id];
    switch (s.kind) {
      case "choice": {
        const chosen = typeof v === "string" ? v : "";
        if (!chosen) return COMPLETE;
        if (s.detailOn?.includes(chosen) && !s.detailOptional) {
          if (!str(answers, `${s.id}Detail`).trim()) return COMPLETE;
        }
        return null;
      }
      case "select":
      case "text":
        return typeof v === "string" && v.trim() ? null : COMPLETE;
      case "textarea":
        return typeof v === "string" && v.trim() ? null : COMPLETE;
      case "multi":
        return Array.isArray(v) && v.length > 0 ? null : COMPLETE;
      case "upload":
        return Array.isArray(v) && v.length > 0
          ? null
          : "Please add at least one photograph before continuing.";
      case "group": {
        const g = grp(answers, s.id);
        for (const f of s.fields) {
          const fv = g[f.id] ?? "";
          if (f.validate) {
            const err = f.validate(fv);
            if (err) return err;
          } else if (!f.optional && !fv.trim()) {
            return COMPLETE;
          }
        }
        return null;
      }
    }
  };

  const goTo = (next: number, dir: 1 | -1) => {
    setDirection(dir);
    setError(null);
    if (next >= visibleSteps.length) {
      setPhase("review");
      window.scrollTo({ top: 0 });
      return;
    }
    update({ step: next });
    track(`${eventBase}_step_viewed` as never, {
      house: flow.house,
      flow: flow.id,
      stage: visibleSteps[next]?.id,
      position: next + 1,
    });
    window.scrollTo({ top: 0 });
  };

  const advance = () => {
    if (!step) return;
    const err = validate(step);
    if (err) {
      setError(err);
      return;
    }
    goTo(stepIndex + 1, 1);
  };

  const retreat = () => {
    if (phase === "review") {
      setPhase("steps");
      setDirection(-1);
      return;
    }
    if (stepIndex === 0) {
      setPhase("greeting");
      return;
    }
    goTo(stepIndex - 1, -1);
  };

  const choiceSelect = (s: Extract<FlowStep, { kind: "choice" }>, value: string) => {
    setAnswer(s.id, value);
    const needsDetail = s.detailOn?.includes(value);
    if (!needsDetail) {
      if (autoRef.current) window.clearTimeout(autoRef.current);
      autoRef.current = window.setTimeout(() => {
        // Recompute nothing — the answer is already stored; drift forward.
        goTo(stepIndex + 1, 1);
      }, 550);
    }
  };

  const submit = async () => {
    if (!consent) {
      setError("Please confirm you are happy for us to hold these details.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const client = grp(answers, "client");
      const sanitized: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(answers)) {
        if (k === "client") continue;
        if (Array.isArray(v) && v.length && typeof v[0] === "object") {
          sanitized[k] = (v as UploadedImage[]).map(
            (img) => `${img.name} (${Math.round(img.size / 1024)}kb)`,
          );
        } else if (v !== undefined) {
          sanitized[k] = v;
        }
      }
      if (consult) sanitized.privateConsultationRequested = "Yes";

      const res = await fetch("/api/mandates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          house: flow.house,
          kind: flow.kind,
          answers: sanitized,
          client: {
            firstName: client.firstName ?? "",
            surname: client.surname ?? "",
            email: client.email ?? "",
            mobile: client.mobile ?? "",
            contactPreference: str(answers, "contactPreference") || undefined,
            bestTime:
              str(answers, "bestTimeDetail") || str(answers, "bestTime") || undefined,
          },
          consent: true,
          company: "",
          startedAt: draft.startedAt,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          message?: string;
        } | null;
        throw new Error(
          body?.message ??
            "Something didn’t settle. Nothing has been lost — please try again.",
        );
      }
      const receipt = (await res.json()) as { reference: string };
      doneRef.current = true;
      setReference(receipt.reference);
      track(`${eventBase}_completed` as never, {
        house: flow.house,
        flow: flow.id,
        privateMandate: isPrivate,
      });
      if (consult) {
        track("consultation_requested", { house: flow.house, flow: flow.id });
      }
      clear();
      setPhase("done");
      window.scrollTo({ top: 0 });
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Something didn’t settle. Nothing has been lost — please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const isPrivate = flow.isPrivateMandate?.(answers) ?? false;
  const review = flow.review(answers);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, y: reduce ? 0 : dir * 44 }),
    center: { opacity: 1, y: 0 },
    exit: (dir: number) => ({ opacity: 0, y: reduce ? 0 : dir * -34 }),
  };

  return (
    <div className="flex min-h-[100svh] flex-col bg-ground">
      {/* Chrome */}
      <header className="flex items-center justify-between px-5 py-6 sm:px-10">
        <Link href={housePath} aria-label={`Return to Velmont ${descriptor}`}>
          <Wordmark descriptor={descriptor} />
        </Link>
        <Link
          href={housePath}
          className="type-label-sm text-ink-soft transition-colors duration-500 hover:text-ink"
        >
          Close
        </Link>
      </header>

      {phase !== "greeting" && phase !== "done" && (
        <div className="px-5 sm:px-10">
          <ProgressTrail
            total={visibleSteps.length}
            current={phase === "review" ? visibleSteps.length - 1 : stepIndex}
            className="max-w-full overflow-x-auto pb-2"
          />
          {visibleSteps.length > 8 && (
            <ProgressLine
              total={visibleSteps.length}
              current={phase === "review" ? visibleSteps.length - 1 : stepIndex}
              className="max-w-[280px] pb-2"
            />
          )}
        </div>
      )}

      <main className="flex flex-1 flex-col justify-center px-5 py-14 sm:px-10">
        <div className="mx-auto w-full max-w-3xl">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            {/* ---------------------------- Greeting ---------------------------- */}
            {phase === "greeting" && (
              <motion.div
                key="greeting"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <p className="type-label text-accent/80">
                  {flow.title.join(" — ")}
                </p>
                <h1 className="mt-10 font-display type-question font-light text-ink">
                  {greeting}
                  <span className="mt-3 block text-ink-soft">
                    {flow.greetingSub}
                  </span>
                </h1>
                <p className="mt-10 max-w-md text-[0.9375rem] font-light leading-relaxed text-ink-soft">
                  A few considered questions, at your pace. Your answers are
                  kept on this device until you choose to send them — leaving
                  and returning loses nothing.
                </p>
                {hydrated && Object.keys(answers).length > 0 && (
                  <p className="mt-6 text-[0.8125rem] font-light text-accent/90">
                    We’ve kept where you left off.
                  </p>
                )}
                <div className="mt-14">
                  <CtaButton tone="champagne" onClick={begin}>
                    {Object.keys(answers).length > 0 ? "Continue" : "Begin"}
                  </CtaButton>
                </div>
              </motion.div>
            )}

            {/* ------------------------------ Steps ----------------------------- */}
            {phase === "steps" && step && (
              <motion.div
                key={step.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: EASE }}
              >
                <p className="type-label-sm text-accent/80">{step.label}</p>
                <h2 className="mt-6 font-display type-question font-light text-ink">
                  {step.question}
                </h2>
                {step.hint && (
                  <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-ink-soft">
                    {step.hint}
                  </p>
                )}

                <div className="mt-12">
                  <StepBody
                    step={step}
                    answers={answers}
                    setAnswer={setAnswer}
                    onChoice={choiceSelect}
                    onEnter={advance}
                  />
                </div>

                <div aria-live="polite">
                  {error && (
                    <p className="mt-8 text-[0.875rem] font-light text-accent">
                      {error}
                    </p>
                  )}
                </div>

                <div className="mt-14 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={retreat}
                    className="type-label-sm text-ink-faint transition-colors duration-500 hover:text-ink"
                  >
                    Back
                  </button>
                  <CtaButton onClick={advance}>
                    {step.optional ? "Continue" : "Next"}
                  </CtaButton>
                </div>
              </motion.div>
            )}

            {/* ------------------------------ Review ---------------------------- */}
            {phase === "review" && (
              <motion.div
                key="review"
                initial={reduce ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <p className="type-label text-accent/80">
                  {isPrivate
                    ? "Private Client Mandate"
                    : flow.kind === "acquisition"
                      ? `Your ${flow.title[1]}`
                      : "For Private Review"}
                </p>

                <div className="mt-12 border-l border-accent/40 pl-8 sm:pl-12">
                  <h2 className="font-display type-display font-light text-ink">
                    {review.heroLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h2>
                  {review.details.length > 0 && (
                    <ul className="mt-8 space-y-1.5">
                      {review.details.map((d) => (
                        <li
                          key={d}
                          className="font-display text-xl font-light text-ink-soft"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <dl className="mt-14 grid gap-x-12 gap-y-8 sm:grid-cols-2">
                  {review.facts.map((f) => (
                    <div key={f.label}>
                      <dt className="type-label-sm text-ink-faint">{f.label}</dt>
                      <dd className="mt-2 font-display text-2xl font-light text-ink">
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {isPrivate && flow.kind === "acquisition" && (
                  <div className="mt-14 border-t border-line/60 pt-10">
                    <p className="max-w-md text-[0.9375rem] font-light leading-relaxed text-ink-soft">
                      A mandate of this nature is handled personally. If you
                      would like to speak before we begin, we’ll arrange it.
                    </p>
                    <div className="mt-6">
                      <ConsentMark checked={consult} onChange={setConsult}>
                        Request a private consultation
                      </ConsentMark>
                    </div>
                  </div>
                )}

                <div className="mt-12 border-t border-line/60 pt-10">
                  <ConsentMark checked={consent} onChange={setConsent}>
                    I’m happy for Velmont to hold these details and contact me
                    about this mandate. Details are never shared beyond what
                    the search requires.
                  </ConsentMark>
                </div>

                {/* Honeypot — invisible to people, tempting to bots. */}
                <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
                  <label>
                    Company
                    <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div aria-live="polite">
                  {error && (
                    <p className="mt-8 text-[0.875rem] font-light text-accent">
                      {error}
                    </p>
                  )}
                </div>

                <div className="mt-14 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={retreat}
                    className="type-label-sm text-ink-faint transition-colors duration-500 hover:text-ink"
                  >
                    Back
                  </button>
                  <CtaButton
                    tone="champagne"
                    onClick={submit}
                    disabled={submitting}
                    className={cn(submitting && "opacity-60 pointer-events-none")}
                  >
                    {submitting
                      ? "Sending…"
                      : isPrivate && flow.privateSubmitLabel
                        ? flow.privateSubmitLabel
                        : flow.submitLabel}
                  </CtaButton>
                </div>
              </motion.div>
            )}

            {/* --------------------------- Confirmation ------------------------- */}
            {phase === "done" && (
              <motion.div
                key="done"
                className="flex flex-col items-center text-center"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: EASE }}
              >
                <Monogram className="h-9 w-10 text-accent/80" />
                <h2 className="mt-12 font-display type-display font-light text-ink">
                  {flow.confirmationHeadline.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
                <p className="mt-10 max-w-md text-[0.9375rem] font-light leading-relaxed text-ink-soft">
                  {flow.confirmationBody}
                </p>
                {reference && (
                  <div className="mt-12">
                    <p className="type-label-sm text-ink-faint">Reference</p>
                    <p className="mt-3 font-display text-3xl font-light tracking-wide2 text-accent">
                      {reference}
                    </p>
                  </div>
                )}
                <Link
                  href={housePath}
                  className="mt-16 type-label-sm text-ink-soft border-b border-line-strong pb-1 transition-colors duration-500 hover:text-ink"
                >
                  Return to Velmont
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------- */

function StepBody({
  step,
  answers,
  setAnswer,
  onChoice,
  onEnter,
}: {
  step: FlowStep;
  answers: Answers;
  setAnswer: (id: string, v: Answers[string]) => void;
  onChoice: (s: Extract<FlowStep, { kind: "choice" }>, v: string) => void;
  onEnter: () => void;
}) {
  switch (step.kind) {
    case "choice": {
      const value = str(answers, step.id);
      const options =
        typeof step.options === "function" ? step.options(answers) : step.options;
      const showDetail = value && step.detailOn?.includes(value);
      return (
        <div>
          <ChoiceList
            name={step.question}
            options={options}
            value={value || undefined}
            onChange={(v) => onChoice(step, v)}
            columns={step.columns ?? 1}
          />
          {showDetail && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mt-10 max-w-md"
            >
              <TextField
                label={step.detailLabel ?? "Tell us more"}
                optional={step.detailOptional}
                value={str(answers, `${step.id}Detail`)}
                onChange={(e) => setAnswer(`${step.id}Detail`, e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onEnter()}
              />
            </motion.div>
          )}
        </div>
      );
    }
    case "multi": {
      const value = (answers[step.id] as string[] | undefined) ?? [];
      return (
        <MultiChoice
          name={step.question}
          options={step.options}
          value={value}
          onChange={(v) => setAnswer(step.id, v)}
        />
      );
    }
    case "select": {
      const options =
        typeof step.options === "function" ? step.options(answers) : step.options;
      return (
        <div className="max-w-md">
          <SearchSelect
            label="Search"
            options={options}
            value={str(answers, step.id) || undefined}
            onChange={(v) => setAnswer(step.id, v)}
            placeholder={step.placeholder}
          />
        </div>
      );
    }
    case "text":
      return (
        <div className="max-w-md">
          <TextField
            label={step.label}
            placeholder={step.placeholder}
            value={str(answers, step.id)}
            onChange={(e) => setAnswer(step.id, e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onEnter()}
          />
        </div>
      );
    case "textarea":
      return (
        <TextArea
          aria-label={step.question}
          placeholder={step.placeholder}
          value={str(answers, step.id)}
          onChange={(e) => setAnswer(step.id, e.target.value)}
        />
      );
    case "group": {
      const value = grp(answers, step.id);
      return (
        <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {step.fields.map((f) => (
            <TextField
              key={f.id}
              label={f.label}
              type={f.type ?? "text"}
              optional={f.optional}
              placeholder={f.placeholder}
              autoComplete={f.autoComplete}
              value={value[f.id] ?? ""}
              onChange={(e) =>
                setAnswer(step.id, { ...value, [f.id]: e.target.value })
              }
            />
          ))}
        </div>
      );
    }
    case "upload": {
      const value = (answers[step.id] as UploadedImage[] | undefined) ?? [];
      return (
        <ImageUpload value={value} onChange={(v) => setAnswer(step.id, v)} />
      );
    }
  }
}
