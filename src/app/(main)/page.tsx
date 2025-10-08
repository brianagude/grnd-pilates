import type { UpdatedHome } from "@/sanity/lib/types";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { HOME_QUERY } from "@/sanity/lib/queries";
import Sections from "@/components/Sections";
import Hero from "@/components/Hero";

const options = { next: { revalidate: 30 } };

export default async function HomePage() {
  const data = await client.fetch<UpdatedHome>(HOME_QUERY, {}, options);
  if (!data) return notFound();
  const { hero, sections } = data || {};

  return (
    <>
      {hero && <Hero {...hero} />}
      {sections && <Sections sections={sections} />}
    </>
  );
}
