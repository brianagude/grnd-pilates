import { defineField, defineType, defineArrayMember } from "sanity";
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
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title,
        subtitle: "Reviews Section",
      };
    },
  },
});
