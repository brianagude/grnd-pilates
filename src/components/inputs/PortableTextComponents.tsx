import { PortableText } from "@portabletext/react";
import type { BlockContent as BlockContentType } from "@types";
import type { PortableTextComponents as PortableTextComponentsType } from "next-sanity";
import { typography } from "@/styles/design-tokens";

const blockContentComponents: PortableTextComponentsType = {
  block: {
    caption: ({ children }) => (
      <h5 className={`${typography.caption} mb-4`}>{children}</h5>
    ),
    captionLarge: ({ children }) => (
      <h5 className={`${typography.captionLarge} mb-4`}>{children}</h5>
    ),
    captionSmall: ({ children }) => (
      <h6 className={`${typography.caption} mb-4`}>{children}</h6>
    ),
    large: ({ children }) => (
      <p className={`${typography.bodyLarge}`}>{children}</p>
    ),
    normal: ({ children }) => (
      <p className={`${typography.body}`}>{children}</p>
    ),
    small: ({ children }) => (
      <p className={`${typography.bodySmall}`}>{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul
        className={`${typography.body} text-block-list list-disc w-full max-w-7xl pl-5 space-y-1 mt-2`}
      >
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
    <div className={`space-y-3 ${classes}`}>
      <PortableText value={value} components={blockContentComponents} />
    </div>
  );
};
