import { defineField, defineType } from "sanity";

export const momenceForm = defineType({
  name: "momenceForm",
  title: "Form",
  type: "object",
  fields: [
    defineField({
      name: "textBlock",
      title: "Text Block",
      type: "blockContent",
    }),
    defineField({
      name: "photo",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "source",
      title: "Source ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      body: "textBlock",
      media: "photo",
      source: "source",
    },
    prepare(selection) {
      const { body = [], media, source } = selection;
      const firstBlock = body[0];
      const text = firstBlock?.children
        ?.map((c: { text: string }) => c.text)
        .join("")
        .trim();

      const title = text ? `${text.slice(0, 40)}…` : "Missing Text";

      return {
        title,
        subtitle: `Form Section | ID: ${source}`,
        media: media,
      };
    },
  },
});
