"use client";

import { useActionState } from "react";
import { CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { status: "idle" };

const fieldClass = "h-12 rounded-xl bg-background";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState
  );

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-2xl border border-sage/40 bg-sage/5 p-8"
      >
        <CheckCircle2 className="size-8 text-sage" strokeWidth={1.5} aria-hidden />
        <h3 className="font-display text-xl font-medium text-foreground">
          Message sent
        </h3>
        <p className="text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          <AlertCircle className="size-4 shrink-0" strokeWidth={1.5} aria-hidden />
          {state.message}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={state.fieldErrors?.name} required>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            className={fieldClass}
            aria-required
            aria-invalid={!!state.fieldErrors?.name}
            aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
          />
        </Field>

        <Field id="email" label="Email" error={state.fieldErrors?.email} required>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            aria-required
            aria-invalid={!!state.fieldErrors?.email}
            aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
          />
        </Field>
      </div>

      <Field id="company" label="Company" optional error={state.fieldErrors?.company}>
        <Input
          id="company"
          name="company"
          autoComplete="organization"
          className={fieldClass}
          aria-invalid={!!state.fieldErrors?.company}
          aria-describedby={state.fieldErrors?.company ? "company-error" : undefined}
        />
      </Field>

      <Field id="message" label="How can I help?" error={state.fieldErrors?.message} required>
        <Textarea
          id="message"
          name="message"
          rows={5}
          className="rounded-xl bg-background"
          aria-required
          aria-invalid={!!state.fieldErrors?.message}
          aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
        />
      </Field>

      {/* Honeypot — hidden from users and assistive tech, catches bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Leave this field empty</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary py-2 pl-6 pr-2 text-base font-medium text-primary-foreground transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:w-auto"
      >
        {isPending ? "Sending…" : "Send message"}
        <span className="flex size-9 items-center justify-center rounded-full bg-background/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden />
        </span>
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  required,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center gap-1.5">
        {label}
        {required && (
          <span className="text-destructive" aria-hidden>
            *
          </span>
        )}
        {optional && (
          <span className="text-xs font-normal text-muted-foreground">
            (optional)
          </span>
        )}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className={cn("text-sm text-destructive")}>
          {error}
        </p>
      )}
    </div>
  );
}
