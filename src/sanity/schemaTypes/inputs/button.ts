import { defineField } from "sanity";

export const buttonFields = [
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
  defineField({
    title: "Button Style",
    name: "style",
    type: "string",
    options: {
      list: [
        { title: "Primary", value: "primary" },
        { title: "Secondary", value: "secondary" },
      ],
      layout: "radio",
      direction: "horizontal"
    },
  }),
];
