"use client"

import { typography, spacing } from "@/styles/design-tokens";
import type { ExpandedSanityImage } from "@/sanity/lib/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Button from "@/components/inputs/Button";
import { BlockContent } from "./inputs/PortableTextComponents";

interface ButtonType {
  _key: string;
  _type: "button";
  text?: string;
  url?: string;
  style?: "primary" | "secondary";
}

interface HeroProps {
  backgroundImage?: ExpandedSanityImage;
  mainImage?: ExpandedSanityImage;
  buttons?: ButtonType[];
}

export default function Hero({
  backgroundImage,
  mainImage,
  textBlock,
  buttons,
}: HeroProps) {
  return (
    <section className="relative min-h-screen">
      <div className="relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          {mainImage && (
            <Image
              src={urlFor(mainImage).url()}
              alt={mainImage.alt || "background image"}
              width={840}
              height={520}
              priority
            />
          )}
          {textBlock && <BlockContent value={textBlock} />}
        </div>
        {Array.isArray(buttons) && buttons.length > 0 && (
          <div className="flex flex-col gap-4 items-center justify-center w-full md:flex-row md:flex-wrap">
            {buttons.map((btn) => (
              <Button key={btn._key} {...btn} />
            ))}
          </div>
        )}
      </div>

      {backgroundImage && (
        <Image
          src={urlFor(backgroundImage).url()}
          alt={backgroundImage.alt || "background image"}
          fill
          priority
          className="object-cover"
        />
      )}
    </section>
  );
}
