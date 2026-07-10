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
import type { FooterContent } from "@/lib/content/schemas";

export function FooterEditor({ initial }: { initial: FooterContent }) {
  const editor = useSectionEditor("footer", initial);
  const { value, setValue } = editor;
  const meta = sectionMeta.footer;

  function updateItem(i: number, next: FooterContent["links"][number]) {
    setValue({ ...value, links: value.links.map((item, idx) => (idx === i ? next : item)) });
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
          historySlot={<RevisionHistory sectionKey="footer" onRestore={editor.applyRestored} />}
        />
      }
    >
      <RichField
        label="Tagline"
        value={value.tagline}
        onChange={(tagline) => setValue({ ...value, tagline: tagline as typeof value.tagline })}
      />

      <div>
        <Label className="mb-3 block">Footer links</Label>
        <ListEditor
          items={value.links}
          onChange={(links) => setValue({ ...value, links })}
          itemLabel={(item) => item.label || "Untitled link"}
          createItem={() => ({ label: "", href: "#" })}
          max={6}
          addLabel="Add link"
          renderItem={(item, i) => (
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                id={`footer-link-${i}-label`}
                label="Label"
                value={item.label}
                onChange={(label) => updateItem(i, { ...item, label })}
              />
              <TextField
                id={`footer-link-${i}-href`}
                label="Link"
                value={item.href}
                onChange={(href) => updateItem(i, { ...item, href })}
              />
            </div>
          )}
        />
      </div>

      <TextField
        id="footer-copyright"
        label="Copyright name"
        value={value.copyrightName}
        onChange={(copyrightName) => setValue({ ...value, copyrightName })}
      />
      <TextField
        id="footer-email"
        label="Contact email"
        value={value.email}
        onChange={(email) => setValue({ ...value, email })}
      />
    </SectionEditorLayout>
  );
}
