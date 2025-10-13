import { defineField, defineType } from "sanity";
import { GROUPS } from "@/sanity/lib/constants";
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
      groups: GROUPS,
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          group: "media",
          options: {
            hotspot: true,
            metadata: ["lqip", "palette"],
            accept: "image/*",
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
              initialValue: "none",
              options: {
                list: [
                  { title: "Dark", value: "dark" },
                  { title: "Light", value: "light" },
                  { title: "None", value: "none" },
                ],
                layout: "radio",
                direction: "horizontal",
              },
            }),
          ],
        }),
        defineField({
          name: "mainImage",
          title: "Logo",
          type: "image",
          group: "media",
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
          group: "content",
        }),
        defineField({
          name: "buttons",
          title: "Buttons",
          type: "array",
          group: "content",
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
