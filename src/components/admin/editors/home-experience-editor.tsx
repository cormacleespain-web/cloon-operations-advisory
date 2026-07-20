"use client";

import { useSectionEditor } from "@/hooks/use-section-editor";
import { SectionEditorLayout } from "@/components/admin/section-editor-layout";
import { PublishBar } from "@/components/admin/publish-bar";
import { RevisionHistory } from "@/components/admin/revision-history";
import { TextField } from "@/components/admin/fields/text-field";
import { RichField } from "@/components/admin/fields/rich-field";
import { ImageField } from "@/components/admin/fields/image-field";
import { ListEditor } from "@/components/admin/fields/list-editor";
import { Label } from "@/components/ui/label";
import { sectionMeta } from "@/lib/content/meta";
import { emptyRichText } from "@/lib/content/schemas";
import type { HomeExperienceContent } from "@/lib/content/schemas";

export function HomeExperienceEditor({ initial }: { initial: HomeExperienceContent }) {
  const editor = useSectionEditor("homeExperience", initial);
  const { value, setValue } = editor;
  const meta = sectionMeta.homeExperience;

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
            <RevisionHistory sectionKey="homeExperience" onRestore={editor.applyRestored} />
          }
        />
      }
    >
      <TextField
        id="home-experience-eyebrow"
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

      <div>
        <Label className="mb-3 block">Paragraphs</Label>
        <ListEditor
          items={value.paragraphs}
          onChange={(paragraphs) => setValue({ ...value, paragraphs })}
          itemLabel={(_p, i) => `Paragraph ${i + 1}`}
          createItem={() => emptyRichText()}
          min={1}
          max={6}
          addLabel="Add paragraph"
          renderItem={(paragraph, i) => (
            <RichField
              label={`Paragraph ${i + 1}`}
              value={paragraph}
              onChange={(next) =>
                setValue({
                  ...value,
                  paragraphs: value.paragraphs.map((p, idx) => (idx === i ? (next as typeof p) : p)),
                })
              }
            />
          )}
        />
      </div>

      <ImageField label="Photo" value={value.image} onChange={(image) => setValue({ ...value, image })} />
    </SectionEditorLayout>
  );
}
