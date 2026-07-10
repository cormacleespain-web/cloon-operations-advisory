"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ICONS, type IconKey } from "@/lib/content/icons";

export function IconPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (key: IconKey) => void;
}) {
  const Current = (value in ICONS ? ICONS[value as IconKey] : ICONS.compass).component;

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger
          render={
            <button
              type="button"
              aria-label={`${label}: choose icon`}
              className="inline-flex size-11 items-center justify-center rounded-xl border border-input bg-background text-foreground transition-colors hover:bg-muted focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            />
          }
        >
          <Current className="size-5" strokeWidth={1.5} aria-hidden />
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="grid grid-cols-6 gap-1">
            {(Object.entries(ICONS) as [IconKey, (typeof ICONS)[IconKey]][]).map(
              ([key, { component: Icon, label: iconLabel }]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => onChange(key)}
                  aria-label={iconLabel}
                  aria-pressed={key === value}
                  title={iconLabel}
                  className={cn(
                    "inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring",
                    key === value && "bg-sage/10 text-sage"
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.5} aria-hidden />
                </button>
              )
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
