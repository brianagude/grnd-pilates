import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import Sections from "@/components/Sections";
import { CACHE_TAGS, getCacheOptions } from "@/lib/cache-tags";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import type { UpdatedNewPageType } from "@/sanity/lib/types";

const options = getCacheOptions([CACHE_TAGS.SETTINGS], 3600);

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const data = await client.fetch<UpdatedNewPageType>(
    PAGE_QUERY,
    await params,
    options,
  );
  if (!data) return notFound();
  const { hero, sections } = data || {};

  return (
    <>
      {hero && <Hero {...hero} classes="!min-h-[90vh]" />}
      {sections && <Sections sections={sections} />}
    </>
  );
}
