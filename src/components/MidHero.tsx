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
  const overlay = backgroundImage?.overlay;

  const textClass =
    overlay === 'light'
      ? '!text-black'
      : overlay === 'dark'
      ? '!text-white'
      : '';

  if (!backgroundImage) {
    return (
      <section className={`${spacing.section} min-h-[80svh]`}>
        <div className={`${spacing.container} !items-start`}>
          <div className={`${textClass} w-full`}>
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
    <section className={`${spacing.section} min-h-[90svh] relative`}>
      <div className={`${spacing.container} !items-start z-20 relative`}>
        <div className={`${textClass}`}>
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
        <HeroBackground image={backgroundImage} />
      )}
    </section>
  );
}
