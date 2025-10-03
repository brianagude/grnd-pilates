"use client"

import { typography, spacing } from "@/styles/design-tokens";
import type { ExpandedSanityImage } from "@/sanity/lib/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Button from "@/components/inputs/Button";
import { BlockContent } from "./inputs/PortableTextComponents";
import type {Callout as CalloutProps} from "@types"

export default function Callout({
  photo,
  imagePosition,
  textBlock,
  button,
}: CalloutProps) {
  return (
    <section>
      <div>
        <p>Callout Section</p>
      </div>
    </section>
  );
}
