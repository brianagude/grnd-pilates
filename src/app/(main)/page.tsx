import type { Home } from "@types";
import { notFound } from "next/navigation";
// import Sections from "@/components/Sections";
// import HomeHero from "@/components/HomeHero";
import { client } from "@/sanity/lib/client";
import { draftMode } from "next/headers";
import { getPageCacheTags, getCacheOptions } from "@/lib/cache-tags";

const query = `*[_type == "home"][0]{
	...
}`;

export default async function HomePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  
  // Get cache tags for home page
  const cacheTags = getPageCacheTags('home');
  
  const data = await client.fetch<Home>(
    query,
    { slug },
    isEnabled
      ? {
          perspective: "previewDrafts",
          useCdn: false,
          stega: true,
        }
      : getCacheOptions(cacheTags, 3600), // 1 hour cache with targeted tags
  );
  // if (!data) return notFound();
  // const { hero, sections } = data || {};

  return (
    <>
    <p>home page</p>
      {/* {hero && <HomeHero {...hero} />}
      {sections && <Sections sections={sections} />} */}
    </>
  );
}
