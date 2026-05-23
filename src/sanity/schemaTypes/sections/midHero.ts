import { defineField, defineType } from "sanity";
import { GROUPS } from "@/sanity/lib/constants";
import { buttonFields } from "../inputs/button";

export const midHero = defineType({
  name: "midHero",
  title: "Mid Hero",
  type: "object",
  groups: GROUPS,
  fields: [
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      description: "Full-width background image for this section. Use the hotspot tool to control the focal point.",
      type: "image",
      group: "media",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          description: "Describe the background image for accessibility and SEO.",
          type: "string",
        }),
        defineField({
          name: "overlay",
          title: "Image Overlay",
          description: "A tint applied over the image to improve text readability. Use Dark or Light depending on your text color.",
          type: "string",
          options: {
            list: [
              { title: "Dark (for light text)", value: "dark" },
              { title: "Light (for dark text)", value: "light" },
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
      title: "Text",
      description: "Heading or body text displayed over the background image.",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      description: "Up to 2 buttons shown below the text. Leave empty to show no buttons.",
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
