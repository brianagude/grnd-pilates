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
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Classes', value: 'Classes'},
          {title: 'Events', value: 'Events'},
          {title: 'Videos', value: 'Videos'},
          {title: 'Memberships', value: 'Memberships'},
          {title: 'Products', value: 'Products'},
          {title: 'Teachers', value: 'Teachers'}
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
      const sectionTitle = `Type: ${integration}${title ? ` | ${title}` : ""}`;

      return {
        title: sectionTitle,
        subtitle: "Momence Integration",
      };
    },
  },
});
