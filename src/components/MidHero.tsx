import { typography, spacing } from "@/styles/design-tokens";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Button from "@/components/inputs/Button";
import { BlockContent } from "./inputs/PortableTextComponents";
import type { UpdatedMidHero } from "@/sanity/lib/types";

function getCroppedImageUrl(image) {
  const { width, height } = image.asset.metadata.dimensions;
  const crop = image.crop || { left: 0, top: 0, right: 0, bottom: 0 };

  const left = Math.floor(width * crop.left);
  const top = Math.floor(height * crop.top);
  const croppedWidth = Math.floor(width - width * (crop.left + crop.right));
  const croppedHeight = Math.floor(height - height * (crop.top + crop.bottom));

  return urlFor(image).rect(left, top, croppedWidth, croppedHeight).quality(100).url();
}


export default function MidHero({
  backgroundImage,
  textBlock,
  buttons,
}: UpdatedMidHero) {
  console.log('backgroundImage:', backgroundImage)
  const palette = backgroundImage?.asset?.metadata?.palette?.dominant;
  let textClass = "text-black";

  if (palette?.foreground) {
    textClass = palette.foreground === "#fff" ? "!text-white" : "!text-black";
  }

  return (
    <section className={`${spacing.section} min-h-[80vh]`}>
      <div className={`${spacing.container} !items-start`}>
        <div className={`${textClass} max-w-2xl`}>
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

      {/* {backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#000]/80 to-transparent z-10" />
      )} */}

      {backgroundImage && (
        <Image
          src={urlFor(backgroundImage).quality(100).url()}
          alt={backgroundImage.alt || "background image"}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={100}
        />
      )}
    </section>
  );
}
