"use client";

import { useActionState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState
  );

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-xl border border-sage/40 bg-sage/5 p-8"
      >
        <CheckCircle2 className="size-8 text-sage" aria-hidden />
        <h3 className="text-lg font-semibold text-foreground">
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
          className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          <AlertCircle className="size-4 shrink-0" aria-hidden />
          {state.message}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          error={state.fieldErrors?.name}
          required
        >
          <Input
            id="name"
            name="name"
            autoComplete="name"
            aria-required
            aria-invalid={!!state.fieldErrors?.name}
            aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
          />
        </Field>

        <Field
          id="email"
          label="Email"
          error={state.fieldErrors?.email}
          required
        >
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-required
            aria-invalid={!!state.fieldErrors?.email}
            aria-describedby={
              state.fieldErrors?.email ? "email-error" : undefined
            }
          />
        </Field>
      </div>

      <Field id="company" label="Company" optional error={state.fieldErrors?.company}>
        <Input
          id="company"
          name="company"
          autoComplete="organization"
          aria-invalid={!!state.fieldErrors?.company}
          aria-describedby={
            state.fieldErrors?.company ? "company-error" : undefined
          }
        />
      </Field>

      <Field
        id="message"
        label="How can I help?"
        error={state.fieldErrors?.message}
        required
      >
        <Textarea
          id="message"
          name="message"
          rows={5}
          aria-required
          aria-invalid={!!state.fieldErrors?.message}
          aria-describedby={
            state.fieldErrors?.message ? "message-error" : undefined
          }
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

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="h-12 w-full px-6 text-base sm:w-auto"
      >
        {isPending ? "Sending…" : "Send message"}
      </Button>
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
