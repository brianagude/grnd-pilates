"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { typography, spacing } from "@/styles/design-tokens";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Button from "@/components/inputs/Button";
import { BlockContent } from "./inputs/PortableTextComponents";
import Video from "./inputs/Video";
import type { Details as DetailsProps } from "@types";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'

type DetailsForButton = Omit<DetailsProps, "button"> & {
  button?: Omit<DetailsProps["button"], "internalPage"> & {
    internalPage?: { _id?: string; slug?: string | null }
  }
}


export default function Details({
  isCarousel,
  title,
  carouselContent,
  button,
}: DetailsForButton) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
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

  if (!carouselContent || carouselContent.length === 0) return null;
  const carouselCards = carouselContent.length < 4
    ? [...carouselContent, ...carouselContent]
    : carouselContent;

  return (
    <section className={spacing.section}>
      <div className={`${spacing.container} ${isCarousel && '!px-0'}`}>
        {/* Header */}
        <div className={`flex flex-col w-full gap-4 md:flex-row md:justify-between items-start ${isCarousel && 'px-4 sm:px-8 lg:px-16'}`}>
          {title && <h3 className={typography.h3}>{title}</h3>}

          <div className="flex gap-4">
            {isCarousel && (
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
            )}
            {button && <Button {...button} />}
          </div>
        </div>

        {/* Carousel */}
        {isCarousel && (
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {carouselCards.map((item, index) => {
                const { data } = item;
                const {
                  photo,
                  mediaType,
                  playbackId,
                  videoAlt,
                  textBlock,
                  attribution,
                  itemType,
                  link
                } = data;

                const isActive = index === selectedIndex;

                return (
                  <div
                    key={item._key}
                    className={`flex-shrink-0 overflow-hidden px-4 ${isActive ? 'grid flex-[0_0_100%] sm:grid-cols-2 md:flex-[0_0_90%] xl:flex-[0_0_60%] 2xl:flex-[0_0_50%]' : 'flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_45%] xl:flex-[0_0_30%] 2xl:flex-[0_0_25%]'}`}
                  >
                    {/* Media */}
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

                    {/* Text only for active card */}
                    {isActive && (
                      <div className="p-4 bg-brown-100 rounded-4xl flex flex-col gap-3 items-center justify-center md:p-5 lg:p-10">
                        {textBlock && <BlockContent value={textBlock} />}
                        {link && <a href={link} className={`${typography.link} ${typography.caption} w-full mt-2`} target="_blank" rel="noopener noreferrer">Learn More</a>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {isCarousel && (
          <div className="gap-3 px-4 sm:w-full sm:px-8 lg:hidden">
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
        )}

        {/* Grid view for non-carousel */}
        {!isCarousel && (
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {carouselContent.map((item) => {
              const { data } = item;
              const { photo, mediaType, playbackId, videoAlt, textBlock, link } = data;

              return (
                <div key={item._key} className="space-y-8">
                  <div className="relative aspect-[3/4] w-full h-auto overflow-hidden rounded-4xl">
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
                    {link && <a href={link} className={`${typography.link} ${typography.caption} w-full mt-2`} target="_blank" rel="noopener noreferrer">Learn More</a>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
