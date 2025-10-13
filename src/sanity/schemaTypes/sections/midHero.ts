import { defineField, defineType } from "sanity";
import { buttonFields } from "../inputs/button";

export const midHero = defineType({
  name: "midHero",
  title: "Mid Hero",
  type: "object",
  fields: [
    defineField({
      name: "backgroundImage",
      title: "Background Image",
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
        defineField({
          name: "overlay",
          title: "Overlay",
          type: "string",
          options: {
            list: [
              {title: 'Dark', value: 'dark'},
              {title: 'Light', value: 'light'},
              {title: 'None', value: 'none'}
            ],
            layout: 'radio',
            direction: 'horizontal'
          }
        }),
      ],
    }),
    defineField({
      name: "textBlock",
      title: "Text Block",
      type: "blockContent",
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "array",
      validation: (rule) => rule.max(2),
      of: [
        defineField({
          name: "button",
          title: "Button",
          type: "object",
          fields: [...buttonFields],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      body: "textBlock",
      media: "backgroundImage",
    },
    prepare(selection) {
      const { body, media } = selection;
      const firstBlock = body[0];
      const text = firstBlock?.children
        ?.map((c: { text: string }) => c.text)
        .join("")
        .trim();

      const title = text ? `${text.slice(0, 40)}…` : "Missing Text";

      return {
        title,
        subtitle: "Mid Hero Section",
        media: media,
      };
    },
  },
});
