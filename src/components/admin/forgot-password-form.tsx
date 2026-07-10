"use client";

import { useActionState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestPasswordReset, type ForgotState } from "@/app/actions/auth";

const initialState: ForgotState = { status: "idle" };

export function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(requestPasswordReset, initialState);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-2xl border border-sage/40 bg-sage/5 p-6"
      >
        <CheckCircle2 className="size-6 text-sage" strokeWidth={1.5} aria-hidden />
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

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="h-12 rounded-xl bg-background"
          aria-invalid={!!state.fieldErrors?.email}
          aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
        />
        {state.fieldErrors?.email && (
          <p id="email-error" className="text-sm text-destructive">
            {state.fieldErrors.email}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center rounded-full bg-primary py-3.5 text-base font-medium text-primary-foreground transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        {isPending ? "Sending…" : "Send reset link"}
      </button>
    </form>
  );
}
