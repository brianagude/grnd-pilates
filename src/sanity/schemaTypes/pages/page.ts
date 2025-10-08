import { defineField, defineType } from "sanity";
import { buttonFields } from "../inputs/button";
import { DocumentsIcon } from "@sanity/icons";

export const pageType = defineType({
  name: "pageType",
  title: "Page",
  type: "document",
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        maxLength: 200,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    }),
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
            metadata: ["blurhash", "lqip", "palette"],
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
      title: "pageTitle",
    },
    prepare(selection) {
      const { media, title } = selection;
      return {
        title,
        media,
      };
    },
  },
});
