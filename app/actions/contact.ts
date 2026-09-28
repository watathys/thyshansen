"use server";

import { Resend } from "resend";

export interface ContactState {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    name?: string;
    email?: string;
    message?: string;
  };
}

export async function submitContactForm(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot check for spam bots
  const honeypot = formData.get("website") as string;
  if (honeypot && honeypot.trim().length > 0) {
    // Pretend success so bots are tricked
    return { success: true };
  }

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  // Field level validation
  const fieldErrors: { name?: string; email?: string; message?: string } = {};

  if (!name || name.length < 2) {
    fieldErrors.name = "Please enter your name (at least 2 characters).";
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  if (!message || message.length < 5) {
    fieldErrors.message = "Please enter a message (at least 5 characters).";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      fieldErrors,
      error: "Please fix the errors in the form.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("ℹ️ [Dev Mode] RESEND_API_KEY not configured. Contact submission:", {
      name,
      email,
      message,
    });
    return {
      success: true,
    };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "watathys@gmail.com",
      replyTo: email,
      subject: `New Portfolio Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return { success: true };
  } catch (err: unknown) {
    console.error("Failed to send contact email via Resend:", err);
    return {
      success: false,
      error: "Unable to send your message right now. Please try emailing directly.",
    };
  }
}
