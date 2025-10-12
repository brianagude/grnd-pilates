import { defineField, defineType } from "sanity";

export const momenceForm = defineType({
  name: "momenceForm",
  title: "Form",
  type: "object",
  fields: [
    defineField({
      name: "textBlock",
      title: "Text Block",
      type: "blockContent",
    }),
    defineField({
      name: "photo",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "form",
      title: "Form Fields",
      type: "object",
      description: "To create a new form, go to https://momence.com/dashboard/107640/plugin?tab=lead-form, build your form, click Show Code, and then copy and paste the values where needed.",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "fields",
          title: "fields",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "fieldDefJson",
          title: "data-field-def",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        // defineField({
        //   name: "containerId",
        //   title: "Div ID",
        //   type: "string",
        //   placeholder: 'momence-plugin-lead-form',
        // }),
        defineField({
          name: "sourceID",
          title: "source_id",
          type: "string",
        }),
        defineField({
          name: "dataCollectConsent",
          title: "data_collect_consent",
          type: "boolean",
        }),
        defineField({
          name: "dataRedirectAfterSubmitTo",
          title: "data-redirect-after-submit-to",
          type: "string",
        }),
        // defineField({
        //   name: "hostID",
        //   title: "host_id",
        //   type: "string",
        //   placeholder: '107640',
        // }),
        // defineField({
        //   name: "token",
        //   title: "token",
        //   type: "string",
        //   placeholder: '3mX0LbY9Xk',
        // }),
        // defineField({
        //   name: "countryCode",
        //   title: "country_code",
        //   type: "string",
        //   placeholder: 'us',
        // }),
        defineField({
          name: "dataOnSuccessMsg",
          title: "data-on-success-msg",
          type: "string",
        }),
        // defineField({
        //   name: "src",
        //   title: "src",
        //   type: "string",
        //   placeholder: 'https://momence.com/plugin/lead-form/lead-form.js',
        // }),
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
