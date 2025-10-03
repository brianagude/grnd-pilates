"use client"

import { typography, spacing } from "@/styles/design-tokens";
import type { ExpandedSanityImage } from "@/sanity/lib/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Button from "@/components/inputs/Button";
import { BlockContent } from "./inputs/PortableTextComponents";
import type {Reviews as ReviewsProps} from "@types"

export default function Reviews({
  title,
  carouselContent,
  button,
}: ReviewsProps) {
  return (
    <section>
      <div>
        <p>Reviews Section</p>
      </div>
    </section>
  );
}
