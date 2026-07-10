"use client";

import { useSectionEditor } from "@/hooks/use-section-editor";
import { SectionEditorLayout } from "@/components/admin/section-editor-layout";
import { PublishBar } from "@/components/admin/publish-bar";
import { RevisionHistory } from "@/components/admin/revision-history";
import { TextField } from "@/components/admin/fields/text-field";
import { RichField } from "@/components/admin/fields/rich-field";
import { CtaField } from "@/components/admin/fields/cta-field";
import { ListEditor } from "@/components/admin/fields/list-editor";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sectionMeta } from "@/lib/content/meta";
import type { PositioningContent } from "@/lib/content/schemas";

export function PositioningEditor({ initial }: { initial: PositioningContent }) {
  const editor = useSectionEditor("positioning", initial);
  const { value, setValue } = editor;
  const meta = sectionMeta.positioning;

  function updateItem(i: number, next: PositioningContent["pillars"][number]) {
    setValue({ ...value, pillars: value.pillars.map((p, idx) => (idx === i ? next : p)) });
  }

  return (
    <SectionEditorLayout
      title={meta.title}
      description={meta.description}
      bar={
        <PublishBar
          sectionLabel={meta.title}
          isDirty={editor.isDirty}
          isPending={editor.isPending}
          onSave={editor.save}
          onPublish={editor.publishNow}
          onDiscard={editor.discard}
          previewHref="/admin/preview"
          historySlot={<RevisionHistory sectionKey="positioning" onRestore={editor.applyRestored} />}
        />
      }
    >
      <RichField
        label="Heading"
        inline
        value={value.heading}
        onChange={(heading) => setValue({ ...value, heading: heading as typeof value.heading })}
      />

      <div>
        <Label className="mb-3 block">Pillars</Label>
        <ListEditor
          items={value.pillars}
          onChange={(pillars) => setValue({ ...value, pillars })}
          itemLabel={(p) => p.title || "Untitled pillar"}
          createItem={() => ({ title: "", body: "" })}
          min={1}
          max={6}
          addLabel="Add pillar"
          renderItem={(pillar, i) => (
            <div className="space-y-4">
              <TextField
                id={`pillar-${i}-title`}
                label="Title"
                value={pillar.title}
                onChange={(title) => updateItem(i, { ...pillar, title })}
              />
              <div className="space-y-2">
                <Label htmlFor={`pillar-${i}-body`}>Description</Label>
                <Textarea
                  id={`pillar-${i}-body`}
                  value={pillar.body}
                  onChange={(e) => updateItem(i, { ...pillar, body: e.target.value })}
                  rows={2}
                  className="rounded-xl bg-background"
                />
              </div>
            </div>
          )}
        />
      </div>

      <CtaField
        idPrefix="positioning-cta"
        legend="Button"
        value={value.cta}
        onChange={(cta) => setValue({ ...value, cta })}
      />
    </SectionEditorLayout>
  );
}
