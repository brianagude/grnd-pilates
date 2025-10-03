import { type SchemaTypeDefinition } from "sanity";

import { home } from "@/sanity/schemaTypes/pages/home";
import { settings } from "@/sanity/schemaTypes/pages/settings";
import { pageType } from "@/sanity/schemaTypes/pages/page";
import { blockContent } from "@/sanity/schemaTypes/inputs/blockContent";
import { contentType } from "@/sanity/schemaTypes/shared/contentType";
import { callout } from "@/sanity/schemaTypes/sections/callout";
import { details } from "@/sanity/schemaTypes/sections/details";
import { midHero } from "@/sanity/schemaTypes/sections/midHero";
import { momence } from "@/sanity/schemaTypes/sections/momence";
import { momenceForm } from "@/sanity/schemaTypes/sections/form";
import { reviews } from "@/sanity/schemaTypes/sections/reviews";
import { textOnly } from "@/sanity/schemaTypes/sections/textOnly";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContent,
    home,
    settings,
    contentType,
    pageType,
    callout,
    details,
    midHero,
    momence,
    momenceForm,
    reviews,
    textOnly
  ],
};