"use client"

import { typography, spacing } from "@/styles/design-tokens";
import type { ExpandedSanityImage } from "@/sanity/lib/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Button from "@/components/inputs/Button";
import { BlockContent } from "./inputs/PortableTextComponents";
import Video from "./inputs/Video"
import type {Details as DetailsProps} from "@types"

export default function Details({
  isCarousel,
  title,
  carouselContent,
  button,
}: DetailsProps) {
  if (!carouselContent || carouselContent.length === 0) return null;

  return (
    <section className={spacing.section}>
      <div className={spacing.container}>
        <div className="flex flex-col w-full gap-4 lg:flex-row lg:justify-between">
          {title && <h3 className={typography.h3}>{title}</h3>}
          {button && <Button {...button} />}
        </div>
        {!isCarousel && 
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {carouselContent.map((item) => (
              <div key={item._createdAt} className="space-y-8">
                <div className="relative aspect-[3/4] w-full h-auto overflow-hidden rounded-4xl">
                  {(item.photo && item.mediaType === 'image') && 
                    <Image
                      src={urlFor(item.photo).url()}
                      alt={item.photo.alt || "image"}
                      fill
                      className="object-cover w-full h-full"
                    />
                  }
                  {(item.playbackId && item.mediaType === 'video') && 
                    <Video playbackId={item.playbackId} title={item.videoAlt}/>
                    // <p>has video</p>
                  }
                </div>
                <div>
                  {item.textBlock && <BlockContent value={item.textBlock} />}
                  <div>
                    {(item.attribution && item.itemType === 'reviews') && <p>{item.attribution}</p>}
                    {item.itemType === 'reviews' && <p>stars</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </section>
  );
}
