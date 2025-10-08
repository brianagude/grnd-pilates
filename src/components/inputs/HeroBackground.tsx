// HeroBackground.tsx

import type { Home as HomeType } from "@types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type BackgroundImageType = NonNullable<HomeType["hero"]>["backgroundImage"];


export default function HeroBackground({
  image,
}: {
  image?: BackgroundImageType;
}) {
  if (!image) return null;

  const hotspot = image.hotspot || { x: 0.5, y: 0.5 };
  const objectPosition = `${hotspot.x * 100}% ${hotspot.y * 100}%`;

  return (
    <div className="absolute inset-0 -z-10">
      <Image
        src={urlFor(image).quality(100).url()}
        alt={image.alt || "Missing alt"}
        fill
        quality={100}
        style={{ objectFit: "cover", objectPosition }}
        priority
      />
    </div>
  );
}
