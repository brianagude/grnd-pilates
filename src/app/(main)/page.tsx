import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import Sections from "@/components/Sections";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_QUERY } from "@/sanity/lib/queries";
import type { UpdatedHome } from "@/sanity/lib/types";

export default async function HomePage() {
  const { data } = await sanityFetch({ query: HOME_QUERY });
  const page = data as UpdatedHome | null;
  if (!page) return notFound();
  const { hero, sections } = page;

  return (
    <>
      {hero && <Hero {...hero} />}
      {sections && <Sections sections={sections} />}
    </>
  );
}
