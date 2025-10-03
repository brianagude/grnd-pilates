"use client"

import { typography, spacing } from "@/styles/design-tokens";
import type { ExpandedSanityImage } from "@/sanity/lib/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Button from "@/components/inputs/Button";
import { BlockContent } from "./inputs/PortableTextComponents";
import type {MidHero as MidHeroProps} from "@types"

export default function MidHero({
  backgroundImage,
  textBlock,
  buttons,
}: MidHeroProps) {
  return (
    <section>
      <div>
        <p>Mid Hero Section</p>
      </div>
    </section>
  );
}
