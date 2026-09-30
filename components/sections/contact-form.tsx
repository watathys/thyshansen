"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = {};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  return (
    <div className="w-full rounded-2xl border border-border bg-card-bg p-6 sm:p-8">
      <h3 className="text-xl font-bold tracking-tight text-foreground">
        Send a direct message
      </h3>
      <p className="mt-1 text-sm text-muted">
        Have a product role, project idea, or opportunity? Fill out the form below.
      </p>

      {state.success ? (
        <div className="mt-6 rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-5 text-emerald-300">
          <div className="flex items-center gap-2 font-semibold">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Message Sent Successfully!
          </div>
          <p className="mt-1 text-xs leading-relaxed text-emerald-300/90">
            Thank you for reaching out. I&apos;ve received your message and will get back to you shortly.
          </p>
        </div>
      ) : (
        <form action={formAction} className="mt-6 space-y-5" noValidate>
          {/* Honeypot Spam Prevention Field (hidden from real users) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Form General Error */}
          {state.error ? (
            <div className="rounded-lg border border-red-400/25 bg-red-400/10 p-3 text-xs font-semibold text-red-300">
              {state.error}
            </div>
          ) : null}

          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-semibold uppercase tracking-wider text-foreground"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="e.g. Sarah Jenkins"
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {state.fieldErrors?.name ? (
              <p className="mt-1 text-xs font-medium text-red-500">
                {state.fieldErrors.name}
              </p>
            ) : null}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-foreground"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="e.g. sarah@company.com"
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {state.fieldErrors?.email ? (
              <p className="mt-1 text-xs font-medium text-red-500">
                {state.fieldErrors.email}
              </p>
            ) : null}
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-semibold uppercase tracking-wider text-foreground"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Hi Thys, I saw Junbi and would love to talk about a PM role at..."
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {state.fieldErrors?.message ? (
              <p className="mt-1 text-xs font-medium text-red-500">
                {state.fieldErrors.message}
              </p>
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-auto"
          >
            {isPending ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin text-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Sending message...</span>
              </>
            ) : (
              <span>Send Message</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
