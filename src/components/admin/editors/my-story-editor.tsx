"use client";

import { useSectionEditor } from "@/hooks/use-section-editor";
import { SectionEditorLayout } from "@/components/admin/section-editor-layout";
import { PublishBar } from "@/components/admin/publish-bar";
import { RevisionHistory } from "@/components/admin/revision-history";
import { TextField } from "@/components/admin/fields/text-field";
import { RichField } from "@/components/admin/fields/rich-field";
import { CtaField } from "@/components/admin/fields/cta-field";
import { SeoField } from "@/components/admin/fields/seo-field";
import { ListEditor } from "@/components/admin/fields/list-editor";
import { Label } from "@/components/ui/label";
import { sectionMeta } from "@/lib/content/meta";
import { emptyRichText } from "@/lib/content/schemas";
import type { MyStoryContent } from "@/lib/content/schemas";

export function MyStoryEditor({ initial }: { initial: MyStoryContent }) {
  const editor = useSectionEditor("myStory", initial);
  const { value, setValue } = editor;
  const meta = sectionMeta.myStory;

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
          previewHref="/admin/preview?page=myStory"
          historySlot={<RevisionHistory sectionKey="myStory" onRestore={editor.applyRestored} />}
        />
      }
    >
      <fieldset className="space-y-4">
        <legend className="mb-1 text-sm font-medium text-foreground">Page hero</legend>
        <TextField
          id="ms-hero-eyebrow"
          label="Eyebrow"
          value={value.hero.eyebrow}
          onChange={(eyebrow) => setValue({ ...value, hero: { ...value.hero, eyebrow } })}
        />
        <TextField
          id="ms-hero-heading"
          label="Heading"
          value={value.hero.heading}
          onChange={(heading) => setValue({ ...value, hero: { ...value.hero, heading } })}
        />
      </fieldset>

      <div>
        <Label className="mb-3 block">Paragraphs — before the pull quote</Label>
        <ListEditor
          items={value.paragraphsBefore}
          onChange={(paragraphsBefore) => setValue({ ...value, paragraphsBefore })}
          itemLabel={(_p, i) => `Paragraph ${i + 1}`}
          createItem={() => emptyRichText()}
          min={1}
          max={8}
          addLabel="Add paragraph"
          renderItem={(paragraph, i) => (
            <RichField
              label={`Paragraph ${i + 1}`}
              value={paragraph}
              onChange={(next) =>
                setValue({
                  ...value,
                  paragraphsBefore: value.paragraphsBefore.map((p, idx) =>
                    idx === i ? (next as typeof p) : p
                  ),
                })
              }
            />
          )}
        />
      </div>

      <RichField
        label="Pull quote"
        inline
        value={value.pullQuote}
        onChange={(pullQuote) => setValue({ ...value, pullQuote: pullQuote as typeof value.pullQuote })}
      />

      <div>
        <Label className="mb-3 block">Paragraphs — after the pull quote</Label>
        <ListEditor
          items={value.paragraphsAfter}
          onChange={(paragraphsAfter) => setValue({ ...value, paragraphsAfter })}
          itemLabel={(_p, i) => `Paragraph ${i + 1}`}
          createItem={() => emptyRichText()}
          min={1}
          max={8}
          addLabel="Add paragraph"
          renderItem={(paragraph, i) => (
            <RichField
              label={`Paragraph ${i + 1}`}
              value={paragraph}
              onChange={(next) =>
                setValue({
                  ...value,
                  paragraphsAfter: value.paragraphsAfter.map((p, idx) =>
                    idx === i ? (next as typeof p) : p
                  ),
                })
              }
            />
          )}
        />
      </div>

      <CtaField
        idPrefix="ms-cta"
        legend="Button"
        value={value.cta}
        onChange={(cta) => setValue({ ...value, cta })}
      />

      <SeoField idPrefix="ms-seo" value={value.seo} onChange={(seo) => setValue({ ...value, seo })} />
    </SectionEditorLayout>
  );
}
