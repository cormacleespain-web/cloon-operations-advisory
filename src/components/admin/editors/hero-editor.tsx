"use client";

import { useSectionEditor } from "@/hooks/use-section-editor";
import { SectionEditorLayout } from "@/components/admin/section-editor-layout";
import { PublishBar } from "@/components/admin/publish-bar";
import { RevisionHistory } from "@/components/admin/revision-history";
import { TextField } from "@/components/admin/fields/text-field";
import { RichField } from "@/components/admin/fields/rich-field";
import { CtaField } from "@/components/admin/fields/cta-field";
import { sectionMeta } from "@/lib/content/meta";
import type { HeroContent } from "@/lib/content/schemas";

export function HeroEditor({ initial }: { initial: HeroContent }) {
  const editor = useSectionEditor("hero", initial);
  const { value, setValue } = editor;
  const meta = sectionMeta.hero;

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
          historySlot={<RevisionHistory sectionKey="hero" onRestore={editor.applyRestored} />}
        />
      }
    >
      <TextField
        id="hero-eyebrow"
        label="Eyebrow"
        value={value.eyebrow}
        onChange={(eyebrow) => setValue({ ...value, eyebrow })}
      />
      <TextField
        id="hero-heading-1"
        label="Heading — first line"
        value={value.headingLine1}
        onChange={(headingLine1) => setValue({ ...value, headingLine1 })}
      />
      <RichField
        label="Heading — second line"
        inline
        value={value.headingLine2}
        onChange={(headingLine2) =>
          setValue({ ...value, headingLine2: headingLine2 as typeof value.headingLine2 })
        }
      />
      <RichField
        label="Subheading"
        value={value.subheading}
        onChange={(subheading) => setValue({ ...value, subheading: subheading as typeof value.subheading })}
      />
      <CtaField
        idPrefix="hero-primary"
        legend="Primary button"
        value={value.primaryCta}
        onChange={(primaryCta) => setValue({ ...value, primaryCta })}
      />
      <CtaField
        idPrefix="hero-secondary"
        legend="Secondary button"
        value={value.secondaryCta}
        onChange={(secondaryCta) => setValue({ ...value, secondaryCta })}
      />
    </SectionEditorLayout>
  );
}
