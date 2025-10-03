"use client"

import { typography, spacing } from "@/styles/design-tokens";
import type { ExpandedSanityImage } from "@/sanity/lib/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Button from "@/components/inputs/Button";
import { BlockContent } from "./inputs/PortableTextComponents";
import type {Details as DetailsProps} from "@types"

export default function Details({
  isCarousel,
  title,
  carouselContent,
  button,
}: DetailsProps) {
  if (!carouselContent || carouselContent.length === 0) return null;

  return (
    <section className={spacing.section}>
      <div className={spacing.container}>
        <div>
          {title && <h3 className={typography.h3}>{title}</h3>}
          {button && <Button {...button} />}
        </div>
      </div>
    </section>
  );
}
