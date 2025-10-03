import { spacing } from "@/styles/design-tokens";
import { urlFor } from "@/sanity/lib/image";
import { BlockContent } from "./inputs/PortableTextComponents";
import Button from "@/components/inputs/Button";
import Image from "next/image";
import type { Callout as CalloutProps } from "@types"

export default function Callout({
  photo,
  imagePosition,
  textBlock,
  button,
}: CalloutProps) {
  return (
    <section className={spacing.section}>
      <div className={`${spacing.container} md:grid md:grid-cols-2`}>
        {(textBlock || button) && <div>
          {textBlock && <BlockContent value={textBlock} />}
          {button && <Button {...button} />}
        </div>}
        {photo && (
          <Image
            src={urlFor(photo).url()}
            alt={photo.alt || "callout image"}
            width={1000}
            height={1000}
            className={`${imagePosition === 'first' ? "order-first" : "order-last"}`}
          />
        )}
      </div>
    </section>
  );
}
