import type { PageType } from "@types";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries"
import Sections from "@/components/Sections";
import Hero from "@/components/Hero";

const options = { next: { revalidate: 30 } };

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const data = await client.fetch<PageType>(PAGE_QUERY, await params, options);
  if (!data) return notFound();
  const { hero, sections } = data || {};
  
  return (
    <>
      {hero && <Hero {...hero} classes="!min-h-[90vh]" />}
      {sections && <Sections sections={sections} />}
    </>
  );
}