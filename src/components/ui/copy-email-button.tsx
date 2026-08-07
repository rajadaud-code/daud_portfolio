"use client";

import { Check, Copy } from "lucide-react";
import { site } from "@/content";
import { useCopyToClipboard } from "@/hooks";
import { Button, type ButtonProps } from "./button";

export interface CopyEmailButtonProps extends Omit<ButtonProps, "onClick"> {
  email?: string;
  label?: string;
  copiedLabel?: string;
}

/**
 * CopyEmailButton — interactive email copy button with status animation feedback.
 */
export function CopyEmailButton({
  email = site.links.email,
  label = "Copy Email",
  copiedLabel = "Email Copied!",
  variant = "secondary",
  size = "base",
  className,
  ...props
}: CopyEmailButtonProps) {
  const { status, copy } = useCopyToClipboard();
  const isCopied = status === "copied";

  return (
    <Button
      variant={isCopied ? "primary" : variant}
      size={size}
      onClick={() => copy(email)}
      leadingIcon={
        isCopied ? (
          <Check className="size-4 text-emerald-400" aria-hidden="true" />
        ) : (
          <Copy className="size-4" aria-hidden="true" />
        )
      }
      className={className}
      {...props}
    >
      {isCopied ? copiedLabel : label}
    </Button>
  );
}
