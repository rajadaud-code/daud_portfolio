"use client";

import { AlertCircle, Check, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui";
import { site } from "@/content";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const accessKey =
    process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
    process.env.NEXT_PUBLIC_CONTACT_KEY ||
    "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      if (accessKey) {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            from_name: name,
            email: email,
            subject: subject || `Portfolio Inquiry from ${name}`,
            message: message,
            replyto: email,
          }),
        });

        const result = await response.json();
        if (result.success) {
          setStatus("success");
          return;
        } else {
          throw new Error(result.message || "Submission failed");
        }
      }

      // Fallback: Use direct mailto protocol if API key is not yet set
      const mailtoUrl = `mailto:${site.links.email}?subject=${encodeURIComponent(
        subject || `Portfolio Contact from ${name}`,
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      )}`;

      window.location.href = mailtoUrl;
      setStatus("success");
    } catch (err: unknown) {
      console.error("Contact Form Error:", err);
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Failed to dispatch message. Please try again or email directly.",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-card border border-line bg-surface p-6 md:p-8"
    >
      <div className="flex items-center justify-between border-b border-line pb-4">
        <h3 className="font-mono text-label uppercase text-ink-subtle">
          Direct Message
        </h3>
        <span className="flex items-center gap-1.5 font-mono text-xs text-accent">
          <Sparkles className="size-3.5" />
          Direct to Inbox
        </span>
      </div>

      {status === "success" ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
            <Check className="size-6" />
          </span>
          <h4 className="mt-4 text-h3 text-ink">Message Sent Successfully!</h4>
          <p className="mt-2 text-sm text-ink-muted max-w-sm">
            Thank you for reaching out. Your message has been delivered to <strong>{site.links.email}</strong>. I will get back to you shortly.
          </p>
          <button
            type="button"
            onClick={() => {
              setName("");
              setEmail("");
              setSubject("");
              setMessage("");
              setStatus("idle");
            }}
            className="mt-6 font-mono text-xs text-accent underline cursor-pointer"
          >
            Send another message
          </button>
        </div>
      ) : (
        <>
          {status === "error" ? (
            <div className="flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400">
              <AlertCircle className="size-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-name" className="font-mono text-xs uppercase text-ink-subtle">
                Your Name <span className="text-accent">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                className="h-11 rounded-control border border-line bg-canvas px-4 text-sm text-ink placeholder:text-ink-subtle focus:border-accent focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-email" className="font-mono text-xs uppercase text-ink-subtle">
                Your Email <span className="text-accent">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. sarah@company.com"
                className="h-11 rounded-control border border-line bg-canvas px-4 text-sm text-ink placeholder:text-ink-subtle focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-subject" className="font-mono text-xs uppercase text-ink-subtle">
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. AI Consulting / Project Opportunity"
              className="h-11 rounded-control border border-line bg-canvas px-4 text-sm text-ink placeholder:text-ink-subtle focus:border-accent focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-message" className="font-mono text-xs uppercase text-ink-subtle">
              Message <span className="text-accent">*</span>
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project, API requirements, or how I can help..."
              className="rounded-control border border-line bg-canvas p-4 text-sm text-ink placeholder:text-ink-subtle focus:border-accent focus:outline-none resize-none"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            variant="primary"
            disabled={status === "submitting"}
            leadingIcon={<Send className="size-4" />}
            className="mt-2 w-full justify-center cursor-pointer"
          >
            {status === "submitting" ? "Sending Message..." : "Send Message"}
          </Button>
        </>
      )}
    </form>
  );
}
