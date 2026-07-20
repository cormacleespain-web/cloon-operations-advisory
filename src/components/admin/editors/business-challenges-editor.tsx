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
import type { BusinessChallengesContent } from "@/lib/content/schemas";

type Area = BusinessChallengesContent["areas"][number];
type Review = Area["reviews"][number];

function emptyReview(): Review {
  return {
    title: "",
    symptoms: [""],
    reality: emptyRichText(),
    help: emptyRichText(),
    outcomes: [""],
  };
}

export function BusinessChallengesEditor({ initial }: { initial: BusinessChallengesContent }) {
  const editor = useSectionEditor("businessChallenges", initial);
  const { value, setValue } = editor;
  const meta = sectionMeta.businessChallenges;

  function updateArea(i: number, next: Area) {
    setValue({ ...value, areas: value.areas.map((a, idx) => (idx === i ? next : a)) });
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
          previewHref="/admin/preview?page=businessChallenges"
          historySlot={
            <RevisionHistory sectionKey="businessChallenges" onRestore={editor.applyRestored} />
          }
        />
      }
    >
      <fieldset className="space-y-4">
        <legend className="mb-1 text-sm font-medium text-foreground">Page hero</legend>
        <TextField
          id="bc-hero-eyebrow"
          label="Eyebrow"
          value={value.hero.eyebrow}
          onChange={(eyebrow) => setValue({ ...value, hero: { ...value.hero, eyebrow } })}
        />
        <TextField
          id="bc-hero-heading"
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

      <RichField
        label="Pull quote"
        inline
        value={value.pullQuote}
        onChange={(pullQuote) => setValue({ ...value, pullQuote: pullQuote as typeof value.pullQuote })}
      />

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-1 text-sm font-medium text-foreground sm:col-span-2">
          Repeated section headings
        </legend>
        <TextField
          id="bc-label-symptoms"
          label="Symptoms heading"
          value={value.reviewLabels.symptoms}
          onChange={(symptoms) =>
            setValue({ ...value, reviewLabels: { ...value.reviewLabels, symptoms } })
          }
        />
        <TextField
          id="bc-label-reality"
          label="Reality heading"
          value={value.reviewLabels.reality}
          onChange={(reality) =>
            setValue({ ...value, reviewLabels: { ...value.reviewLabels, reality } })
          }
        />
        <TextField
          id="bc-label-help"
          label="Help heading"
          value={value.reviewLabels.help}
          onChange={(help) => setValue({ ...value, reviewLabels: { ...value.reviewLabels, help } })}
        />
        <TextField
          id="bc-label-outcomes"
          label="Outcomes heading"
          value={value.reviewLabels.outcomes}
          onChange={(outcomes) =>
            setValue({ ...value, reviewLabels: { ...value.reviewLabels, outcomes } })
          }
        />
      </fieldset>

      <div>
        <Label className="mb-3 block">Areas</Label>
        <ListEditor
          items={value.areas}
          onChange={(areas) => setValue({ ...value, areas })}
          itemLabel={(a) => a.title || "Untitled area"}
          createItem={() => ({ title: "", reviews: [emptyReview()] })}
          min={1}
          max={4}
          addLabel="Add area"
          renderItem={(area, i) => {
            function updateReview(j: number, next: Review) {
              updateArea(i, { ...area, reviews: area.reviews.map((r, idx) => (idx === j ? next : r)) });
            }
            return (
              <div className="space-y-4">
                <TextField
                  id={`bc-area-${i}-title`}
                  label="Area title"
                  value={area.title}
                  onChange={(title) => updateArea(i, { ...area, title })}
                />
                <div>
                  <Label className="mb-3 block">Reviews</Label>
                  <ListEditor
                    items={area.reviews}
                    onChange={(reviews) => updateArea(i, { ...area, reviews })}
                    itemLabel={(r) => r.title || "Untitled review"}
                    createItem={emptyReview}
                    min={1}
                    max={4}
                    addLabel="Add review"
                    renderItem={(review, j) => {
                      const idBase = `bc-area-${i}-review-${j}`;
                      return (
                        <div className="space-y-4">
                          <TextField
                            id={`${idBase}-title`}
                            label="Review title"
                            value={review.title}
                            onChange={(title) => updateReview(j, { ...review, title })}
                          />

                          <div>
                            <Label className="mb-3 block">Symptom quotes</Label>
                            <ListEditor
                              items={review.symptoms}
                              onChange={(symptoms) => updateReview(j, { ...review, symptoms })}
                              itemLabel={(s, k) => s || `Symptom ${k + 1}`}
                              createItem={() => ""}
                              min={1}
                              max={8}
                              addLabel="Add symptom"
                              renderItem={(symptom, k) => (
                                <TextField
                                  id={`${idBase}-symptom-${k}`}
                                  label={`Symptom ${k + 1}`}
                                  value={symptom}
                                  onChange={(next) =>
                                    updateReview(j, {
                                      ...review,
                                      symptoms: review.symptoms.map((s, idx) =>
                                        idx === k ? next : s
                                      ),
                                    })
                                  }
                                />
                              )}
                            />
                          </div>

                          <RichField
                            label={value.reviewLabels.reality}
                            value={review.reality}
                            onChange={(reality) =>
                              updateReview(j, { ...review, reality: reality as typeof review.reality })
                            }
                          />
                          <RichField
                            label={value.reviewLabels.help}
                            value={review.help}
                            onChange={(help) =>
                              updateReview(j, { ...review, help: help as typeof review.help })
                            }
                          />

                          <div>
                            <Label className="mb-3 block">Typical outcomes</Label>
                            <ListEditor
                              items={review.outcomes}
                              onChange={(outcomes) => updateReview(j, { ...review, outcomes })}
                              itemLabel={(o, k) => o || `Outcome ${k + 1}`}
                              createItem={() => ""}
                              min={1}
                              max={8}
                              addLabel="Add outcome"
                              renderItem={(outcome, k) => (
                                <TextField
                                  id={`${idBase}-outcome-${k}`}
                                  label={`Outcome ${k + 1}`}
                                  value={outcome}
                                  onChange={(next) =>
                                    updateReview(j, {
                                      ...review,
                                      outcomes: review.outcomes.map((o, idx) =>
                                        idx === k ? next : o
                                      ),
                                    })
                                  }
                                />
                              )}
                            />
                          </div>
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
            );
          }}
        />
      </div>

      <fieldset className="space-y-4">
        <legend className="mb-1 text-sm font-medium text-foreground">Closing</legend>
        <TextField
          id="bc-closing-heading"
          label="Heading"
          value={value.closing.heading}
          onChange={(heading) => setValue({ ...value, closing: { ...value.closing, heading } })}
        />
        <RichField
          label="Body"
          value={value.closing.body}
          onChange={(body) =>
            setValue({ ...value, closing: { ...value.closing, body: body as typeof value.closing.body } })
          }
        />
        <CtaField
          idPrefix="bc-closing-cta"
          legend="Button"
          value={value.closing.cta}
          onChange={(cta) => setValue({ ...value, closing: { ...value.closing, cta } })}
        />
      </fieldset>

      <SeoField
        idPrefix="bc-seo"
        value={value.seo}
        onChange={(seo) => setValue({ ...value, seo })}
      />
    </SectionEditorLayout>
  );
}
