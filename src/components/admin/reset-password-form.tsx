"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword, type ResetState } from "@/app/actions/auth";

const initialState: ResetState = { status: "idle" };

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction, isPending] = useActionState(resetPassword, initialState);
  const [showPassword, setShowPassword] = useState(false);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-2xl border border-sage/40 bg-sage/5 p-6"
      >
        <CheckCircle2 className="size-6 text-sage" strokeWidth={1.5} aria-hidden />
        <p className="text-muted-foreground">{state.message}</p>
        <Link
          href="/login"
          className="text-sm font-medium text-sage underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <input type="hidden" name="token" value={token} />

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
        <Label htmlFor="password">New password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            minLength={12}
            className="h-12 rounded-xl bg-background pr-11"
            aria-invalid={!!state.fieldErrors?.password}
            aria-describedby="password-hint password-error"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-pressed={showPassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {showPassword ? (
              <EyeOff className="size-4" strokeWidth={1.75} aria-hidden />
            ) : (
              <Eye className="size-4" strokeWidth={1.75} aria-hidden />
            )}
          </button>
        </div>
        <p id="password-hint" className="text-sm text-muted-foreground">
          At least 12 characters.
        </p>
        {state.fieldErrors?.password && (
          <p id="password-error" className="text-sm text-destructive">
            {state.fieldErrors.password}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          required
          className="h-12 rounded-xl bg-background"
          aria-invalid={!!state.fieldErrors?.confirmPassword}
          aria-describedby={state.fieldErrors?.confirmPassword ? "confirm-error" : undefined}
        />
        {state.fieldErrors?.confirmPassword && (
          <p id="confirm-error" className="text-sm text-destructive">
            {state.fieldErrors.confirmPassword}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center rounded-full bg-primary py-3.5 text-base font-medium text-primary-foreground transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        {isPending ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}
