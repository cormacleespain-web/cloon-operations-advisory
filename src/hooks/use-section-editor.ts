"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { discardDraft, publish, saveDraft } from "@/app/actions/content";
import type { SectionContent, SectionKey } from "@/lib/content/schemas";

/**
 * Shared draft/publish/discard state machine for a single content section.
 * Save always writes the current in-memory value as the draft; Publish
 * saves first, then flips draft -> published, so what's on screen is always
 * what gets published.
 */
export function useSectionEditor<K extends SectionKey>(
  sectionKey: K,
  initial: SectionContent<K>
) {
  const [value, setValue] = useState(initial);
  const [savedValue, setSavedValue] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const isDirty = JSON.stringify(value) !== JSON.stringify(savedValue);

  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  const save = useCallback(() => {
    startTransition(async () => {
      const result = await saveDraft(sectionKey, value);
      if (result.status === "error") {
        toast.error(result.message);
        return;
      }
      setSavedValue(result.data);
      toast.success("Draft saved");
    });
  }, [sectionKey, value]);

  const publishNow = useCallback(() => {
    startTransition(async () => {
      const saveResult = await saveDraft(sectionKey, value);
      if (saveResult.status === "error") {
        toast.error(saveResult.message);
        return;
      }
      setSavedValue(saveResult.data);

      const publishResult = await publish(sectionKey);
      if (publishResult.status === "error") {
        toast.error(publishResult.message);
        return;
      }
      toast.success(publishResult.message);
      router.refresh();
    });
  }, [sectionKey, value, router]);

  const discard = useCallback(() => {
    startTransition(async () => {
      const result = await discardDraft(sectionKey);
      if (result.status === "error") {
        toast.error(result.message);
        return;
      }
      setValue(result.data);
      setSavedValue(result.data);
      toast.success(result.message);
    });
  }, [sectionKey]);

  /** Called after restoreRevision() writes a new draft server-side. */
  const applyRestored = useCallback((restored: SectionContent<K>) => {
    setValue(restored);
    setSavedValue(restored);
  }, []);

  return {
    value,
    setValue,
    isDirty,
    isPending,
    save,
    publishNow,
    discard,
    applyRestored,
  };
}
