import type { Metadata } from "next";

import { SiteRenderer } from "@/components/site-renderer";
import { getPublishedContent } from "@/lib/content/queries";

export async function generateMetadata(): Promise<Metadata> {
  const { howIWork } = await getPublishedContent();
  return {
    title: howIWork.seo.metaTitle,
    description: howIWork.seo.metaDescription,
    openGraph: {
      title: howIWork.seo.metaTitle,
      description: howIWork.seo.metaDescription,
      url: "/how-i-work",
    },
  };
}

export default async function HowIWorkRoute() {
  const content = await getPublishedContent();
  return <SiteRenderer content={content} page="howIWork" />;
}
