import { ImageIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { GROUPS } from "@/sanity/lib/constants";
import { buttonFields } from "../inputs/button";

export const reviews = defineType({
  name: "reviews",
  title: "Reviews",
  type: "object",
  groups: GROUPS,
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      description: "Heading shown above the reviews, e.g. 'What Our Members Say'.",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "reviewsContent",
      title: "Reviews",
      description: "Select review items to display in this section. Drag to reorder. Reviews are managed under the 'Reviews' document type.",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          name: "item",
          title: "Item",
          type: "reference",
          weak: true,
          to: [{ type: "reviewType" }],
        }),
      ],
    }),
    defineField({
      name: "button",
      title: "Button",
      description: "Optional call-to-action button shown below the reviews.",
      type: "object",
      group: "content",
      fields: [...buttonFields],
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      description: "Optional background image behind the reviews section.",
      type: "image",
      group: "media",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          description: "Describe the background image for accessibility.",
          type: "string",
        }),
        defineField({
          name: "overlay",
          title: "Image Overlay",
          description: "A tint over the image to improve text readability.",
          type: "string",
          initialValue: "none",
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
  ],
  preview: {
    select: {
      title: "title",
      image: "backgroundImage",
    },
    prepare(selection) {
      const { title, image } = selection;
      return {
        title,
        subtitle: "Reviews Section",
        media: image || ImageIcon,
      };
    },
  },
});
