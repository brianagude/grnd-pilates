import { defineField, defineType } from "sanity";

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
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title,
        subtitle: "Text Only"
      };
    },
  },
});
