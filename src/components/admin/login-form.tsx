"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, type LoginState } from "@/app/actions/auth";

const initialState: LoginState = { status: "idle" };

const fieldClass = "h-12 rounded-xl bg-background";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);
  const [showPassword, setShowPassword] = useState(false);

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
          className={fieldClass}
          aria-invalid={!!state.fieldErrors?.email}
          aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
        />
        {state.fieldErrors?.email && (
          <p id="email-error" className="text-sm text-destructive">
            {state.fieldErrors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/login/forgot"
            className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-sage focus-visible:text-sage focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            className={`${fieldClass} pr-11`}
            aria-invalid={!!state.fieldErrors?.password}
            aria-describedby={state.fieldErrors?.password ? "password-error" : undefined}
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
        {state.fieldErrors?.password && (
          <p id="password-error" className="text-sm text-destructive">
            {state.fieldErrors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center rounded-full bg-primary py-3.5 text-base font-medium text-primary-foreground transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        {isPending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
