import { defineField, defineType } from "sanity";
import { buttonFields } from "../inputs/button";

export const callout = defineType({
  name: "callout",
  title: "Callout",
  type: "object",
  fields: [
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
      name: "imagePosition",
      title: "Content Position",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Image First', value: 'first' },
          { title: 'Image Last', value: 'last' },
        ],
        layout: "radio",
        direction: "horizontal"
      }
    }),
    defineField({
      name: "textBlock",
      title: "Text Block",
      type: "blockContent",
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "object",
      fields: [...buttonFields]
    }),
  ],
  preview: {
    select: {
      body: 'textBlock',
      media: "photo",
    },
    prepare(selection) {
      const { body = [], media } = selection;
      const firstBlock = body[0];
      const text = firstBlock?.children
        ?.map((c: { text: string; }) => c.text)
        .join("")
        .trim();

      const title = text ? `${text.slice(0, 40)}…` : "Missing Text";
      
      return {
        title,
        subtitle: "Callout Section",
        media: media,
      };
    },
  },
});
