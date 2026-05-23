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
      description: "Image displayed alongside the text. Use hotspot to control which part of the image stays in frame.",
      type: "image",
      group: 'media',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          description: "Describe the image for accessibility and SEO, e.g. 'Instructor demonstrating a Pilates move'.",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "imagePosition",
      title: "Image Position",
      description: "Controls which side of the screen the image appears on (on wider screens).",
      type: "string",
      group: 'settings',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Image on Left", value: "first" },
          { title: "Image on Right", value: "last" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),
    defineField({
      name: "textBlock",
      title: "Text",
      description: "The text content displayed next to the image. Supports headings, paragraphs, and inline links.",
      type: "blockContent",
      group: 'content',
    }),
    defineField({
      name: "button",
      title: "Button",
      description: "Optional call-to-action button displayed below the text.",
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
