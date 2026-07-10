import type { Metadata } from "next";

import { SettingsEditor } from "@/components/admin/editors/settings-editor";
import { getDraftContent } from "@/lib/content/queries";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function SettingsPage() {
  const initial = await getDraftContent("settings");
  return <SettingsEditor initial={initial} />;
}
