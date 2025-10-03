import { defineField, defineType } from "sanity";
import {TextIcon} from '@sanity/icons'

export const textOnly = defineType({
  name: "textOnly",
  title: "Text Only",
  type: "object",
  fields: [
    defineField({
      name: "copy",
      title: "Text Block",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      body: 'copy',
    },
    prepare(selection) {
      const { body = [] } = selection;
      const firstBlock = body[0];
      const text = firstBlock?.children
        ?.map((c: { text: string; }) => c.text)
        .join("")
        .trim();

      const title = text ? `${text.slice(0, 40)}…` : "Missing Text";
      
      return {
        title,
        subtitle: "Text Only Section",
        media: TextIcon,
      };
    },
  },
});
