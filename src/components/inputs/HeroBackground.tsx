import type { Home as HomeType } from "@types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type BackgroundImageType = NonNullable<HomeType["hero"]>["backgroundImage"]

export default function HeroBackground({
  image,
  noOverlay = false
}: {
  image?: BackgroundImageType;
}) {
  if (!image) return null;
  const overlay = image?.overlay;

  const overlayColor =
    overlay === 'light'
      ? 'rgba(255, 255, 255, 0.6)'
      : overlay === 'dark'
      ? 'rgba(0, 0, 0, 0.6)'
      : null;

  const hotspot = image.hotspot || { x: 0.5, y: 0.5 };
  const objectPosition = `${hotspot.x * 100}% ${hotspot.y * 100}%`;

  const imageUrl = urlFor(image)
    .width(1920)
    .dpr(2)
    .quality(100)
    .url();

  const blurDataURL = image.asset?.metadata?.lqip ? image.asset?.metadata?.lqip : undefined

  return (
    <div className="absolute inset-0 -z-10">
      <Image
        src={imageUrl}
        alt={image.alt || "Missing alt"}
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition }}
        priority
        quality={100}
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
