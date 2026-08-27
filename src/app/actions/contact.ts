"use server";

import { Resend } from "resend";
import { z } from "zod";
import { isLocale, type Locale } from "@/content/portfolio";
import type { ContactFormState } from "@/lib/contact";

const replySchema = z.string().trim().min(5).max(140).refine(
  (value) =>
    z.string().email().safeParse(value).success ||
    /^\+?[\d\s().-]{7,}$/.test(value),
  "Enter a valid email address or WhatsApp number.",
);

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  reply: replySchema,
  company: z.string().trim().max(100).optional(),
  category: z.enum(["product", "automation", "reliability", "unsure"]),
  message: z.string().trim().min(20).max(2000),
  website: z.string().max(0),
  startedAt: z.coerce.number().int().positive(),
});

export async function submitContactBrief(
  requestedLocale: Locale,
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";
  const result = contactSchema.safeParse({
    name: formData.get("name"),
    reply: formData.get("reply"),
    company: formData.get("company") || undefined,
    category: formData.get("category"),
    message: formData.get("message"),
    website: formData.get("website") ?? "",
    startedAt: formData.get("startedAt"),
  });

  if (!result.success) {
    return {
      status: "invalid",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const elapsed = Date.now() - result.data.startedAt;
  if (elapsed < 2500 || elapsed > 86_400_000) {
    return { status: "invalid" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact brief delivery unavailable: RESEND_API_KEY is missing.");
    return { status: "failed" };
  }

  const replyTo = z.string().email().safeParse(result.data.reply).success
    ? result.data.reply
    : undefined;
  const resend = new Resend(apiKey);
  const subject = `Portfolio inquiry · ${result.data.category} · ${result.data.name}`;
  const body = [
    `Name: ${result.data.name}`,
    `Reply: ${result.data.reply}`,
    `Company: ${result.data.company || "Not provided"}`,
    `Category: ${result.data.category}`,
    `Locale: ${locale}`,
    "",
    result.data.message,
  ].join("\n");

  try {
    const response = await resend.emails.send({
      from:
        process.env.CONTACT_FROM_EMAIL ||
        "Fathallah Haj Portfolio <onboarding@resend.dev>",
      to: ["fatoh.haj@gmail.com"],
      replyTo,
      subject,
      text: body,
    });

    if (response.error) {
      console.error("Contact brief delivery failed:", response.error.name);
      return { status: "failed" };
    }

    return { status: "success" };
  } catch (error) {
    console.error(
      "Contact brief delivery failed:",
      error instanceof Error ? error.name : "UnknownError",
    );
    return { status: "failed" };
  }
}
