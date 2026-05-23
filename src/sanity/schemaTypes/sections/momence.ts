import { defineField, defineType } from "sanity";

export const momence = defineType({
  name: "momence",
  title: "Momence",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      description: "Optional heading shown above the embedded integration. Leave blank to hide.",
      type: "string",
    }),
    defineField({
      name: "integration",
      title: "Integration Type",
      description: "Choose which Momence feature to embed on this page.",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Appointments", value: "Appointments" },
          { title: "Classes / Events", value: "Events" },
          { title: "Community Posts", value: "CommunityPosts" },
          { title: "Gift Cards", value: "GiftCards" },
          { title: "Memberships", value: "Memberships" },
          { title: "On-Demand Videos", value: "OnDemand" },
          { title: "Products", value: "Products" },
          { title: "Reviews", value: "Reviews" },
          { title: "Teachers / Instructors", value: "Teachers" },
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
