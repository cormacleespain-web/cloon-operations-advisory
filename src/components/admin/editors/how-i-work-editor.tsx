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
import type { HowIWorkContent } from "@/lib/content/schemas";

type Principle = HowIWorkContent["principles"][number];

export function HowIWorkEditor({ initial }: { initial: HowIWorkContent }) {
  const editor = useSectionEditor("howIWork", initial);
  const { value, setValue } = editor;
  const meta = sectionMeta.howIWork;

  function updatePrinciple(i: number, next: Principle) {
    setValue({ ...value, principles: value.principles.map((p, idx) => (idx === i ? next : p)) });
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
          previewHref="/admin/preview?page=howIWork"
          historySlot={<RevisionHistory sectionKey="howIWork" onRestore={editor.applyRestored} />}
        />
      }
    >
      <fieldset className="space-y-4">
        <legend className="mb-1 text-sm font-medium text-foreground">Page hero</legend>
        <TextField
          id="hiw-hero-eyebrow"
          label="Eyebrow"
          value={value.hero.eyebrow}
          onChange={(eyebrow) => setValue({ ...value, hero: { ...value.hero, eyebrow } })}
        />
        <TextField
          id="hiw-hero-heading"
          label="Heading"
          value={value.hero.heading}
          onChange={(heading) => setValue({ ...value, hero: { ...value.hero, heading } })}
        />
        <RichField
          label="Intro"
          value={value.hero.intro ?? emptyRichText()}
          onChange={(intro) =>
            setValue({ ...value, hero: { ...value.hero, intro: intro as typeof value.hero.intro } })
          }
        />
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-1 text-sm font-medium text-foreground">Experience</legend>
        <TextField
          id="hiw-experience-heading"
          label="Heading"
          value={value.experience.heading}
          onChange={(heading) =>
            setValue({ ...value, experience: { ...value.experience, heading } })
          }
        />
        <RichField
          label="Body"
          value={value.experience.body}
          onChange={(body) =>
            setValue({
              ...value,
              experience: { ...value.experience, body: body as typeof value.experience.body },
            })
          }
        />
      </fieldset>

      <div>
        <Label className="mb-3 block">Principles (exactly 5)</Label>
        <ListEditor
          items={value.principles}
          onChange={(principles) => setValue({ ...value, principles })}
          itemLabel={(p) => p.title || "Untitled principle"}
          createItem={() => ({ title: "", body: emptyRichText() })}
          min={5}
          max={5}
          renderItem={(principle, i) => (
            <div className="space-y-4">
              <TextField
                id={`hiw-principle-${i}-title`}
                label="Title"
                value={principle.title}
                onChange={(title) => updatePrinciple(i, { ...principle, title })}
              />
              <RichField
                label="Body"
                value={principle.body}
                onChange={(body) =>
                  updatePrinciple(i, { ...principle, body: body as typeof principle.body })
                }
              />
            </div>
          )}
        />
      </div>

      <fieldset className="space-y-4">
        <legend className="mb-1 text-sm font-medium text-foreground">What you can expect</legend>
        <TextField
          id="hiw-expectations-heading"
          label="Heading"
          value={value.expectations.heading}
          onChange={(heading) =>
            setValue({ ...value, expectations: { ...value.expectations, heading } })
          }
        />
        <div>
          <Label className="mb-3 block">Items</Label>
          <ListEditor
            items={value.expectations.items}
            onChange={(items) =>
              setValue({ ...value, expectations: { ...value.expectations, items } })
            }
            itemLabel={(item, i) => item || `Item ${i + 1}`}
            createItem={() => ""}
            min={1}
            max={8}
            addLabel="Add item"
            renderItem={(item, i) => (
              <TextField
                id={`hiw-expectation-${i}`}
                label={`Item ${i + 1}`}
                value={item}
                onChange={(next) =>
                  setValue({
                    ...value,
                    expectations: {
                      ...value.expectations,
                      items: value.expectations.items.map((it, idx) => (idx === i ? next : it)),
                    },
                  })
                }
              />
            )}
          />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-1 text-sm font-medium text-foreground">Outcome</legend>
        <TextField
          id="hiw-outcome-heading"
          label="Heading"
          value={value.outcome.heading}
          onChange={(heading) => setValue({ ...value, outcome: { ...value.outcome, heading } })}
        />
        <RichField
          label="Body"
          value={value.outcome.body}
          onChange={(body) =>
            setValue({ ...value, outcome: { ...value.outcome, body: body as typeof value.outcome.body } })
          }
        />
      </fieldset>

      <CtaField
        idPrefix="hiw-cta"
        legend="Button"
        value={value.cta}
        onChange={(cta) => setValue({ ...value, cta })}
      />

      <SeoField idPrefix="hiw-seo" value={value.seo} onChange={(seo) => setValue({ ...value, seo })} />
    </SectionEditorLayout>
  );
}
