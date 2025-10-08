"use client";

import { typography, spacing } from "@/styles/design-tokens";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Button from "@/components/inputs/Button";
import { BlockContent } from "./inputs/PortableTextComponents";
import type { UpdatedReviews } from "@/sanity/lib/types";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Video from "./inputs/Video";

export default function Reviews({
  title,
  reviewsContent,
  button,
}: UpdatedReviews) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Update selected index when carousel changes
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!reviewsContent || reviewsContent.length === 0) return null;

  return (
    <section className={spacing.section}>
      <div className={spacing.container}>
        <div className="w-full flex">
          {title && <h3 className={typography.h3}>{title}</h3>}
          <div>
            <div className="hidden gap-2 mt-2 lg:flex lg:mt-0">
              <button
                type="button"
                onClick={scrollPrev}
                className="cursor-pointer"
              >
                <ArrowLongLeftIcon className="size-16 text-black hover:-translate-y-0.5 transition-all" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="cursor-pointer"
              >
                <ArrowLongRightIcon className="size-16 text-black hover:-translate-y-0.5 transition-all" />
              </button>
            </div>
            {button && <Button {...button} />}
          </div>
        </div>

        <div ref={emblaRef} className="overflow-hidden w-full">
          <div className="flex gap-4">
            {reviewsContent.map((item) => {
              const { data } = item;
              const {
                photo,
                mediaType,
                playbackId,
                videoAlt,
                textBlock,
                attribution,
              } = data;

              return (
                <div
                  key={item._key}
                  className="rounded-4xl text-white bg-black flex-shrink-0 overflow-hidden flex-[0_0_100%] sm:flex-[0_0_48%] lg:flex-[0_0_33%] xl:flex-[0_0_25%]"
                >
                  {mediaType !== "none" && (photo || playbackId) && (
                    <div className="relative aspect-square w-full h-auto">
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
                  )}

                  <div className="p-6 flex flex-col gap-2">
                    {textBlock && (
                      <BlockContent value={textBlock} classes="!mt-0" />
                    )}
                    {attribution && (
                      <p className={typography.captionSmall}>{attribution}</p>
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
