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
  defineField({
    name: 'internalPage',
    title: 'Internal Page Reference',
    type: 'reference',
    description: 'If you want to link to an internal page, select the page here.',
    to: [
      { type: 'pageType' },
      { type: 'home' },
    ],
  }),
];
