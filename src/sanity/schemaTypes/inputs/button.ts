import { defineField } from "sanity";

export const buttonFields = [
  defineField({
    name: "text",
    title: "Button Text",
    description: "The label shown on the button, e.g. 'Book a Class' or 'Learn More'. Both text and a link are required for the button to appear.",
    type: "string",
  }),
  defineField({
    name: "url",
    title: "URL",
    type: "string",
    description:
      "Can be a full URL (https://...), email (mailto:you@example.com), or phone (tel:+1...). Leave blank if linking to an internal page below.",
  }),
  defineField({
    name: "internalPage",
    title: "Internal Page",
    type: "reference",
    description:
      "Link to a page on this site. If set, this overrides the URL above.",
    to: [{ type: "pageType" }, { type: "home" }],
  }),
  defineField({
    title: "Button Style",
    name: "style",
    type: "string",
    description: "Primary is filled and more prominent. Secondary is outlined and more subtle.",
    options: {
      list: [
        { title: "Primary (filled)", value: "primary" },
        { title: "Secondary (outlined)", value: "secondary" },
      ],
      layout: "radio",
      direction: "horizontal",
    },
  }),
];
