import { DocumentsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { GROUPS } from "@/sanity/lib/constants";
import { buttonFields } from "../inputs/button";

export const pageType = defineType({
  name: "pageType",
  title: "Page",
  type: "document",
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page Title",
      description: "The name of this page, shown in the browser tab. Also used to auto-generate the URL slug below.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "URL Slug",
      name: "slug",
      description: "The URL path for this page, auto-generated from the title. E.g. a slug of 'about-us' makes the page available at /about-us. Click 'Generate' to update after changing the title.",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "pageTitle"
      },
    }),
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
            metadata: ["blurhash", "lqip", "palette"],
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
      description: "Add, remove, or reorder sections on this page. Click the section type to expand and edit its content.",
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
