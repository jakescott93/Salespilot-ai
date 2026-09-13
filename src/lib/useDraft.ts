"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Local draft persistence for mandate flows.
 *
 * A detailed brief takes minutes to compose; an accidental refresh must
 * never destroy it. Drafts live in localStorage under a versioned key and
 * are cleared on successful submission. Storage access is wrapped — private
 * windows and blocked site data degrade silently to in-memory state.
 */

const VERSION = "v1";

export interface DraftState {
  step: number;
  answers: Record<string, unknown>;
  startedAt: number;
}

function read(key: string): DraftState | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DraftState;
    if (typeof parsed !== "object" || parsed === null) return null;
    // Uploaded-image previews are object URLs; they die with the page.
    // Drop them on restore so the client re-adds photographs cleanly.
    if (parsed.answers && typeof parsed.answers === "object") {
      for (const [k, v] of Object.entries(parsed.answers)) {
        if (Array.isArray(v) && v.some((x) => typeof x === "object")) {
          delete parsed.answers[k];
        }
      }
    }
    return parsed;
  } catch {
    return null;
  }
}

export function useDraft(flowId: string) {
  const key = `velmont:${flowId}:${VERSION}`;
  const [hydrated, setHydrated] = useState(false);
  const [draft, setDraft] = useState<DraftState>({
    step: 0,
    answers: {},
    startedAt: Date.now(),
  });
  const keyRef = useRef(key);
  keyRef.current = key;

  useEffect(() => {
    const existing = read(keyRef.current);
    if (existing) setDraft(existing);
    setHydrated(true);
  }, []);

  const update = useCallback(
    (patch: Partial<DraftState> | ((d: DraftState) => DraftState)) => {
      setDraft((prev) => {
        const next =
          typeof patch === "function" ? patch(prev) : { ...prev, ...patch };
        try {
          window.localStorage.setItem(keyRef.current, JSON.stringify(next));
        } catch {
          /* storage unavailable — keep in memory */
        }
        return next;
      });
    },
    [],
  );

  const clear = useCallback(() => {
    try {
      window.localStorage.removeItem(keyRef.current);
    } catch {
      /* ignore */
    }
    setDraft({ step: 0, answers: {}, startedAt: Date.now() });
  }, []);

  return { draft, update, clear, hydrated };
}
