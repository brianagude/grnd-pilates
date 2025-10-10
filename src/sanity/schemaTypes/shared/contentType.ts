import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const contentType = defineType({
  name: "contentType",
  title: "Featured Content",
  type: "document",
  fields: [
    defineField({
      name: "link",
      title: "Link to Content",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
          { title: "None", value: "none" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),
    defineField({
      name: "photo",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description:
        "This image will automatically be cropped to 4:3 aspect ratio.",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
      hidden: ({ document }) => document?.mediaType !== "image",
    }),
    defineField({
      title: "Video",
      name: "muxInput",
      type: "document",
      hidden: ({ document }) => document?.mediaType !== "video",
      fields: [
        defineField({
          title: "Title",
          name: "title",
          type: "string",
        }),
        defineField({
          title: "Video file",
          name: "muxVideo",
          type: "mux.video",
        }),
      ],
    }),
    defineField({
      name: "textBlock",
      title: "Text Block",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      body: "textBlock",
      media: "photo",
    },
    prepare(selection) {
      const { body, media } = selection;
      const firstBlock = body[0];
      const text = firstBlock?.children
        ?.map((c: { text: string }) => c.text)
        .join("")
        .trim();

      const title = text ? `${text.slice(0, 40)}…` : "Missing Text";

      return {
        title,
        media: media || ImageIcon,
      };
    },
  },
});
