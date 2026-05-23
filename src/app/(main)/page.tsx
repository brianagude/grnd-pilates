import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import Sections from "@/components/Sections";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_QUERY } from "@/sanity/lib/queries";
import type { UpdatedHome } from "@/sanity/lib/types";

export default async function HomePage() {
  const { data } = await sanityFetch<UpdatedHome>({ query: HOME_QUERY });
  if (!data) return notFound();
  const { hero, sections } = data;

  return (
    <>
      {hero && <Hero {...hero} />}
      {sections && <Sections sections={sections} />}
    </>
  );
}
