import { Label } from "@/components/ui/label";
import { RichFieldEditor } from "@/components/admin/rich-field-editor";
import type { RichInline, RichText } from "@/lib/content/schemas";

export function RichField({
  label,
  value,
  onChange,
  inline = false,
}: {
  label: string;
  value: RichText | RichInline;
  onChange: (value: RichText | RichInline) => void;
  inline?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <RichFieldEditor value={value} onChange={onChange} inline={inline} aria-label={label} />
    </div>
  );
}
