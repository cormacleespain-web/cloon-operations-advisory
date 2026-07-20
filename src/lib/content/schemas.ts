import { z } from "zod";

import { ICONS } from "./icons";

export const href = z
  .string()
  .trim()
  .min(1, "Enter a link.")
  .max(500)
  .regex(
    /^(https?:\/\/|mailto:|#|\/)/,
    "Must be a web address (https://…), an email link (mailto:…), a page link (/…), or an on-page link (#…)."
  );

const linkMark = z.object({
  type: z.literal("link"),
  attrs: z.object({ href }),
});
const mark = z.discriminatedUnion("type", [
  z.object({ type: z.literal("bold") }),
  z.object({ type: z.literal("italic") }),
  linkMark,
]);

const textNode = z.object({
  type: z.literal("text"),
  text: z.string(),
  marks: z.array(mark).optional(),
});

const paragraph = z.object({
  type: z.literal("paragraph"),
  content: z.array(textNode).optional(),
});

/** Multi-paragraph rich text — TipTap JSON, allowlisted to paragraph/text/bold/italic/link. */
export const richText = z.object({
  type: z.literal("doc"),
  content: z.array(paragraph).min(1),
});
export type RichText = z.infer<typeof richText>;

/** Single-line rich text for headings — one paragraph only, no block breaks. */
export const richInline = z.object({
  type: z.literal("doc"),
  content: z.tuple([paragraph]),
});
export type RichInline = z.infer<typeof richInline>;

const shortText = (max: number, label: string) =>
  z.string().trim().min(1, `${label} is required.`).max(max, `${label} is too long.`);

const cta = z.object({
  label: shortText(60, "Button label"),
  href,
});

export const iconKey = z.enum(Object.keys(ICONS) as [string, ...string[]]);

// --- Section schemas ---

export const heroSchema = z.object({
  eyebrow: shortText(80, "Eyebrow"),
  headingLine1: shortText(80, "Heading (first line)"),
  headingLine2: richInline,
  subheading: richText,
  primaryCta: cta,
  secondaryCta: cta,
});
export type HeroContent = z.infer<typeof heroSchema>;

export const servicesSchema = z.object({
  eyebrow: shortText(80, "Eyebrow"),
  heading: shortText(160, "Heading"),
  intro: richText,
  items: z
    .array(
      z.object({
        icon: iconKey,
        title: shortText(80, "Title"),
        body: richText,
      })
    )
    .min(1, "Add at least one service.")
    .max(8, "Up to 8 services."),
});
export type ServicesContent = z.infer<typeof servicesSchema>;

export const approachSchema = z.object({
  eyebrow: shortText(80, "Eyebrow"),
  heading: shortText(160, "Heading"),
  intro: richText,
  steps: z
    .array(
      z.object({
        title: shortText(80, "Title"),
        body: richText,
      })
    )
    .min(1, "Add at least one step.")
    .max(8, "Up to 8 steps."),
});
export type ApproachContent = z.infer<typeof approachSchema>;

export const aboutSchema = z.object({
  eyebrow: shortText(80, "Eyebrow"),
  heading: richInline,
  paragraphs: z.array(richText).min(1, "Add at least one paragraph.").max(6),
  image: z
    .object({
      url: z.string().url(),
      alt: shortText(200, "Alt text"),
    })
    .nullable(),
});
export type AboutContent = z.infer<typeof aboutSchema>;

export const positioningSchema = z.object({
  heading: richInline,
  pillars: z
    .array(
      z.object({
        title: shortText(80, "Title"),
        body: shortText(300, "Description"),
      })
    )
    .min(1, "Add at least one pillar.")
    .max(6),
  cta,
});
export type PositioningContent = z.infer<typeof positioningSchema>;

export const contactSchema = z.object({
  eyebrow: shortText(80, "Eyebrow"),
  heading: shortText(160, "Heading"),
  intro: richText,
  methods: z
    .array(
      z.object({
        icon: iconKey,
        label: shortText(60, "Label"),
        value: shortText(160, "Value"),
        href: href.nullable(),
      })
    )
    .min(1, "Add at least one contact method.")
    .max(6),
});
export type ContactContent = z.infer<typeof contactSchema>;

export const navigationSchema = z.object({
  items: z
    .array(
      z.object({
        label: shortText(40, "Label"),
        href,
      })
    )
    .min(1)
    .max(6),
  cta,
});
export type NavigationContent = z.infer<typeof navigationSchema>;

export const footerSchema = z.object({
  tagline: richText,
  links: z
    .array(
      z.object({
        label: shortText(40, "Label"),
        href,
      })
    )
    .max(6),
  copyrightName: shortText(120, "Copyright name"),
  email: z.email("Enter a valid email address."),
});
export type FooterContent = z.infer<typeof footerSchema>;

export const settingsSchema = z.object({
  title: shortText(120, "Site title"),
  description: shortText(300, "Site description"),
  ogTitle: shortText(120, "Social share title"),
  ogDescription: shortText(300, "Social share description"),
});
export type SettingsContent = z.infer<typeof settingsSchema>;

export const seoSchema = z.object({
  metaTitle: shortText(70, "Meta title"),
  metaDescription: shortText(160, "Meta description"),
});
export type SeoContent = z.infer<typeof seoSchema>;

/** Shared page-hero shape for the three new subpages. `intro` is optional — My Story's hero has none. */
const pageHeroSchema = z.object({
  eyebrow: shortText(80, "Eyebrow"),
  heading: shortText(120, "Heading"),
  intro: richText.optional(),
});

export const homeIntroSchema = z.object({
  eyebrow: shortText(80, "Eyebrow"),
  heading: richInline,
  body: richText,
});
export type HomeIntroContent = z.infer<typeof homeIntroSchema>;

export const homeExperienceSchema = z.object({
  eyebrow: shortText(80, "Eyebrow"),
  heading: richInline,
  paragraphs: z.array(richText).min(1, "Add at least one paragraph.").max(6),
  image: z
    .object({
      url: z.string().url(),
      alt: shortText(200, "Alt text"),
    })
    .nullable(),
});
export type HomeExperienceContent = z.infer<typeof homeExperienceSchema>;

export const homeTeasersSchema = z.object({
  eyebrow: shortText(80, "Eyebrow"),
  heading: shortText(160, "Heading"),
  items: z
    .array(
      z.object({
        title: shortText(80, "Title"),
        body: richText,
        cta,
      })
    )
    .min(1, "Add at least one teaser.")
    .max(4, "Up to 4 teasers."),
});
export type HomeTeasersContent = z.infer<typeof homeTeasersSchema>;

const reviewLabelsSchema = z.object({
  symptoms: shortText(120, "Symptoms heading"),
  reality: shortText(120, "Reality heading"),
  help: shortText(120, "Help heading"),
  outcomes: shortText(120, "Outcomes heading"),
});

const reviewSchema = z.object({
  title: shortText(120, "Review title"),
  symptoms: z.array(shortText(200, "Symptom quote")).min(1).max(8),
  reality: richText,
  help: richText,
  outcomes: z.array(shortText(160, "Outcome")).min(1).max(8),
});

export const businessChallengesSchema = z.object({
  hero: pageHeroSchema,
  pullQuote: richInline,
  reviewLabels: reviewLabelsSchema,
  areas: z
    .array(
      z.object({
        title: shortText(120, "Area title"),
        reviews: z.array(reviewSchema).min(1).max(4),
      })
    )
    .min(1)
    .max(4),
  closing: z.object({
    heading: shortText(160, "Heading"),
    body: richText,
    cta,
  }),
  seo: seoSchema,
});
export type BusinessChallengesContent = z.infer<typeof businessChallengesSchema>;

export const howIWorkSchema = z.object({
  hero: pageHeroSchema,
  experience: z.object({
    heading: shortText(160, "Heading"),
    body: richText,
  }),
  principles: z
    .array(
      z.object({
        title: shortText(80, "Title"),
        body: richText,
      })
    )
    .length(5, "Exactly 5 principles."),
  expectations: z.object({
    heading: shortText(160, "Heading"),
    items: z.array(shortText(160, "Item")).min(1).max(8),
  }),
  outcome: z.object({
    heading: shortText(160, "Heading"),
    body: richText,
  }),
  cta,
  seo: seoSchema,
});
export type HowIWorkContent = z.infer<typeof howIWorkSchema>;

export const myStorySchema = z.object({
  hero: pageHeroSchema,
  paragraphsBefore: z.array(richText).min(1).max(8),
  pullQuote: richInline,
  paragraphsAfter: z.array(richText).min(1).max(8),
  cta,
  seo: seoSchema,
});
export type MyStoryContent = z.infer<typeof myStorySchema>;

export const sectionSchemas = {
  hero: heroSchema,
  services: servicesSchema,
  approach: approachSchema,
  about: aboutSchema,
  positioning: positioningSchema,
  contact: contactSchema,
  navigation: navigationSchema,
  footer: footerSchema,
  settings: settingsSchema,
  homeIntro: homeIntroSchema,
  homeExperience: homeExperienceSchema,
  homeTeasers: homeTeasersSchema,
  businessChallenges: businessChallengesSchema,
  howIWork: howIWorkSchema,
  myStory: myStorySchema,
} as const;

export type SectionKey = keyof typeof sectionSchemas;
export const sectionKeys = Object.keys(sectionSchemas) as SectionKey[];

export type SectionContent<K extends SectionKey> = z.infer<(typeof sectionSchemas)[K]>;

// --- Doc builders (used by defaults.ts and editors to build TipTap-shaped JSON) ---

type DocPart = { text: string; italic?: boolean };

function partsToTextNodes(parts: DocPart[]) {
  return parts.map((p) => ({
    type: "text" as const,
    text: p.text,
    ...(p.italic ? { marks: [{ type: "italic" as const }] } : {}),
  }));
}

/** Build multi-paragraph rich text from plain paragraphs (split on blank lines). */
export function docFromText(text: string): RichText {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  return {
    type: "doc",
    content: paragraphs.map((p) => ({
      type: "paragraph" as const,
      content: [{ type: "text" as const, text: p }],
    })),
  };
}

/** Build a single-line inline doc, optionally from mixed plain/italic parts. */
export function inlineDocFromParts(parts: DocPart[]): RichInline {
  return {
    type: "doc",
    content: [{ type: "paragraph", content: partsToTextNodes(parts) }],
  };
}

/** Build a multi-paragraph doc from per-paragraph part lists, optionally with italic marks. */
export function docFromParts(paragraphs: DocPart[][]): RichText {
  return {
    type: "doc",
    content: paragraphs.map((parts) => ({
      type: "paragraph" as const,
      content: partsToTextNodes(parts),
    })),
  };
}

/** An empty multi-paragraph doc, for seeding new list items in the editor. */
export function emptyRichText(): RichText {
  return { type: "doc", content: [{ type: "paragraph", content: [] }] };
}

/** An empty single-line doc, for seeding new list items in the editor. */
export function emptyRichInline(): RichInline {
  return { type: "doc", content: [{ type: "paragraph", content: [] }] };
}
