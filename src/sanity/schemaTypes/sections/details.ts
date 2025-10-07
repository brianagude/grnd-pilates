import { defineField, defineType, defineArrayMember } from "sanity";
import { buttonFields } from "../inputs/button";
import { InlineElementIcon } from "@sanity/icons";

export const details = defineType({
  name: "details",
  title: "Cards",
  type: "object",
  fields: [
    defineField({
      name: "isCarousel",
      title: "Should this be a caorousel?",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "carouselContent",
      title: "Content",
      type: "array",
      of: [
        defineArrayMember({
          name: "item",
          title: "Item",
          type: "reference",
          weak: true,
          to: [{ type: "contentType" }],
        }),
      ],
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "object",
      fields: [...buttonFields],
    }),
  ],
  preview: {
    select: {
      title: "title",
      isCarousel: "isCarousel",
    },
    prepare(selection) {
      const { title, isCarousel } = selection;
      return {
        title,
        subtitle: isCarousel ? "Carousel Section" : "Cards Section",
        media: InlineElementIcon,
      };
    },
  },
});
