import { InlineElementIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { GROUPS } from "@/sanity/lib/constants";
import { buttonFields } from "../inputs/button";

export const details = defineType({
  name: "details",
  title: "Cards",
  type: "object",
  groups: GROUPS,
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
