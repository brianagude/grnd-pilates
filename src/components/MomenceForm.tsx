import type { MomenceForm as FormProps } from "@types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { spacing } from "@/styles/design-tokens";
import { LeadFormMomence } from "./inputs/LeadFormMomence";
import { BlockContent } from "./inputs/PortableTextComponents";

export default function MomenceForm({ textBlock, photo, form }: FormProps) {
  return (
    <section className={spacing.section}>
      <div
        className={`${spacing.container} !items-start md:grid md:grid-cols-2`}
      >
        {photo && (
          <Image
            src={urlFor(photo).url()}
            alt={photo.alt || "form image"}
            width={1000}
            height={1000}
            className="rounded-3xl lg:rounded-3xl"
          />
        )}
        <div className={`${spacing.block} order-first md:order-last lg:py-10`}>
          {textBlock && <BlockContent value={textBlock} />}
          <LeadFormMomence {...form} />
        </div>
      </div>
    </section>
  );
}
