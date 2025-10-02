import { defineField, defineType } from "sanity";
import { InlineElementIcon, ImageIcon } from '@sanity/icons'

export const contentType = defineType({
  name: "contentType",
  title: "Featured Content",
  type: "document",
  icon: InlineElementIcon,
  fields: [
    defineField({
      name: "itemType",
      title: "Content Type",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Class', value: 'class'},
          {title: 'Package', value: 'package'},
          {title: 'Review', value: 'review'},
        ],
        layout: "radio"
      }
    }),
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
          {title: 'None', value: 'none'},
        ],
        layout: "radio",
        direction: "horizontal"
      }
    }),
    defineField({
      name: "photo",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      hidden: ({document}) => document?.mediaType !== 'image',
    }),
    defineField({
      title: "Video",
      name: "muxInput",
      type: "document",
      hidden: ({document}) => document?.mediaType !== 'video',
      fields: [
        defineField({ 
          title: "Title", 
          name: "title", 
          type: "string" 
        }),
        defineField({
          title: "Video file",
          name: "muxVideo",
          type: "mux.video"
        })
      ]
    }),
    defineField({
      name: "textBlock",
      title: "Text Block",
      type: "blockContent",
    }),
    defineField({
      name: "attribution",
      title: "Attribution",
      type: "string",
      hidden: ({document}) => document?.itemType !== 'review',
    }),
  ],
  preview: {
    select: {
      body: 'textBlock',
      media: "photo",
      type: "itemType",
    },
    prepare(selection) {
      const { body, media, type } = selection;
      const firstBlock = body[0];
      const text = firstBlock?.children
        ?.map((c: { text: string; }) => c.text)
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
