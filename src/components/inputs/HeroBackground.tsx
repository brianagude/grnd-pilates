import type { Home as HomeType } from "@types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type BackgroundImageType = Omit<NonNullable<NonNullable<HomeType["hero"]>["backgroundImage"]>, "asset"> & {
  asset?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    metadata?: { lqip?: string };
  };
}

export default function HeroBackground({
  image,
  noOverlay = false
}: {
  image?: BackgroundImageType;
  noOverlay?: boolean;
}) {
  if (!image) return null;
  const overlay = image?.overlay;

  const overlayColor =
    overlay === 'light'
      ? 'var(--overlay-light)'
      : overlay === 'dark'
      ? 'var(--overlay-dark)'
      : null;

  const hotspot = image.hotspot || { x: 0.5, y: 0.5 };
  const objectPosition = `${hotspot.x * 100}% ${hotspot.y * 100}%`;

  const imageUrl = urlFor(image).auto('format').url();

  const blurDataURL = image.asset?.metadata?.lqip ? image.asset?.metadata?.lqip : undefined

  return (
    <div className="absolute inset-0 -z-10">
      <Image
        src={imageUrl}
        alt={image.alt || ""}
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition }}
        priority
        quality={85}
        {...(blurDataURL ? { placeholder: "blur", blurDataURL } : {})}
      />
      {overlayColor && !noOverlay && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(160deg, ${overlayColor} 40%, transparent 60%)`
          }}
        />
      )}
    </div>
  );
}
