"use client"

import { typography, spacing } from "@/styles/design-tokens";
import type { ExpandedSanityImage } from "@/sanity/lib/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Button from "@/components/inputs/Button";
import { BlockContent } from "./inputs/PortableTextComponents";
import type {TextOnly as TextOnlyProps} from "@types"

export default function TextOnly({
  copy,
}: TextOnlyProps) {
  return (
    <section>
      <div>
        <p>Text Only Section</p>
      </div>
    </section>
  );
}
