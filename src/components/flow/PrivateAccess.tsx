"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Monogram } from "@/components/brand/Monogram";
import { TextField, TextArea } from "@/components/ui/Field";
import { ConsentMark } from "@/components/ui/Choice";
import { CtaButton } from "@/components/ui/Cta";
import { track } from "@/lib/analytics";
import { email as emailCheck, phone as phoneCheck, required } from "@/flows/validators";
import type { House } from "@/content/types";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Private client access — one composed screen, not a flow. The request
 * is deliberately light: who you are, how to reach you, and as much or
 * as little as you wish to say.
 */
export function PrivateAccess({
  house,
  housePath,
  descriptor,
}: {
  house: House;
  housePath: string;
  descriptor: string;
}) {
  const reduce = useReducedMotion();
  const [values, setValues] = useState({
    firstName: "",
    surname: "",
    email: "",
    mobile: "",
    note: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [startedAt] = useState(() => Date.now());

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: "" }));
    setFormError(null);
  };

  const submit = async () => {
    const next: Record<string, string> = {};
    const fn = required(values.firstName);
    if (fn) next.firstName = fn;
    const sn = required(values.surname);
    if (sn) next.surname = sn;
    const em = emailCheck(values.email);
    if (em) next.email = em;
    const ph = phoneCheck(values.mobile);
    if (ph) next.mobile = ph;
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    if (!consent) {
      setFormError("Please confirm you are happy for us to hold these details.");
      return;
    }
    setSubmitting(true);
    setFormError(null);
    try {
      const res = await fetch("/api/mandates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          house,
          kind: "private-access",
          answers: values.note ? { note: values.note } : {},
          client: {
            firstName: values.firstName,
            surname: values.surname,
            email: values.email,
            mobile: values.mobile,
          },
          consent: true,
          company: "",
          startedAt,
        }),
      });
      if (!res.ok) throw new Error();
      const receipt = (await res.json()) as { reference: string };
      setReference(receipt.reference);
      track("private_access_requested", { house, placement: "form" });
    } catch {
      setFormError(
        "Something didn’t settle. Nothing has been lost — please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[100svh] flex-col bg-ground">
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

      <main className="flex flex-1 flex-col justify-center px-5 py-14 sm:px-10">
        <div className="mx-auto w-full max-w-2xl">
          {reference ? (
            <motion.div
              className="flex flex-col items-center text-center"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.1, ease: EASE }}
            >
              <Monogram className="h-9 w-10 text-accent/80" />
              <h1 className="mt-12 font-display type-display font-light text-ink">
                <span className="block">Your request</span>
                <span className="block">has been received.</span>
              </h1>
              <p className="mt-10 max-w-md text-[0.9375rem] font-light leading-relaxed text-ink-soft">
                A member of the office will be in touch personally. Private
                client arrangements are agreed individually and in confidence.
              </p>
              <div className="mt-12">
                <p className="type-label-sm text-ink-faint">Reference</p>
                <p className="mt-3 font-display text-3xl font-light tracking-wide2 text-accent">
                  {reference}
                </p>
              </div>
              <Link
                href={housePath}
                className="mt-16 type-label-sm text-ink-soft border-b border-line-strong pb-1 transition-colors duration-500 hover:text-ink"
              >
                Return to Velmont
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <p className="type-label text-accent/80">Private Clients</p>
              <h1 className="mt-8 font-display type-question font-light text-ink">
                Ask quietly.
                <span className="block text-ink-soft">We’ll take it from there.</span>
              </h1>
              <p className="mt-8 max-w-md text-[0.9375rem] font-light leading-relaxed text-ink-soft">
                Tell us who you are and how to reach you. Anything more is
                entirely up to you.
              </p>

              <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
                <TextField
                  label="First name"
                  autoComplete="given-name"
                  value={values.firstName}
                  onChange={set("firstName")}
                  error={errors.firstName || undefined}
                />
                <TextField
                  label="Surname"
                  autoComplete="family-name"
                  value={values.surname}
                  onChange={set("surname")}
                  error={errors.surname || undefined}
                />
                <TextField
                  label="Email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={set("email")}
                  error={errors.email || undefined}
                />
                <TextField
                  label="Mobile"
                  type="tel"
                  autoComplete="tel"
                  value={values.mobile}
                  onChange={set("mobile")}
                  error={errors.mobile || undefined}
                />
              </div>

              <div className="mt-10">
                <TextArea
                  label="In your own words"
                  optional
                  placeholder="What you collect, what you’re looking for, or simply how you’d like to work."
                  value={values.note}
                  onChange={set("note")}
                />
              </div>

              <div className="mt-10 border-t border-line/60 pt-8">
                <ConsentMark checked={consent} onChange={setConsent}>
                  I’m happy for Velmont to hold these details and contact me
                  about private client arrangements.
                </ConsentMark>
              </div>

              <div aria-live="polite">
                {formError && (
                  <p className="mt-6 text-[0.875rem] font-light text-accent">
                    {formError}
                  </p>
                )}
              </div>

              <div className="mt-12">
                <CtaButton tone="champagne" onClick={submit} disabled={submitting}>
                  {submitting ? "Sending…" : "Request Private Client Access"}
                </CtaButton>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
