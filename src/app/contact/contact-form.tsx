"use client";

import { Check, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui";
import { site } from "@/content";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus("submitting");

    // Construct mailto as clean reliable fallback protocol
    setTimeout(() => {
      const mailtoUrl = `mailto:${site.links.email}?subject=${encodeURIComponent(
        subject || `Portfolio Contact from ${name}`,
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      )}`;

      window.location.href = mailtoUrl;
      setStatus("success");
    }, 600);
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
          Quick Connect
        </span>
      </div>

      {status === "success" ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
            <Check className="size-6" />
          </span>
          <h4 className="mt-4 text-h3 text-ink">Message Prompt Prepared!</h4>
          <p className="mt-2 text-sm text-ink-muted max-w-xs">
            Your default email client has been opened to dispatch your message directly.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-6 font-mono text-xs text-accent underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <>
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
            className="mt-2 w-full justify-center"
          >
            {status === "submitting" ? "Opening Email Client..." : "Send Message"}
          </Button>
        </>
      )}
    </form>
  );
}
