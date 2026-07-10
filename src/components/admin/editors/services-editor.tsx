"use client";

import { useSectionEditor } from "@/hooks/use-section-editor";
import { SectionEditorLayout } from "@/components/admin/section-editor-layout";
import { PublishBar } from "@/components/admin/publish-bar";
import { RevisionHistory } from "@/components/admin/revision-history";
import { TextField } from "@/components/admin/fields/text-field";
import { RichField } from "@/components/admin/fields/rich-field";
import { IconPicker } from "@/components/admin/fields/icon-picker";
import { ListEditor } from "@/components/admin/fields/list-editor";
import { Label } from "@/components/ui/label";
import { sectionMeta } from "@/lib/content/meta";
import { emptyRichText } from "@/lib/content/schemas";
import type { ServicesContent } from "@/lib/content/schemas";

export function ServicesEditor({ initial }: { initial: ServicesContent }) {
  const editor = useSectionEditor("services", initial);
  const { value, setValue } = editor;
  const meta = sectionMeta.services;

  function updateItem(i: number, next: ServicesContent["items"][number]) {
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
          historySlot={<RevisionHistory sectionKey="services" onRestore={editor.applyRestored} />}
        />
      }
    >
      <TextField
        id="services-eyebrow"
        label="Eyebrow"
        value={value.eyebrow}
        onChange={(eyebrow) => setValue({ ...value, eyebrow })}
      />
      <TextField
        id="services-heading"
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
        <Label className="mb-3 block">Services</Label>
        <ListEditor
          items={value.items}
          onChange={(items) => setValue({ ...value, items })}
          itemLabel={(item) => item.title || "Untitled service"}
          createItem={() => ({ icon: "compass", title: "", body: emptyRichText() })}
          min={1}
          max={8}
          addLabel="Add service"
          renderItem={(item, i) => (
            <div className="space-y-4">
              <div className="flex items-end gap-4">
                <IconPicker label="Icon" value={item.icon} onChange={(icon) => updateItem(i, { ...item, icon })} />
                <div className="flex-1">
                  <TextField
                    id={`service-${i}-title`}
                    label="Title"
                    value={item.title}
                    onChange={(title) => updateItem(i, { ...item, title })}
                  />
                </div>
              </div>
              <RichField
                label="Description"
                value={item.body}
                onChange={(body) => updateItem(i, { ...item, body: body as typeof item.body })}
              />
            </div>
          )}
        />
      </div>
    </SectionEditorLayout>
  );
}
