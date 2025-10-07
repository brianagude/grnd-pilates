import { defineType, defineArrayMember } from "sanity";

export const blockContent = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Large", value: "large" },
        { title: "h1", value: "h1" },
        { title: "h2", value: "h2" },
        { title: "h3", value: "h3" },
        { title: "h4", value: "h4" },
        { title: "h5", value: "h5" },
        { title: "h6", value: "h6" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Sup", value: "sup" },
        ],
        annotations: [
          {
            title: "Link",
            name: "link",
            type: "object",
            fields: [
              {
                title: "Href",
                name: "href",
                type: "string",
                description:
                  "Can be a URL (https://...), email (mailto:...), or phone (tel:...)",
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: false,
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              },
            ],
          },
        ],
      },
    }),
  ],
});
