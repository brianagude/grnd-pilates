import { spacing } from "@/styles/design-tokens";
import type { ExpandedSanityImage } from "@/sanity/lib/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Button from "@/components/inputs/Button";
import { BlockContent } from "./inputs/PortableTextComponents";
import type { BlockContent as BlockContentType } from "@types";

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
            <BlockContent value={textBlock} classes="text-center" />
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

      {backgroundImage && (
        <Image
          src={urlFor(backgroundImage)
            .width(1600)
            .height(900)
            .fit("crop")
            .crop("focalpoint")
            .url()}
          alt={backgroundImage.alt || "background image"}
          fill
          priority
          className="object-cover"
        />
      )}
    </section>
  );
}
