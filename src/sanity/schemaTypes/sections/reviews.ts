import { ImageIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { buttonFields } from "../inputs/button";

export const reviews = defineType({
  name: "reviews",
  title: "Reviews",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "reviewsContent",
      title: "Content",
      type: "array",
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
      fields: [...buttonFields],
    }),
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
          initialValue: 'none',
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
