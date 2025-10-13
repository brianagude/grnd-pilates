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
      type: "string",
      group: 'media',
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
      group: 'media',
      options: { hotspot: true },
      description:
        "This image will automatically be cropped to 16:9 aspect ratio.",
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
      group: 'media',
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
      group: 'content',
    }),
    defineField({
      name: "attribution",
      title: "Attribution",
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
