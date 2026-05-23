import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { GROUPS } from '@/sanity/lib/constants'

export const contentType = defineType({
  name: "contentType",
  title: "Featured Content",
  type: "document",
  groups: GROUPS,
  fields: [
    defineField({
      name: "link",
      title: "Link to Content",
      description: "Optional URL this item links to, e.g. a blog post or article (https://...).",
      type: "url",
      group: 'content',
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "mediaType",
      title: "Media Type",
      description: "Choose what type of media to show. The corresponding image or video field will appear below based on your selection.",
      type: "string",
      group: 'media',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
          { title: "No Media", value: "none" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),
    defineField({
      name: "photo",
      title: "Image",
      type: "image",
      group: 'media',
      options: { hotspot: true },
      description:
        "This image will automatically be cropped to a 4:3 aspect ratio.",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          description: "Describe the image for accessibility and SEO.",
          type: "string",
        }),
      ],
      hidden: ({ document }) => document?.mediaType !== "image",
    }),
    defineField({
      title: "Video",
      name: "muxInput",
      type: "document",
      group: 'media',
      hidden: ({ document }) => document?.mediaType !== "video",
      fields: [
        defineField({
          title: "Video Title",
          name: "title",
          description: "Internal label for this video. Not displayed on the site.",
          type: "string",
        }),
        defineField({
          title: "Video File",
          name: "muxVideo",
          description: "Upload your video file. Supported formats: MP4, MOV, and more. Large files may take a moment to process.",
          type: "mux.video",
        }),
      ],
    }),
    defineField({
      name: "textBlock",
      title: "Text",
      description: "Optional caption or description displayed with this content item.",
      type: "blockContent",
      group: 'content',
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
