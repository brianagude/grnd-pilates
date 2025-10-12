import type { SchemaTypeDefinition } from "sanity";
import { blockContent } from "@/sanity/schemaTypes/inputs/blockContent";
import { home } from "@/sanity/schemaTypes/pages/home";
import { pageType } from "@/sanity/schemaTypes/pages/page";
import { settings } from "@/sanity/schemaTypes/pages/settings";
import { callout } from "@/sanity/schemaTypes/sections/callout";
import { details } from "@/sanity/schemaTypes/sections/details";
import { momenceForm } from "@/sanity/schemaTypes/sections/form";
import { midHero } from "@/sanity/schemaTypes/sections/midHero";
import { momence } from "@/sanity/schemaTypes/sections/momence";
import { reviews } from "@/sanity/schemaTypes/sections/reviews";
import { contentType } from "@/sanity/schemaTypes/shared/contentType";
import { reviewType } from "@/sanity/schemaTypes/shared/review";

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
    reviewType,
  ],
};
