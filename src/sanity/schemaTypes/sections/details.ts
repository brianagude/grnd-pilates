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
      title: "Display as Carousel?",
      description: "When on, content items scroll horizontally as a carousel. When off, they display in a grid of cards.",
      type: "boolean",
      group: "settings",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Section Title",
      description: "Optional heading shown above the cards. Leave blank to hide.",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "carouselContent",
      title: "Content Items",
      description: "Select Featured Content items to display. Drag to reorder. These are managed under the 'Featured Content' document type.",
      type: "array",
      group: "content",
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
      description: "Optional call-to-action button shown below the cards.",
      type: "object",
      group: "content",
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
