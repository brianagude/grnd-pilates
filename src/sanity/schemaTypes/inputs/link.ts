import { defineField } from "sanity";

export const linkFields = [
  defineField({
    name: "text",
    title: "Link Text",
    description: "The visible label for the link. Both text and a destination are required for the link to appear.",
    type: "string",
  }),
  defineField({
    name: "url",
    title: "URL",
    type: "string",
    description: "Full URL (https://...), email (mailto:...), or phone (tel:...). Leave blank if linking to an internal page below.",
  }),
  defineField({
    name: "internalPage",
    title: "Internal Page",
    type: "reference",
    description: "Link to a page on this site. If set, this overrides the URL above.",
    to: [{ type: "pageType" }, { type: "home" }],
  }),
];
