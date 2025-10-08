import Button from "@/components/inputs/Button";
import type { UpdatedMidHero } from "@/sanity/lib/types";
import { spacing } from "@/styles/design-tokens";
import HeroBackground from "./inputs/HeroBackground";
import { BlockContent } from "./inputs/PortableTextComponents";

export default function MidHero({
  backgroundImage,
  textBlock,
  buttons,
}: UpdatedMidHero) {
  const textClass = "text-black";

  if (!backgroundImage) {
    return (
      <section className={`${spacing.section} min-h-[80vh]`}>
        {/* fallback when no image */}
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
      </section>
    );
  }

  // Hotspot fallback coordinates (center of image)
  // const hotspot = backgroundImage.hotspot || { x: 0.5, y: 0.5 };
  // Convert to CSS background-position format
  // const objectPosition = `${hotspot.x * 100}% ${hotspot.y * 100}%`;

  return (
    <section className={`${spacing.section} min-h-[80vh] relative`}>
      <div className={`${spacing.container} !items-start z-20 relative`}>
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

      {backgroundImage && <HeroBackground image={backgroundImage}/>}

      {/* Background Image */}
      {/* <Image
        src={urlFor(backgroundImage).quality(100).url()}
        alt={backgroundImage.alt || "background image"}
        fill
        priority
        className="object-cover"
        sizes="100vw"
        quality={100}
        style={{ objectPosition }} 
      /> */}
    </section>
  );
}
