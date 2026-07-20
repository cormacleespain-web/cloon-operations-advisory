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
import { sectionMeta } from "@/lib/content/meta";
import { emptyRichText } from "@/lib/content/schemas";
import type { HomeTeasersContent } from "@/lib/content/schemas";

export function HomeTeasersEditor({ initial }: { initial: HomeTeasersContent }) {
  const editor = useSectionEditor("homeTeasers", initial);
  const { value, setValue } = editor;
  const meta = sectionMeta.homeTeasers;

  function updateItem(i: number, next: HomeTeasersContent["items"][number]) {
    setValue({ ...value, items: value.items.map((item, idx) => (idx === i ? next : item)) });
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
          historySlot={
            <RevisionHistory sectionKey="homeTeasers" onRestore={editor.applyRestored} />
          }
        />
      }
    >
      <TextField
        id="home-teasers-eyebrow"
        label="Eyebrow"
        value={value.eyebrow}
        onChange={(eyebrow) => setValue({ ...value, eyebrow })}
      />
      <TextField
        id="home-teasers-heading"
        label="Heading"
        value={value.heading}
        onChange={(heading) => setValue({ ...value, heading })}
      />

      <div>
        <Label className="mb-3 block">Teasers</Label>
        <ListEditor
          items={value.items}
          onChange={(items) => setValue({ ...value, items })}
          itemLabel={(item) => item.title || "Untitled teaser"}
          createItem={() => ({ title: "", body: emptyRichText(), cta: { label: "", href: "" } })}
          min={1}
          max={4}
          addLabel="Add teaser"
          renderItem={(item, i) => (
            <div className="space-y-4">
              <TextField
                id={`teaser-${i}-title`}
                label="Title"
                value={item.title}
                onChange={(title) => updateItem(i, { ...item, title })}
              />
              <RichField
                label="Body"
                value={item.body}
                onChange={(body) => updateItem(i, { ...item, body: body as typeof item.body })}
              />
              <CtaField
                idPrefix={`teaser-${i}-cta`}
                legend="Link"
                value={item.cta}
                onChange={(cta) => updateItem(i, { ...item, cta })}
              />
            </div>
          )}
        />
      </div>
    </SectionEditorLayout>
  );
}
