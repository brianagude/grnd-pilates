import { defineField, defineType } from "sanity";

export const momence = defineType({
  name: "momence",
  title: "Momence",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "integration",
      title: "Integration Type",
      type: "string",
      options: {
        list: [
          {title: 'Events', value: 'events'},
          {title: 'Videos', value: 'videos'},
          {title: 'Memberships', value: 'memberships'},
          {title: 'Products', value: 'products'},
          {title: 'Teachers', value: 'teachers'}
        ],
      }
    }),
  ],
  preview: {
    select: {
      title: "title",
      integration: "integration"
    },
    prepare(selection) {
      const { title, integration } = selection;
      return {
        title: integration || title,
        subtitle: "Momence Integration",
      };
    },
  },
});
