import { SiteRenderer } from "@/components/site-renderer";
import { getPublishedContent } from "@/lib/content/queries";

export default async function Home() {
  const content = await getPublishedContent();
  return <SiteRenderer content={content} />;
}
