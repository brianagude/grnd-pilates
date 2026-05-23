import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { GROUPS } from '@/sanity/lib/constants'

export const reviewType = defineType({
  name: "reviewType",
  title: "Reviews",
  type: "document",
  groups: GROUPS,
  fields: [
    defineField({
      name: "mediaType",
      title: "Media Type",
      description: "Choose what type of media to show alongside this review. The image or video field below will appear based on your selection.",
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
        "This image will automatically be cropped to a 16:9 aspect ratio.",
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
      title: "Review Text",
      description: "The review content — what the customer said.",
      type: "blockContent",
      group: 'content',
    }),
    defineField({
      name: "attribution",
      title: "Reviewer Name",
      description: "Name or description of the reviewer shown below the quote, e.g. 'Jane D.' or 'Sarah M., Member since 2023'.",
      type: "string",
      group: 'content',
    }),
  ],
  preview: {
    select: {
      body: "textBlock",
      media: "photo",
      type: "itemType",
    },
    prepare(selection) {
      const { body, media, type } = selection;
      const firstBlock = body[0];
      const text = firstBlock?.children
        ?.map((c: { text: string }) => c.text)
        .join("")
        .trim();

      const title = text ? `${text.slice(0, 40)}…` : "Missing Text";

      return {
        title,
        subtitle: type,
        media: media || ImageIcon,
      };
    },
  },
});
