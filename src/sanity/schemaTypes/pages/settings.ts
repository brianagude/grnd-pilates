import { defineField, defineType } from "sanity";
import { buttonFields } from "../inputs/button";
import { linkFields } from "../inputs/link";

export const settings = defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  groups: [
    {
      default: true,
      name: "header",
      title: "Header",
    },
    {
      name: "footer",
      title: "Footer",
    },
    {
      name: "social",
      title: "Social Media",
    },
  ],
  fields: [
    // Header Settings
    defineField({
      name: "header",
      title: "Header",
      type: "object",
      group: "header",
      fields: [
        defineField({
          name: "logo",
          title: "Logo",
          description: "The logo displayed in the top navigation bar. Recommended size: 200×60px.",
          type: "image",
        }),
        defineField({
          name: "mainCTA",
          title: "Header Button",
          description: "The primary call-to-action button always visible in the header (outside the menu).",
          type: "object",
          fields: [...buttonFields],
        }),
        defineField({
          name: "menuList",
          title: "Menu Links",
          description: "Navigation links shown inside the menu. Drag to reorder.",
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
      name: "socialMedia",
      title: "Social Media Links",
      description: "Paste your full profile URLs. Leave a field blank to hide that icon.",
      type: "object",
      group: "social",
      fields: [
        defineField({
          name: "instagram",
          title: "Instagram URL",
          description: "e.g. https://instagram.com/yourhandle",
          type: "url",
        }),
        defineField({
          name: "twitter",
          title: "Twitter / X URL",
          description: "e.g. https://x.com/yourhandle",
          type: "url",
        }),
        defineField({
          name: "youtube",
          title: "YouTube URL",
          description: "e.g. https://youtube.com/@yourchannel",
          type: "url",
        }),
        defineField({
          name: "tiktok",
          title: "TikTok URL",
          description: "e.g. https://tiktok.com/@yourusername",
          type: "url",
        }),
        defineField({
          name: "facebook",
          title: "Facebook URL",
          description: "e.g. https://facebook.com/yourpage",
          type: "url",
        }),
        defineField({
          name: "linkedin",
          title: "LinkedIn URL",
          description: "e.g. https://linkedin.com/company/yourcompany",
          type: "url",
        }),
      ],
    }),

    // Footer Settings
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      group: "footer",
      fields: [
        defineField({
          name: "logo",
          title: "Logo",
          description: "The logo displayed in the footer. Can be the same as the header logo or a lighter variation.",
          type: "image",
        }),
        defineField({
          name: "copyrightText",
          title: "Copyright Text",
          description: "Shown at the very bottom of the page, e.g. '© 2025 GRND Pilates. All rights reserved.'",
          type: "string",
        }),
        defineField({
          name: "footerLinks",
          title: "Footer Links",
          description: "Links shown in the footer navigation. Drag to reorder.",
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
          title: "Footer Body Text",
          description: "Optional additional text or links shown in the footer, such as an address, tagline, or legal disclaimer.",
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
