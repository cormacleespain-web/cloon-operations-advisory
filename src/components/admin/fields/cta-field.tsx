import { TextField } from "./text-field";

export function CtaField({
  idPrefix,
  legend,
  value,
  onChange,
}: {
  idPrefix: string;
  legend: string;
  value: { label: string; href: string };
  onChange: (value: { label: string; href: string }) => void;
}) {
  return (
    <fieldset className="grid gap-4 sm:grid-cols-2">
      <legend className="mb-2 text-sm font-medium text-foreground sm:col-span-2">{legend}</legend>
      <TextField
        id={`${idPrefix}-label`}
        label="Button text"
        value={value.label}
        onChange={(label) => onChange({ ...value, label })}
      />
      <TextField
        id={`${idPrefix}-href`}
        label="Link"
        value={value.href}
        onChange={(href) => onChange({ ...value, href })}
        placeholder="#contact"
      />
    </fieldset>
  );
}
