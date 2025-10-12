import type { Home as HomeType } from "@types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type BackgroundImageType = NonNullable<HomeType["hero"]>["backgroundImage"];

export default function HeroBackground({
  image,
  overlayColor
}: {
  image?: BackgroundImageType;
  overlayColor?: string;
}) {
  if (!image) return null;

  const hotspot = image.hotspot || { x: 0.5, y: 0.5 };
  const objectPosition = `${hotspot.x * 100}% ${hotspot.y * 100}%`;
  
  const imageUrl = urlFor(image)
    .width(1920)
    .dpr(2)
    .quality(100)
    .url();

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
      />
      {overlayColor && (
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
