import { spacing } from "@/styles/design-tokens";
import { urlFor } from "@/sanity/lib/image";
import { BlockContent } from "./inputs/PortableTextComponents";
import Button from "@/components/inputs/Button";
import Image from "next/image";
import type { Callout as CalloutProps } from "@types";

type UpdatedCallout = Omit<CalloutProps, "button"> & {
  button?: Omit<CalloutProps["button"], "internalPage"> & {
    internalPage?: { _id?: string; slug?: string | null };
  };
};

export default function Callout({
  photo,
  imagePosition,
  textBlock,
  button,
}: UpdatedCallout) {
  return (
    <section className={spacing.section}>
      <div className={`${spacing.container} lg:grid lg:grid-cols-2`}>
        {(textBlock || button) && (
          <div className="space-y-10">
            {textBlock && <BlockContent value={textBlock} />}
            {button && <Button {...button} />}
          </div>
        )}
        {photo && (
          <Image
            src={urlFor(photo).url()}
            alt={photo.alt || "callout image"}
            width={1000}
            height={1000}
            className={`${imagePosition === "first" ? "order-first" : "order-last"} rounded-4xl lg:rounded-[48px]`}
          />
        )}
      </div>
    </section>
  );
}
