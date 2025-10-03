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
  return (
    <section>
      <div>
        <p>Callout Section</p>
      </div>
    </section>
  );
}
