import { typography, spacing } from "@/styles/design-tokens";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Button from "@/components/inputs/Button";
import { BlockContent } from "./inputs/PortableTextComponents";
import type { MidHero as MidHeroProps } from "@types"

type MidHeroWithTitle = MidHeroProps & {
  title?: string;
};

export default function MidHero({
  backgroundImage,
  textBlock,
  buttons,
  title
}: MidHeroWithTitle) {
  return (
    <section className={`${spacing.section} min-h-[80vh]`}>
      <div className={spacing.container}>
        <div>
          {title && <h1 className={typography.h1}>{title}</h1>}
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
