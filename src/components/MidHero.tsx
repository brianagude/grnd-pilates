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
  // Cast asset to any (quick workaround)
  // biome-ignore lint/suspicious/noExplicitAny: Annoying
    const asset = backgroundImage?.asset as any;

  // Then safely read palette
  const palette = asset?.metadata?.palette;
  const dominantColor = palette?.dominant?.background || "#000";

  // const palette = backgroundImage?.asset?.metadata?.palette;
  // const dominantColor = palette?.dominant?.background || "#000";
  
  // Simple luminance function to decide if color is light or dark
  const isLight = (color: string) => {
    // Remove # if present, convert to RGB
    let r = 0, g = 0, b = 0;
    if (color.startsWith("#") && (color.length === 7 || color.length === 4)) {
      if (color.length === 7) {
        r = parseInt(color.substring(1,3), 16);
        g = parseInt(color.substring(3,5), 16);
        b = parseInt(color.substring(5,7), 16);
      } else if (color.length === 4) {
        r = parseInt(color[1]+color[1], 16);
        g = parseInt(color[2]+color[2], 16);
        b = parseInt(color[3]+color[3], 16);
      }
    }
    // Calculate relative luminance
    const luminance = (0.299*r + 0.587*g + 0.114*b) / 255;
    return luminance > 0.7; // tweak threshold as needed
  };

  const textClass = isLight(dominantColor) ? "text-black" : "text-white";
  const overlayColor = isLight(dominantColor)
    ? "rgba(255, 255, 255, 0.4)"
    : "rgba(0, 0, 0, 0.5)";

  if (!backgroundImage) {
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
      </section>
    );
  }

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

      {backgroundImage && (
        <HeroBackground image={backgroundImage} overlayColor={overlayColor} />
      )}
    </section>
  );
}
