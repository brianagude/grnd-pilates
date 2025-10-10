import type { BlockContent as BlockContentType } from "@types";
import Image from "next/image";
import Button from "@/components/inputs/Button";
import { urlFor } from "@/sanity/lib/image";
import type { ExpandedSanityImage } from "@/sanity/lib/types";
import { spacing } from "@/styles/design-tokens";
import HeroBackground from "./inputs/HeroBackground";
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
  textBlock?: BlockContentType;
  buttons?: ButtonType[];
  classes?: string;
}

export default function Hero({
  backgroundImage,
  mainImage,
  textBlock,
  buttons,
  classes,
}: HeroProps) {
  return (
    <section
      className={`${spacing.section} min-h-screen flex flex-col items-center justify-center ${classes}`}
    >
      <div className={`${spacing.container} pb-[200px]`}>
        <div className="flex flex-col items-center justify-center gap-2">
          {mainImage && (
            <Image
              src={urlFor(mainImage).quality(100).url()}
              alt={mainImage.alt || "grnd logo"}
              width={368}
              height={100}
              sizes="100vw"
              quality={100}
              priority
            />
          )}
          {textBlock && (
            <BlockContent value={textBlock} classes="text-center mx-auto" />
          )}
        </div>
        {Array.isArray(buttons) && buttons.length > 0 && (
          <div className="flex flex-col gap-4 items-center justify-center w-full sm:flex-row sm:flex-wrap">
            {buttons.map((btn) => (
              <Button key={btn._key} {...btn} />
            ))}
          </div>
        )}
      </div>

      {backgroundImage && <HeroBackground image={backgroundImage} />}
    </section>
  );
}
