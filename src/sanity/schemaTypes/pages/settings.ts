import { defineField, defineType } from "sanity";
import { buttonFields } from "../inputs/button";
import { linkFields } from "../inputs/link";

export const settings = defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  fields: [
    // Header Settings
    defineField({
      name: "header",
      title: "Header",
      type: "object",
      fields: [
        defineField({
          name: "logo",
          title: "Logo",
          type: "image",
        }),
        defineField({
          name: "mainCTA",
          title: "Main Button",
          description: "This button will always show outside of the menu",
          type: "object",
          fields: [...buttonFields],
        }),
        defineField({
          name: "menuList",
          title: "Menu Links",
          description: "These links will show up in a menu",
          type: "array",
          of: [
            defineField({
              name: "menuLink",
              title: "Menu Link",
              type: "object",
              fields: [...linkFields],
            }),
          ],
        }),
      ],
    }),

    // Social Media Links
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
        }),
        defineField({
          name: 'tiktok',
          title: 'TikTok URL',
          type: 'url',
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        }),
      ],
    }),

    // Footer Settings
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        defineField({
          name: "copyrightText",
          title: "Copyright Text",
          type: "string",
        }),
        defineField({
          name: "footerLinks",
          title: "Link List",
          type: "array",
          of: [
            defineField({
              name: "footerLink",
              title: "Footer Link",
              type: "object",
              fields: [...linkFields],
            }),
          ],
        }),
        defineField({
          name: "supportText",
          title: "Support Text",
          type: "blockContent",
        }),
      ],
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
