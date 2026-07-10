import { docFromText, inlineDocFromParts } from "./schemas";
import type {
  AboutContent,
  ApproachContent,
  ContactContent,
  FooterContent,
  HeroContent,
  NavigationContent,
  PositioningContent,
  ServicesContent,
  SettingsContent,
} from "./schemas";

/**
 * Current site copy, as typed defaults. These are the fallback whenever a
 * `content_sections` row is missing or fails validation — the public site
 * can never break from bad or absent CMS data.
 */

export const heroDefault: HeroContent = {
  eyebrow: "Supply Chain & Operations Advisory",
  headingLine1: "Clearer operations.",
  headingLine2: inlineDocFromParts([
    { text: "Stronger", italic: true },
    { text: " supply chains." },
  ]),
  subheading: docFromText(
    "Cloon Operations Advisory helps manufacturers and growing businesses untangle their supply chain and operations — turning day-to-day firefighting into steady, dependable performance."
  ),
  primaryCta: { label: "Start a conversation", href: "#contact" },
  secondaryCta: { label: "See how I work", href: "#approach" },
};

export const servicesDefault: ServicesContent = {
  eyebrow: "What I do",
  heading: "Advisory across the operation, not just one corner of it",
  intro: docFromText(
    "Every engagement is shaped around where you actually are — a targeted fix, a broader programme, or a steady hand alongside your team."
  ),
  items: [
    {
      icon: "workflow",
      title: "Supply Chain Strategy",
      body: docFromText(
        "Map your sourcing, network and inventory end to end — then build a plan that balances cost, service and resilience against real-world disruption."
      ),
    },
    {
      icon: "gauge",
      title: "Operations Improvement",
      body: docFromText(
        "Find where throughput, quality and cost are leaking on the shop floor, and put practical, lean-informed changes in place that stick."
      ),
    },
    {
      icon: "lineChart",
      title: "Planning & S&OP",
      body: docFromText(
        "Bring demand, supply and finance into one conversation with a planning rhythm that reduces firefighting and improves forecast accuracy."
      ),
    },
    {
      icon: "lifeBuoy",
      title: "Interim & Advisory",
      body: docFromText(
        "Hands-on operational support when you need an extra pair of experienced hands — from a specific project to steadying a team through change."
      ),
    },
  ],
};

export const approachDefault: ApproachContent = {
  eyebrow: "How I work",
  heading: "A grounded, practical way of working",
  intro: docFromText(
    "No thick reports left on a shelf. Just clear diagnosis, sensible priorities, and changes that make the day-to-day genuinely easier."
  ),
  steps: [
    {
      title: "Listen & diagnose",
      body: docFromText(
        "We start on the ground — walking the operation, talking to the people doing the work, and looking honestly at the numbers to find what's really driving the pain."
      ),
    },
    {
      title: "Prioritise what matters",
      body: docFromText(
        "Not everything is worth fixing at once. Together we agree the handful of changes that will move the needle most for cost, service and sanity."
      ),
    },
    {
      title: "Make it happen",
      body: docFromText(
        "Plans are worth little without follow-through. I work alongside your team to implement changes, build the routines, and make sure they hold."
      ),
    },
    {
      title: "Hand back stronger",
      body: docFromText(
        "The goal is a capable, confident team — not a dependency on me. I leave you with the tools and habits to keep improving on your own."
      ),
    },
  ],
};

export const aboutDefault: AboutContent = {
  eyebrow: "About",
  heading: inlineDocFromParts([
    { text: "Hello, I'm " },
    { text: "Conor Lee", italic: true },
  ]),
  paragraphs: [
    docFromText(
      "I've spent [X years] in supply chain and operations across [industries — e.g. medical devices, food, manufacturing], working through the messy reality of making, moving and delivering product when things rarely go to plan."
    ),
    docFromText(
      "Cloon is named for [home place / townland] in the Burren — a landscape of grey limestone and green pasture that says a lot about how I work: grounded, straightforward, and built to last. My background blends [engineering / operations qualification] with years on real shop floors, so the advice is practical, not theoretical."
    ),
    docFromText(
      "I set up Cloon Operations Advisory to bring that experience to businesses that need clarity and momentum — without the overhead of a big consultancy."
    ),
  ],
  image: null,
};

export const positioningDefault: PositioningContent = {
  heading: inlineDocFromParts([
    {
      text: "The kind of advisor you actually want in the room when it's not going to plan.",
    },
  ]),
  pillars: [
    {
      title: "Independent",
      body: "Straight advice with no product to sell and no agenda but yours.",
    },
    {
      title: "Hands-on",
      body: "In the operation with your team, not observing from a distance.",
    },
    {
      title: "Grounded",
      body: "Practical changes that work on a real shop floor, not just on paper.",
    },
  ],
  cta: { label: "Start a conversation", href: "#contact" },
};

export const contactDefault: ContactContent = {
  eyebrow: "Get in touch",
  heading: "Let's talk about your operation",
  intro: docFromText(
    "Whether you have a specific problem in mind or just want a second opinion, drop a note or reach out directly. No hard sell — just a conversation."
  ),
  methods: [
    { icon: "mail", label: "Email", value: "hello@cloon.ie", href: "mailto:hello@cloon.ie" },
    { icon: "linkedin", label: "LinkedIn", value: "Conor Lee", href: "https://www.linkedin.com/" },
    { icon: "mapPin", label: "Based in", value: "Co. Clare, Ireland", href: null },
  ],
};

export const navigationDefault: NavigationContent = {
  items: [
    { label: "Services", href: "#services" },
    { label: "Approach", href: "#approach" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  cta: { label: "Get in touch", href: "#contact" },
};

export const footerDefault: FooterContent = {
  tagline: docFromText(
    "Practical supply chain and operations advisory, rooted in the West of Ireland and built on hands-on experience."
  ),
  links: [
    { label: "Services", href: "#services" },
    { label: "Approach", href: "#approach" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  copyrightName: "Cloon Operations Advisory",
  email: "hello@cloon.ie",
};

export const settingsDefault: SettingsContent = {
  title: "Cloon Operations Advisory — Supply Chain & Operations Consulting",
  description:
    "Cloon Operations Advisory helps businesses strengthen their supply chain and operations — practical, grounded advisory led by Conor Lee.",
  ogTitle: "Cloon Operations Advisory",
  ogDescription: "Practical supply chain and operations advisory led by Conor Lee.",
};

export const defaults = {
  hero: heroDefault,
  services: servicesDefault,
  approach: approachDefault,
  about: aboutDefault,
  positioning: positioningDefault,
  contact: contactDefault,
  navigation: navigationDefault,
  footer: footerDefault,
  settings: settingsDefault,
};
