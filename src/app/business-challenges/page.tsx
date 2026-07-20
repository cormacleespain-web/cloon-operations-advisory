import type { Metadata } from "next";

import { SiteRenderer } from "@/components/site-renderer";
import { getPublishedContent } from "@/lib/content/queries";

export async function generateMetadata(): Promise<Metadata> {
  const { businessChallenges } = await getPublishedContent();
  return {
    title: businessChallenges.seo.metaTitle,
    description: businessChallenges.seo.metaDescription,
    openGraph: {
      title: businessChallenges.seo.metaTitle,
      description: businessChallenges.seo.metaDescription,
      url: "/business-challenges",
    },
  };
}

export default async function BusinessChallengesRoute() {
  const content = await getPublishedContent();
  return <SiteRenderer content={content} page="businessChallenges" />;
}
