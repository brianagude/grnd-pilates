import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import Sections from "@/components/Sections";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY, PAGE_SLUGS_QUERY } from "@/sanity/lib/queries";
import type { UpdatedNewPageType } from "@/sanity/lib/types";

export async function generateStaticParams() {
  const pages = await client.fetch<{ slug: string }[]>(PAGE_SLUGS_QUERY);
  return pages.map(({ slug }) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data } = await sanityFetch({ query: PAGE_QUERY, params: await params });
  const page = data as UpdatedNewPageType | null;
  if (!page) return notFound();
  const { hero, sections } = page;

  return (
    <>
      {hero && <Hero {...hero} classes="!min-h-[90vh]" />}
      {sections && <Sections sections={sections} />}
    </>
  );
}
