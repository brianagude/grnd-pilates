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
      title: "Title",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "reviewsContent",
      title: "Content",
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
      title: "Buttons",
      type: "object",
      group: "content",
      fields: [...buttonFields],
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      group: "media",
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
