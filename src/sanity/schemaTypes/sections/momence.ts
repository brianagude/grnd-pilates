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
          { title: "Events", value: "Events" },
          { title: "Memberships", value: "Memberships" },
          { title: "Products", value: "Products" },
          { title: "Teachers", value: "Teachers" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      integration: "integration",
    },
    prepare(selection) {
      const { title, integration } = selection;
      const sectionTitle = `${title ? title : "No Title"}`;
      const sectionSubtitle = `Momence Integration | ${integration}`;

      return {
        title: sectionTitle,
        subtitle: sectionSubtitle,
      };
    },
  },
});
