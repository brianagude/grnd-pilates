import { defineField, defineType } from "sanity";
import { buttonFields } from "../inputs/button";

export const home = defineType({
  name: "home",
  title: "Home Page",
  type: "document",
  fields: [
    // Hero Section
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: {
            hotspot: true,
            metadata: [
              'blurhash',
              'lqip',
              'palette',
            ],
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
          name: "mainImage",
          title: "Logo",
          type: "image",
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
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
    }),

    // Sections
    defineField({
      name: "sections",
      title: "Page Sections",
      type: "array",
      of: [
        { type: "callout" },
        { type: "details" },
        { type: "midHero" },
        { type: "momence" },
        { type: "momenceForm" },
        { type: "reviews" },
        { type: "textOnly" },
      ],
    }),
  ],
  preview: {
    select: {
      media: "hero.backgroundImage",
    },
    prepare(selection) {
      const { media } = selection;
      return {
        title: "Home Page",
        media,
      };
    },
  },
});
