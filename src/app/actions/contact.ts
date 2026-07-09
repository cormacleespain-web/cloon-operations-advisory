"use server";

import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address.").max(200),
  company: z.string().trim().max(120).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please add a little more detail (10+ characters).")
    .max(4000),
  // Honeypot — real users leave this empty.
  company_website: z.string().max(0).optional(),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "company" | "message", string>>;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") || undefined,
    message: formData.get("message"),
    company_website: formData.get("company_website") || undefined,
  });

  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<ContactState["fieldErrors"]>;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
    };
  }

  // Honeypot tripped — pretend success, send nothing.
  if (parsed.data.company_website) {
    return { status: "success", message: "Thanks — I'll be in touch soon." };
  }

  const { name, email, company, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Cloon Website <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL not set.");
    return {
      status: "error",
      message:
        "The contact form isn't fully configured yet. Please email hello@cloon.ie directly.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` (${company})` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("Resend send error:", error);
      return {
        status: "error",
        message: "Something went wrong sending your message. Please try again.",
      };
    }

    return {
      status: "success",
      message: "Thanks — your message is on its way. I'll be in touch soon.",
    };
  } catch (err) {
    console.error("Contact form unexpected error:", err);
    return {
      status: "error",
      message: "Something went wrong. Please email hello@cloon.ie directly.",
    };
  }
}
