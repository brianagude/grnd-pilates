import { defineField, defineType } from "sanity";
import { GROUPS } from "@/sanity/lib/constants";

export const momenceForm = defineType({
  name: "momenceForm",
  title: "Form",
  type: "object",
  groups: GROUPS,
  fields: [
    defineField({
      name: "textBlock",
      title: "Text",
      description: "Heading or introductory text shown above the form.",
      type: "blockContent",
      group: 'content',
    }),
    defineField({
      name: "photo",
      title: "Image",
      description: "Optional image displayed alongside the form.",
      type: "image",
      group: 'media',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          description: "Describe the image for accessibility, e.g. 'Person stretching in a studio'.",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "form",
      title: "Form Configuration",
      type: "object",
      group: 'content',
      description: "To set up a form: go to your Momence dashboard → Plugins → Lead Form, build your form, click 'Show Code', then copy the values into the fields below.",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "fields",
          title: "Form Fields",
          description: "Copy the 'fields' value from Momence's 'Show Code' panel.",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "fieldDefJson",
          title: "Field Definitions (JSON)",
          description: "Copy the 'data-field-def' value from Momence's 'Show Code' panel.",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "sourceID",
          title: "Source ID",
          description: "Optional. Copy the 'source_id' value from Momence's 'Show Code' panel if present.",
          type: "string",
        }),
        defineField({
          name: "dataCollectConsent",
          title: "Require Data Collection Consent",
          description: "When enabled, users must check a consent box before submitting the form.",
          type: "boolean",
        }),
        defineField({
          name: "dataRedirectAfterSubmitTo",
          title: "Redirect URL After Submission",
          description: "Optional. Enter a URL to redirect the user to after they submit the form, e.g. a thank-you page.",
          type: "string",
        }),
        defineField({
          name: "dataOnSuccessMsg",
          title: "Success Message",
          description: "Optional. Message shown to the user after a successful form submission, e.g. 'Thanks! We'll be in touch soon.'",
          type: "string",
        }),
      ]
    }),
  ],
  preview: {
    select: {
      body: "textBlock",
      media: "photo",
      source: "source",
    },
    prepare(selection) {
      const { body = [], media, source } = selection;
      const firstBlock = body[0];
      const text = firstBlock?.children
        ?.map((c: { text: string }) => c.text)
        .join("")
        .trim();

      const title = text ? `${text.slice(0, 40)}…` : "Missing Text";

      return {
        title,
        subtitle: `Form Section | ID: ${source}`,
        media: media,
      };
    },
  },
});
