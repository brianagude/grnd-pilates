import { PortableText } from "@portabletext/react";
import type { BlockContent as BlockContentType } from "@types";
import type { PortableTextComponents as PortableTextComponentsType } from "next-sanity";
import { typography } from "@/styles/design-tokens";

const blockContentComponents: PortableTextComponentsType = {
  block: {
    h3: ({ children }) => (
      <h3 className={typography.h3}>{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className={typography.h4}>{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className={typography.h5}>{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className={typography.h6}>{children}</h6>
    ),
    caption: ({ children }) => (
      <p className={typography.caption}>{children}</p>
    ),
    captionLarge: ({ children }) => (
      <p className={typography.captionLarge}>{children}</p>
    ),
    captionSmall: ({ children }) => (
      <p className={typography.captionSmall}>{children}</p>
    ),
    large: ({ children }) => (
      <p className={typography.bodyLarge}>{children}</p>
    ),
    normal: ({ children }) => (
      <p className={typography.body}>{children}</p>
    ),
    small: ({ children }) => (
      <p className={typography.bodySmall}>{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className={`${typography.body} text-block-list list-disc w-full max-w-7xl pl-5 space-y-1 mt-2`}>
        <span>{children}</span>
      </ul>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} className={typography.link} target="_blank">
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="!font-bold">{children}</strong>
    ),
    sup: ({ children }) => (
      <sup className="text-[0.5em] align-super">{children}</sup>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

export const BlockContent = ({
  value,
  classes,
}: {
  value: BlockContentType;
  classes?: string;
}) => {
  return (
    <div className={`mt-4 space-y-2 ${classes}`}>
      <PortableText value={value} components={blockContentComponents} />
    </div>
  );
};
