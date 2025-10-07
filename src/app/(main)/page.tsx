import type { Home } from "@types";
import { notFound } from "next/navigation";
import Sections from "@/components/Sections";
import Hero from "@/components/Hero";
import { client } from "@/sanity/lib/client";
import { draftMode } from "next/headers";
import { getPageCacheTags, getCacheOptions } from "@/lib/cache-tags";

const query = `*[_type == "home"][0]{
	...,
  hero {
    ...,
    backgroundImage {
      alt,
      asset->{
        _id,
        url,
        metadata {
          lqip,
          palette {
            dominant { background, foreground, population, title },
          }
        }
      },
      crop { top, bottom, left, right },
      hotspot { x, y, width, height }
    }
  },
  sections[] {
    _key,
    _type,
    ...select(
      _type == "midHero" => { 
        ...,
        backgroundImage {
          alt,
          asset->{
            _id,
            url,
            metadata {
              lqip,
              palette {
                dominant { background, foreground, population, title },
              }
            }
          },
          crop { top, bottom, left, right },
          hotspot { x, y, width, height }
        }
      },
      _type == "details" => { 
        ...,
        carouselContent[]->{
          ...,
          "playbackId": muxInput.muxVideo.asset->playbackId,
          "videoAlt": muxInput.title,
        }
      },
      _type == "callout" => { ... },
      _type == "momence" => { ... },
      _type == "momenceForm" => { ... },
      _type == "reviews" => { ... },
      _type == "textOnly" => { ... },
    )

  }
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
  if (!data) return notFound();
  const { hero, sections } = data || {};
  // console.log(data)
 
  return (
    <>
      {hero && <Hero {...hero} />}
      {sections && <Sections sections={sections} />}
    </>
  );
}
