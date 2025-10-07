import { spacing, typography } from "@/styles/design-tokens";
import { BlockContent } from "./inputs/PortableTextComponents";
import type { TextOnly as TextOnlyProps } from "@types";

export default function TextOnly({ title, copy }: TextOnlyProps) {
  if (!copy) return null;
  return (
    <section
      className={`${spacing.section} ${spacing.container} !max-w-full bg-brown-500`}
    >
      <div className="p-4 max-w-[1720px] mx-auto sm:p-8 lg:p-16 bg-white rounded-b-4xl space-y-8 lg:rounded-[48px]">
        {title && <h4 className={typography.h4}>{title}</h4>}
        <BlockContent
          value={copy}
          classes="md:columns-2 gap-10 w-full !space-y-3"
        />
      </div>
    </section>
  );
}
