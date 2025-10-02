import { defineField } from "sanity";

export const linkFields = [
  defineField({
    name: "text",
    title: "Text",
    description:
      "You must provide text and a link for it to show up on the page",
    type: "string",
  }),
  defineField({
    name: "url",
    title: "URL",
    type: "string",
  }),
];
