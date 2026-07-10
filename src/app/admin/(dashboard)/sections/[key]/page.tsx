import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDraftContent } from "@/lib/content/queries";
import { HeroEditor } from "@/components/admin/editors/hero-editor";
import { ServicesEditor } from "@/components/admin/editors/services-editor";
import { ApproachEditor } from "@/components/admin/editors/approach-editor";
import { AboutEditor } from "@/components/admin/editors/about-editor";
import { PositioningEditor } from "@/components/admin/editors/positioning-editor";
import { ContactEditor } from "@/components/admin/editors/contact-editor";

export const metadata: Metadata = { robots: { index: false, follow: false } };

const HOMEPAGE_KEYS = ["hero", "services", "approach", "about", "positioning", "contact"] as const;
type HomepageKey = (typeof HOMEPAGE_KEYS)[number];

function isHomepageKey(key: string): key is HomepageKey {
  return (HOMEPAGE_KEYS as readonly string[]).includes(key);
}

export default async function SectionEditorPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  if (!isHomepageKey(key)) notFound();

  switch (key) {
    case "hero":
      return <HeroEditor initial={await getDraftContent("hero")} />;
    case "services":
      return <ServicesEditor initial={await getDraftContent("services")} />;
    case "approach":
      return <ApproachEditor initial={await getDraftContent("approach")} />;
    case "about":
      return <AboutEditor initial={await getDraftContent("about")} />;
    case "positioning":
      return <PositioningEditor initial={await getDraftContent("positioning")} />;
    case "contact":
      return <ContactEditor initial={await getDraftContent("contact")} />;
  }
}
