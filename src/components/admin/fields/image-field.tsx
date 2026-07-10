"use client";

import Image from "next/image";
import { ImageOff } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MediaPicker } from "@/components/admin/media/media-picker";

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: { url: string; alt: string } | null;
  onChange: (value: { url: string; alt: string } | null) => void;
}) {
  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      {value ? (
        <div className="space-y-3">
          <div className="relative aspect-4/5 w-40 overflow-hidden rounded-xl border border-border bg-muted">
            <Image src={value.url} alt={value.alt} fill className="object-cover" sizes="160px" />
          </div>
          <Input
            value={value.alt}
            onChange={(e) => onChange({ ...value, alt: e.target.value })}
            placeholder="Describe the image for screen readers"
            className="h-11 w-full max-w-sm rounded-xl bg-background"
            aria-label="Image alt text"
          />
          <div className="flex gap-2">
            <MediaPicker onSelect={(item) => onChange({ url: item.url, alt: item.alt })}>
              Replace image
            </MediaPicker>
            <Button type="button" variant="outline" size="sm" onClick={() => onChange(null)}>
              Remove image
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex max-w-sm flex-col gap-3">
          <div className="flex aspect-4/5 w-40 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border text-muted-foreground">
            <ImageOff className="size-6" strokeWidth={1.5} aria-hidden />
            <span className="text-xs">No image</span>
          </div>
          <MediaPicker onSelect={(item) => onChange({ url: item.url, alt: item.alt })}>
            Choose image
          </MediaPicker>
        </div>
      )}
    </div>
  );
}
