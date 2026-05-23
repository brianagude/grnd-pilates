import { defineLive } from "next-sanity";
import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion: "vX" }),
  // Optional: add a viewer token to Vercel env vars to enable live draft previews.
  // Create one at manage.sanity.io → your project → API → Tokens.
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
