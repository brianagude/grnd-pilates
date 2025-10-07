"use client"

import { typography, spacing } from "@/styles/design-tokens";
import type { ExpandedSanityImage } from "@/sanity/lib/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Button from "@/components/inputs/Button";
import { BlockContent } from "./inputs/PortableTextComponents";
import type {Reviews as ReviewsProps} from "@types"
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Video from "./inputs/Video";

export default function Reviews({
  title,
  reviewsContent,
  button,
}: ReviewsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", skipSnaps: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Update selected index when carousel changes
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect(); // initialize
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!reviewsContent || reviewsContent.length === 0) return null

  return (
    <section className={spacing.section}>
      <div className={spacing.container}>
        <div>
          {title && <h3 className={typography.h3}>{title}</h3>}
          <div>
            <div className="hidden gap-2 mt-2 lg:flex lg:mt-0">
              <button
                type="button"
                onClick={scrollPrev}
                className="cursor-pointer"
              >
                <ArrowLongLeftIcon className="size-16 text-black hover:-translate-y-0.5 transition-all"/>
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="cursor-pointer"
              >
                <ArrowLongRightIcon className="size-16 text-black hover:-translate-y-0.5 transition-all"/>
              </button>
            </div>
            {button && <Button {...button} />}
          </div>
        </div>

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {reviewsContent.map((item, index) => {
              const { data } = item;
              const {
                photo,
                mediaType,
                playbackId,
                videoAlt,
                textBlock,
                attribution,
                itemType,
              } = data;


              return (
                <div
                  key={item._key}
                  className={`flex-shrink-0 overflow-hidden px-4 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%]`}
                >
                  <div className="relative aspect-[3/4] w-full h-auto rounded-4xl overflow-hidden">
                    {mediaType === "image" && photo && (
                      <Image
                        src={urlFor(photo).url()}
                        alt={photo.alt || "image"}
                        fill
                        className="object-cover w-full h-full"
                      />
                    )}
                    {mediaType === "video" && playbackId && (
                      <Video playbackId={playbackId} title={videoAlt} />
                    )}
                  </div>

                  <div className="p-4 bg-brown-100 rounded-4xl flex items-center space-y-2 md:p-5 lg:p-10">
                    {textBlock && <BlockContent value={textBlock} />}
                    {itemType === "reviews" && (
                      <div>
                        {attribution && <p>{attribution}</p>}
                        <p>stars</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
