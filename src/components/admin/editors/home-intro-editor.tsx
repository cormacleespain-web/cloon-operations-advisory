"use client";

import { useSectionEditor } from "@/hooks/use-section-editor";
import { SectionEditorLayout } from "@/components/admin/section-editor-layout";
import { PublishBar } from "@/components/admin/publish-bar";
import { RevisionHistory } from "@/components/admin/revision-history";
import { TextField } from "@/components/admin/fields/text-field";
import { RichField } from "@/components/admin/fields/rich-field";
import { sectionMeta } from "@/lib/content/meta";
import type { HomeIntroContent } from "@/lib/content/schemas";

export function HomeIntroEditor({ initial }: { initial: HomeIntroContent }) {
  const editor = useSectionEditor("homeIntro", initial);
  const { value, setValue } = editor;
  const meta = sectionMeta.homeIntro;

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
          historySlot={<RevisionHistory sectionKey="homeIntro" onRestore={editor.applyRestored} />}
        />
      }
    >
      <TextField
        id="home-intro-eyebrow"
        label="Eyebrow"
        value={value.eyebrow}
        onChange={(eyebrow) => setValue({ ...value, eyebrow })}
      />
      <RichField
        label="Heading"
        inline
        value={value.heading}
        onChange={(heading) => setValue({ ...value, heading: heading as typeof value.heading })}
      />
      <RichField
        label="Body"
        value={value.body}
        onChange={(body) => setValue({ ...value, body: body as typeof value.body })}
      />
    </SectionEditorLayout>
  );
}
