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
import type { ContactContent } from "@/lib/content/schemas";

export function ContactEditor({ initial }: { initial: ContactContent }) {
  const editor = useSectionEditor("contact", initial);
  const { value, setValue } = editor;
  const meta = sectionMeta.contact;

  function updateItem(i: number, next: ContactContent["methods"][number]) {
    setValue({ ...value, methods: value.methods.map((m, idx) => (idx === i ? next : m)) });
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
          historySlot={<RevisionHistory sectionKey="contact" onRestore={editor.applyRestored} />}
        />
      }
    >
      <TextField
        id="contact-eyebrow"
        label="Eyebrow"
        value={value.eyebrow}
        onChange={(eyebrow) => setValue({ ...value, eyebrow })}
      />
      <TextField
        id="contact-heading"
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
        <Label className="mb-3 block">Contact methods</Label>
        <ListEditor
          items={value.methods}
          onChange={(methods) => setValue({ ...value, methods })}
          itemLabel={(m) => m.label || "Untitled method"}
          createItem={() => ({ icon: "mail", label: "", value: "", href: null })}
          min={1}
          max={6}
          addLabel="Add contact method"
          renderItem={(method, i) => (
            <div className="space-y-4">
              <div className="flex items-end gap-4">
                <IconPicker
                  label="Icon"
                  value={method.icon}
                  onChange={(icon) => updateItem(i, { ...method, icon })}
                />
                <div className="flex-1">
                  <TextField
                    id={`method-${i}-label`}
                    label="Label"
                    value={method.label}
                    onChange={(label) => updateItem(i, { ...method, label })}
                  />
                </div>
              </div>
              <TextField
                id={`method-${i}-value`}
                label="Displayed text"
                value={method.value}
                onChange={(v) => updateItem(i, { ...method, value: v })}
              />
              <TextField
                id={`method-${i}-href`}
                label="Link (leave blank for none)"
                value={method.href ?? ""}
                onChange={(href) => updateItem(i, { ...method, href: href || null })}
                placeholder="mailto:hello@cloon.ie"
              />
            </div>
          )}
        />
      </div>
    </SectionEditorLayout>
  );
}
