"use client";
import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";
import { buttons } from "@/styles/design-tokens";

interface ButtonProps {
  text?: string;
  url?: string;
  style?: "primary" | "secondary" | null;
  children?: ReactNode;
  classes?: string;
}

export default function Button({
  text,
  url,
  style,
  children,
  classes,
}: ButtonProps) {
  // Bail only if we have no content OR no url
  if ((!text && !children) || !url) return null;
  // if ((!text && !children) || !url) return null;

  const styles = {
    primary: buttons.primary,
    secondary: buttons.secondary,
  };

  // Only apply style class if style is non-null and known
  const className = clsx(style && styles[style], classes);
  const isGlimmer = style === "primary" || style === "secondary";
  const content = <span className={clsx(isGlimmer && "glimmer")}>{children ?? text}</span>;

  if (url.startsWith("/")) {
    return (
      <Link href={url} className={className}>
        {content}
      </Link>
    );
  }

  // Anchor link
  if (url.startsWith("#")) {
    return (
      <a href={url} className={className}>
        {content}
      </a>
    );
  }

  // Email link
  if (url.startsWith("mailto:") || url.includes("@")) {
    const email = url.startsWith("mailto:") ? url : `mailto:${url}`;
    return (
      <a href={email} className={className}>
        {content}
      </a>
    );
  }

  // Telephone link
  if (url.startsWith("tel:")) {
    return (
      <a href={url} className={className}>
        {content}
      </a>
    );
  }

  // External link
  if (url.startsWith("http")) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  // Fallback: just render a span (invalid URL)
  return (
    <span className={`${className} opacity-35`}>
      {content}
    </span>
  );
}
