"use client";

import { track } from "@vercel/analytics";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";
import { submitContactBrief } from "@/app/actions/contact";
import type { Locale } from "@/content/portfolio";
import { getDictionary } from "@/content/ui";
import { initialContactState } from "@/lib/contact";

export function ContactForm({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const action = submitContactBrief.bind(null, locale);
  const [state, formAction, pending] = useActionState(
    action,
    initialContactState,
  );
  const [startedAt] = useState(() => Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      track("brief_submit", { locale, category: "project_inquiry" });
    }
  }, [locale, state.status]);

  const fieldError = (name: string) => Boolean(state.fieldErrors?.[name]);

  return (
    <form ref={formRef} action={formAction} className="brief-form" noValidate>
      <input type="hidden" name="startedAt" value={startedAt} />
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-grid">
        <label>
          <span>{dictionary.form.name}</span>
          <input
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={80}
            aria-invalid={fieldError("name")}
          />
        </label>
        <label>
          <span>{dictionary.form.reply}</span>
          <input
            name="reply"
            autoComplete="email"
            required
            maxLength={140}
            aria-invalid={fieldError("reply")}
          />
        </label>
      </div>
      <div className="form-grid">
        <label>
          <span>{dictionary.form.company}</span>
          <input name="company" autoComplete="organization" maxLength={100} />
        </label>
        <label>
          <span>{dictionary.form.category}</span>
          <select name="category" defaultValue="unsure">
            <option value="product">{dictionary.form.product}</option>
            <option value="automation">{dictionary.form.automation}</option>
            <option value="reliability">{dictionary.form.reliability}</option>
            <option value="unsure">{dictionary.form.unsure}</option>
          </select>
        </label>
      </div>
      <label>
        <span>{dictionary.form.message}</span>
        <textarea
          name="message"
          required
          minLength={20}
          maxLength={2000}
          rows={6}
          placeholder={dictionary.form.placeholder}
          aria-invalid={fieldError("message")}
        />
      </label>
      <div className="form-submit-row">
        <button type="submit" disabled={pending}>
          {pending ? (
            <LoaderCircle className="submit-spinner" aria-hidden="true" size={18} />
          ) : (
            <ArrowUpRight aria-hidden="true" size={18} />
          )}
          {pending ? dictionary.form.sending : dictionary.form.submit}
        </button>
        <p className={`form-state form-state-${state.status}`} aria-live="polite">
          {state.status === "success" ? dictionary.form.success : null}
          {state.status === "failed" ? dictionary.form.failed : null}
          {state.status === "invalid" ? dictionary.form.invalid : null}
        </p>
      </div>
    </form>
  );
}
