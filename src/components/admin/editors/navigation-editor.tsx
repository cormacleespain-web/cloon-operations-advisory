"use client";

import { useSectionEditor } from "@/hooks/use-section-editor";
import { SectionEditorLayout } from "@/components/admin/section-editor-layout";
import { PublishBar } from "@/components/admin/publish-bar";
import { RevisionHistory } from "@/components/admin/revision-history";
import { TextField } from "@/components/admin/fields/text-field";
import { CtaField } from "@/components/admin/fields/cta-field";
import { ListEditor } from "@/components/admin/fields/list-editor";
import { Label } from "@/components/ui/label";
import { sectionMeta } from "@/lib/content/meta";
import type { NavigationContent } from "@/lib/content/schemas";

export function NavigationEditor({ initial }: { initial: NavigationContent }) {
  const editor = useSectionEditor("navigation", initial);
  const { value, setValue } = editor;
  const meta = sectionMeta.navigation;

  function updateItem(i: number, next: NavigationContent["items"][number]) {
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
          historySlot={<RevisionHistory sectionKey="navigation" onRestore={editor.applyRestored} />}
        />
      }
    >
      <div>
        <Label className="mb-3 block">Menu links</Label>
        <ListEditor
          items={value.items}
          onChange={(items) => setValue({ ...value, items })}
          itemLabel={(item) => item.label || "Untitled link"}
          createItem={() => ({ label: "", href: "#" })}
          min={1}
          max={6}
          addLabel="Add link"
          renderItem={(item, i) => (
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                id={`nav-${i}-label`}
                label="Label"
                value={item.label}
                onChange={(label) => updateItem(i, { ...item, label })}
              />
              <TextField
                id={`nav-${i}-href`}
                label="Link"
                value={item.href}
                onChange={(href) => updateItem(i, { ...item, href })}
              />
            </div>
          )}
        />
      </div>

      <CtaField
        idPrefix="nav-cta"
        legend="Header button"
        value={value.cta}
        onChange={(cta) => setValue({ ...value, cta })}
      />
    </SectionEditorLayout>
  );
}
