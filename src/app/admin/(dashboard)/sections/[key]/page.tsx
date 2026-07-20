import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDraftContent } from "@/lib/content/queries";
import { HeroEditor } from "@/components/admin/editors/hero-editor";
import { ServicesEditor } from "@/components/admin/editors/services-editor";
import { ApproachEditor } from "@/components/admin/editors/approach-editor";
import { AboutEditor } from "@/components/admin/editors/about-editor";
import { PositioningEditor } from "@/components/admin/editors/positioning-editor";
import { ContactEditor } from "@/components/admin/editors/contact-editor";
import { HomeIntroEditor } from "@/components/admin/editors/home-intro-editor";
import { HomeExperienceEditor } from "@/components/admin/editors/home-experience-editor";
import { HomeTeasersEditor } from "@/components/admin/editors/home-teasers-editor";
import { BusinessChallengesEditor } from "@/components/admin/editors/business-challenges-editor";
import { HowIWorkEditor } from "@/components/admin/editors/how-i-work-editor";
import { MyStoryEditor } from "@/components/admin/editors/my-story-editor";

export const metadata: Metadata = { robots: { index: false, follow: false } };

const EDITOR_KEYS = [
  "hero",
  "services",
  "approach",
  "about",
  "positioning",
  "contact",
  "homeIntro",
  "homeExperience",
  "homeTeasers",
  "businessChallenges",
  "howIWork",
  "myStory",
] as const;
type EditorKey = (typeof EDITOR_KEYS)[number];

function isEditorKey(key: string): key is EditorKey {
  return (EDITOR_KEYS as readonly string[]).includes(key);
}

export default async function SectionEditorPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  if (!isEditorKey(key)) notFound();

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
    case "homeIntro":
      return <HomeIntroEditor initial={await getDraftContent("homeIntro")} />;
    case "homeExperience":
      return <HomeExperienceEditor initial={await getDraftContent("homeExperience")} />;
    case "homeTeasers":
      return <HomeTeasersEditor initial={await getDraftContent("homeTeasers")} />;
    case "businessChallenges":
      return <BusinessChallengesEditor initial={await getDraftContent("businessChallenges")} />;
    case "howIWork":
      return <HowIWorkEditor initial={await getDraftContent("howIWork")} />;
    case "myStory":
      return <MyStoryEditor initial={await getDraftContent("myStory")} />;
  }
}
