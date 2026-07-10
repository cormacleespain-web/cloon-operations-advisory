"use client";

import { useSectionEditor } from "@/hooks/use-section-editor";
import { SectionEditorLayout } from "@/components/admin/section-editor-layout";
import { PublishBar } from "@/components/admin/publish-bar";
import { RevisionHistory } from "@/components/admin/revision-history";
import { TextField } from "@/components/admin/fields/text-field";
import { RichField } from "@/components/admin/fields/rich-field";
import { ListEditor } from "@/components/admin/fields/list-editor";
import { Label } from "@/components/ui/label";
import { sectionMeta } from "@/lib/content/meta";
import { emptyRichText } from "@/lib/content/schemas";
import type { ApproachContent } from "@/lib/content/schemas";

export function ApproachEditor({ initial }: { initial: ApproachContent }) {
  const editor = useSectionEditor("approach", initial);
  const { value, setValue } = editor;
  const meta = sectionMeta.approach;

  function updateItem(i: number, next: ApproachContent["steps"][number]) {
    setValue({ ...value, steps: value.steps.map((step, idx) => (idx === i ? next : step)) });
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
          historySlot={<RevisionHistory sectionKey="approach" onRestore={editor.applyRestored} />}
        />
      }
    >
      <TextField
        id="approach-eyebrow"
        label="Eyebrow"
        value={value.eyebrow}
        onChange={(eyebrow) => setValue({ ...value, eyebrow })}
      />
      <TextField
        id="approach-heading"
        label="Heading"
        value={value.heading}
        onChange={(heading) => setValue({ ...value, heading })}
      />
      <RichField
        label="Intro"
        value={value.intro}
        onChange={(intro) => setValue({ ...value, intro: intro as typeof value.intro })}
      />

      <div>
        <Label className="mb-3 block">Steps</Label>
        <ListEditor
          items={value.steps}
          onChange={(steps) => setValue({ ...value, steps })}
          itemLabel={(step, i) => step.title || `Step ${i + 1}`}
          createItem={() => ({ title: "", body: emptyRichText() })}
          min={1}
          max={8}
          addLabel="Add step"
          renderItem={(step, i) => (
            <div className="space-y-4">
              <TextField
                id={`step-${i}-title`}
                label="Title"
                value={step.title}
                onChange={(title) => updateItem(i, { ...step, title })}
              />
              <RichField
                label="Description"
                value={step.body}
                onChange={(body) => updateItem(i, { ...step, body: body as typeof step.body })}
              />
            </div>
          )}
        />
      </div>
    </SectionEditorLayout>
  );
}
