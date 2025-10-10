"use client";

import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import Button from "@/components/inputs/Button";
import { urlFor } from "@/sanity/lib/image";
import type { UpdatedDetails } from "@/sanity/lib/types";
import { spacing, typography } from "@/styles/design-tokens";
import { BlockContent } from "./inputs/PortableTextComponents";
import Video from "./inputs/Video";

export default function Details({
  isCarousel,
  title,
  carouselContent,
  button,
}: UpdatedDetails) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			slidesToScroll: 1,
			dragFree: false,
			containScroll: "trimSnaps",
      align: 'start'
		},
	);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!carouselContent || carouselContent.length === 0) return null;

  return (
    <section className={spacing.section}>
      <div className={`${spacing.container} ${isCarousel && "!px-0"}`}>
        {/* Header */}
        <div
          className={`flex flex-col w-full gap-4 md:flex-row md:justify-between items-start ${isCarousel && "px-4 sm:px-8 lg:px-16"}`}
        >
          {title && <h3 className={typography.h3}>{title}</h3>}

          <div className="flex gap-4 items-center">
            {button && <Button {...button} />}
            {isCarousel && (
              <div className="hidden gap-2 mt-2 lg:flex lg:mt-0">
                <button onClick={scrollPrev} type="button" className="cursor-pointer">
                  <ArrowLongLeftIcon className="size-16 text-black hover:-translate-y-0.5 transition-all" />
                </button>
                <button onClick={scrollNext} type="button" className="cursor-pointer">
                  <ArrowLongRightIcon className="size-16 text-black hover:-translate-y-0.5 transition-all" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Carousel */}
        {isCarousel ? (
          <div ref={emblaRef} className="overflow-hidden w-full px-4 sm:px-8 lg:px-16">
            <div className="flex">
              {carouselContent.map((item) => (
                <ReviewCard
                  key={item._key}
                  item={item}
                  classes="px-2 flex-[0_0_100%] sm:flex-[0_0_90%] md:flex-[0_0_50%] xl:flex-[0_0_33%]"
                />
              ))}
            </div>
          </div>
        ) : (
          // Grid
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {carouselContent.map((item) => (
              <ReviewCard key={item._key} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


const ReviewCard = ({ item, classes = "" }) => {
  const { data } = item;
  const { photo, mediaType, playbackId, videoAlt, textBlock, link } = data;

  return (
    <div className={`${classes} space-y-3`}>
      <div className="relative aspect-[4/3] w-full h-auto overflow-hidden rounded-3xl">
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

      <div className="px-3 flex flex-col gap-3 md:px-5">
        {textBlock && <BlockContent value={textBlock} />}
        {link && (
          <a
            href={link}
            className={`${typography.link} ${typography.caption} w-full mt-2`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        )}
      </div>
    </div>
  );
};