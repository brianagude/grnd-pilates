import type { Home as HomeType, MidHero as MidHeroType } from "@types";
import Image from "next/image";
import Button from "@/components/inputs/Button";
import { urlFor } from "@/sanity/lib/image";
import { spacing } from "@/styles/design-tokens";
import HeroBackground from "./inputs/HeroBackground";
import { BlockContent } from "./inputs/PortableTextComponents";

type ButtonsType = Array<
  Omit<NonNullable<MidHeroType["buttons"]>[number], "internalPage"> & {
    internalPage?: { _id?: string; slug?: string | null };
  }
>;

export type HeroType = Omit<NonNullable<HomeType["hero"]>, "buttons"> & {
  classes?: string;
  buttons?: ButtonsType;
};


export default function Hero({
  backgroundImage,
  mainImage,
  textBlock,
  buttons,
  classes,
}: HeroType) {
  const overlay = backgroundImage?.overlay;

  const textClass =
    overlay === "light"
      ? "!text-black"
      : overlay === "dark"
        ? "!text-white"
        : "";

  return (
    <section
      className={`${spacing.section} ${textClass} min-h-screen flex flex-col items-center justify-center ${classes}`}
    >
      <div className={`${spacing.container} pb-[200px]`}>
        <div className="w-full flex flex-col items-center justify-center gap-2">
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
            <BlockContent value={textBlock} classes="!text-center mx-auto" />
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
        <HeroBackground image={backgroundImage} noOverlay={true} />
      )}
    </section>
  );
}
