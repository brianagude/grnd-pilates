import { defineField, defineType } from "sanity";
import { buttonFields } from "../inputs/button";
import { GROUPS } from '@/sanity/lib/constants'

export const callout = defineType({
  name: "callout",
  title: "Callout",
  type: "object",
  groups: GROUPS,
  fields: [
    defineField({
      name: "photo",
      title: "Image",
      type: "image",
      group: 'media',
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
      group: 'settings',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Image First", value: "first" },
          { title: "Image Last", value: "last" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),
    defineField({
      name: "textBlock",
      title: "Text Block",
      type: "blockContent",
      group: 'content',
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "object",
      group: 'content',
      fields: [...buttonFields],
    }),
  ],
  preview: {
    select: {
      body: "textBlock",
      media: "photo",
    },
    prepare(selection) {
      const { body = [], media } = selection;
      const firstBlock = body[0];
      const text = firstBlock?.children
        ?.map((c: { text: string }) => c.text)
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
