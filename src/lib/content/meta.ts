import type { SectionKey } from "./schemas";

export const sectionMeta: Record<SectionKey, { title: string; description: string; group: "Homepage" | "Site" }> = {
  hero: {
    title: "Opening section",
    description: "The first thing visitors see — headline, intro and buttons.",
    group: "Homepage",
  },
  services: {
    title: "Services",
    description: "What you do — the list of service cards.",
    group: "Homepage",
  },
  approach: {
    title: "How I work",
    description: "The step-by-step engagement process.",
    group: "Homepage",
  },
  about: {
    title: "About",
    description: "Your story, photo, and background.",
    group: "Homepage",
  },
  positioning: {
    title: "Why Cloon",
    description: "The closing pitch and three pillars.",
    group: "Homepage",
  },
  contact: {
    title: "Contact",
    description: "Contact intro and direct contact methods.",
    group: "Homepage",
  },
  navigation: {
    title: "Navigation",
    description: "The menu links shown in the header.",
    group: "Site",
  },
  footer: {
    title: "Footer",
    description: "Footer tagline, links, and copyright details.",
    group: "Site",
  },
  settings: {
    title: "Site details",
    description: "Page title and description used for search and social sharing.",
    group: "Site",
  },
};
