"use client";
import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";
import { buttons } from "@/styles/design-tokens";

interface InternalPage {
  _id?: string;
  slug?: string | null;
}

interface ButtonProps {
  text?: string;
  children?: ReactNode;
  url?: string;
  internalPage?: InternalPage;
  style?: "primary" | "secondary";
  _type?: "button" | "footerLink" | "menuLink";
  _key?: string;
  classes?: string;
}

export default function Button({
  text,
  url,
  style,
  children,
  classes,
  internalPage,
}: ButtonProps) {
  // Bail early if no visible content
  if ((!text && !children) || (!url && !internalPage)) return null;

  const styles = {
    primary: buttons.primary,
    secondary: buttons.secondary,
  };

  const className = clsx(style && styles[style], classes);
  const isGlimmer = style === "primary" || style === "secondary";
  const content = <span className={clsx(isGlimmer && "glimmer")}>{children ?? text}</span>;

  // If internal page exists, always prioritize it
  if (internalPage?._id) {
    const internalLink =
      internalPage._id === "home"
        ? "/"
        : `/${internalPage.slug ?? ""}`;

    return (
      <Link className={className} href={internalLink}>
        {content}
      </Link>
    );
  }

  // Otherwise, fall back to URL
  if (url?.startsWith("/")) {
    return (
      <Link href={url} className={className}>
        {content}
      </Link>
    );
  }

  if (url?.startsWith("#")) {
    return (
      <a href={url} className={className}>
        {content}
      </a>
    );
  }

  if (url?.startsWith("mailto:") || url?.includes("@")) {
    const email = url.startsWith("mailto:") ? url : `mailto:${url}`;
    return (
      <a href={email} className={className}>
        {content}
      </a>
    );
  }

  if (url?.startsWith("tel:")) {
    return (
      <a href={url} className={className}>
        {content}
      </a>
    );
  }

  if (url?.startsWith("http")) {
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

  return (
    <span className={`${className} opacity-35`}>
      {content}
    </span>
  );
}
