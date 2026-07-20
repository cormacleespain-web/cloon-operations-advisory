import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TextField } from "./text-field";
import type { SeoContent } from "@/lib/content/schemas";

export function SeoField({
  idPrefix,
  value,
  onChange,
}: {
  idPrefix: string;
  value: SeoContent;
  onChange: (value: SeoContent) => void;
}) {
  return (
    <fieldset className="space-y-4 rounded-2xl border border-border bg-card p-5">
      <legend className="px-1 text-sm font-medium text-foreground">Search & sharing</legend>
      <TextField
        id={`${idPrefix}-meta-title`}
        label="Meta title"
        value={value.metaTitle}
        onChange={(metaTitle) => onChange({ ...value, metaTitle })}
        maxLength={70}
      />
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-meta-description`}>Meta description</Label>
        <Textarea
          id={`${idPrefix}-meta-description`}
          value={value.metaDescription}
          onChange={(e) => onChange({ ...value, metaDescription: e.target.value })}
          maxLength={160}
          rows={2}
          className="rounded-xl bg-background"
        />
      </div>
    </fieldset>
  );
}
