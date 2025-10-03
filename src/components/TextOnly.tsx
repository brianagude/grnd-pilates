import { spacing } from "@/styles/design-tokens";
import { BlockContent } from "./inputs/PortableTextComponents";
import type {TextOnly as TextOnlyProps} from "@types"

export default function TextOnly({
  copy,
}: TextOnlyProps) {
  if (!copy) return null;
  return (
    <section className={`${spacing.section} bg-brown-500`}>
      <div className={`${spacing.container} py-4 sm:py-8 lg:py-16 bg-white`}>
        <BlockContent value={copy} classes="columns-2 w-full" />
      </div>
    </section>
  );
}
