"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const MAX_FILES = 12;
const MAX_SIZE = 15 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

export interface UploadedImage {
  name: string;
  size: number;
  previewUrl: string;
}

/**
 * Photograph submission. Previews render immediately as framed plates on
 * the dark ground. Files are handed to the flow's storage adapter at
 * submission time (see /api/mandates); metadata rides with the answers.
 */
export function ImageUpload({
  value = [],
  onChange,
  label = "Photographs",
}: {
  value?: UploadedImage[];
  onChange: (v: UploadedImage[], files?: File[]) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const urlsRef = useRef<string[]>([]);

  useEffect(
    () => () => {
      urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    },
    [],
  );

  const addFiles = useCallback(
    (list: FileList | null) => {
      if (!list) return;
      const incoming = Array.from(list);
      const accepted: UploadedImage[] = [];
      let skipped = 0;
      for (const file of incoming) {
        if (value.length + accepted.length >= MAX_FILES) {
          skipped++;
          continue;
        }
        if (!ACCEPTED.includes(file.type) || file.size > MAX_SIZE) {
          skipped++;
          continue;
        }
        const url = URL.createObjectURL(file);
        urlsRef.current.push(url);
        accepted.push({ name: file.name, size: file.size, previewUrl: url });
      }
      if (accepted.length) onChange([...value, ...accepted]);
      setNotice(
        skipped > 0
          ? "Some files were left aside — photographs up to 15MB, twelve at most."
          : null,
      );
    },
    [value, onChange],
  );

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "group flex min-h-[160px] w-full flex-col items-center justify-center gap-4 border border-dashed px-6 py-10 transition-colors duration-500",
          dragging
            ? "border-accent/70 bg-accent/[0.03]"
            : "border-line-strong/70 hover:border-ink-soft",
        )}
        aria-label={`Add ${label.toLowerCase()}`}
      >
        <span aria-hidden className="block h-8 w-px bg-ink-faint group-hover:bg-ink-soft transition-colors duration-500" />
        <span className="type-label-sm text-ink-soft">
          {dragging ? "Release to add" : `Add ${label.toLowerCase()}`}
        </span>
        <span className="text-[0.6875rem] font-light tracking-wide2 text-ink-faint">
          Drag in, or choose from your device
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        multiple
        hidden
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {notice && (
        <p className="mt-4 text-[0.8125rem] font-light text-ink-soft">{notice}</p>
      )}

      <AnimatePresence>
        {value.length > 0 && (
          <motion.ul
            className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {value.map((img) => (
              <motion.li
                key={img.previewUrl}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="group relative"
              >
                <span className="block border border-line/70 bg-raised p-1.5">
                  <span className="relative block aspect-[4/3] overflow-hidden">
                    {/* Object URLs can't go through the Next optimizer */}
                    <Image
                      src={img.previewUrl}
                      alt={img.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onChange(value.filter((v) => v.previewUrl !== img.previewUrl))
                  }
                  className="absolute right-2 top-2 bg-black/70 px-2.5 py-1 text-[0.625rem] tracking-wide2 uppercase text-ink opacity-0 transition-opacity duration-300 focus-visible:opacity-100 group-hover:opacity-100"
                >
                  Remove
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
