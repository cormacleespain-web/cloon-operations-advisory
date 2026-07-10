"use client";

import { useSectionEditor } from "@/hooks/use-section-editor";
import { SectionEditorLayout } from "@/components/admin/section-editor-layout";
import { PublishBar } from "@/components/admin/publish-bar";
import { RevisionHistory } from "@/components/admin/revision-history";
import { TextField } from "@/components/admin/fields/text-field";
import { sectionMeta } from "@/lib/content/meta";
import type { SettingsContent } from "@/lib/content/schemas";

export function SettingsEditor({ initial }: { initial: SettingsContent }) {
  const editor = useSectionEditor("settings", initial);
  const { value, setValue } = editor;
  const meta = sectionMeta.settings;

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
          historySlot={<RevisionHistory sectionKey="settings" onRestore={editor.applyRestored} />}
        />
      }
    >
      <TextField
        id="settings-title"
        label="Page title"
        value={value.title}
        onChange={(title) => setValue({ ...value, title })}
      />
      <TextField
        id="settings-description"
        label="Page description"
        value={value.description}
        onChange={(description) => setValue({ ...value, description })}
      />
      <TextField
        id="settings-og-title"
        label="Social share title"
        value={value.ogTitle}
        onChange={(ogTitle) => setValue({ ...value, ogTitle })}
      />
      <TextField
        id="settings-og-description"
        label="Social share description"
        value={value.ogDescription}
        onChange={(ogDescription) => setValue({ ...value, ogDescription })}
      />
    </SectionEditorLayout>
  );
}
