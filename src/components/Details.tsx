"use client";

import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback } from "react";
import Button from "@/components/inputs/Button";
import { urlFor } from "@/sanity/lib/image";
import type { UpdatedDetails } from "@/sanity/lib/types";
import { spacing, typography } from "@/styles/design-tokens";
import { BlockContent } from "./inputs/PortableTextComponents";
import Video from "./inputs/Video";

type ItemType = NonNullable<UpdatedDetails["carouselContent"]>[number];


type DetailCardProps = {
  item: ItemType;
  classes?: string;
};


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
        <div
          className={`flex flex-col w-full gap-3 items-start md:items-center md:flex-row md:justify-between ${isCarousel && "px-4 sm:px-8 lg:px-16"}`}
        >
          {title && <h3 className={typography.h3}>{title}</h3>}

          <div className="w-full md:w-fit md:items-center md:gap-5 md:flex">
            {isCarousel && (
              <div className="hidden md:flex items-center justify-center gap-3">
                <button onClick={scrollPrev} type="button" className="cursor-pointer">
                  <ArrowLongLeftIcon className="size-16 text-black hover:-translate-y-0.5 transition-all" />
                </button>
                <button onClick={scrollNext} type="button" className="cursor-pointer">
                  <ArrowLongRightIcon className="size-16 text-black hover:-translate-y-0.5 transition-all" />
                </button>
              </div>
            )}
            {button && <Button {...button} />}
          </div>
        </div>

        {isCarousel ? (
          <div ref={emblaRef} className="overflow-hidden w-full px-4 sm:px-8 lg:px-16">
            <div className="flex">
              {carouselContent.map((item) => (
                <DetailCard
                  key={item._key}
                  item={item}
                  classes="px-2 flex-[0_0_100%] sm:flex-[0_0_90%] md:flex-[0_0_50%] xl:flex-[0_0_33%]"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {carouselContent.map((item) => (
              <DetailCard key={item._key} item={item} />
            ))}
          </div>
        )}

        {isCarousel && (
          <div className="flex items-center justify-center gap-3 px-4 w-full sm:px-8 md:hidden">
            <button onClick={scrollPrev} type="button" className="cursor-pointer">
              <ArrowLongLeftIcon className="size-16 text-black hover:-translate-y-0.5 transition-all" />
            </button>
            <button onClick={scrollNext} type="button" className="cursor-pointer">
              <ArrowLongRightIcon className="size-16 text-black hover:-translate-y-0.5 transition-all" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}


const DetailCard: React.FC<DetailCardProps> = ({ item, classes = "" }) => {
  const { data } = item;
  const { photo, mediaType, playbackId, videoAlt, textBlock, link } = data;

  if (link) {
    return (
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`${spacing.block} group div-link ${classes}`}
      >
        <div className="relative aspect-[4/3] w-full h-auto overflow-hidden rounded-3xl">
          {mediaType === "image" && photo && (
            <Image
              src={urlFor(photo).url()}
              alt={photo.alt || "image"}
              fill
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105"
            />
          )}
          {mediaType === "video" && playbackId && (
            <Video playbackId={playbackId} title={videoAlt} />
          )}
        </div>

        {textBlock && <BlockContent value={textBlock} classes="px-2 sm:px-5" />}
      </a>
    );
  }

  return (
    <div className={`${spacing.block} ${classes} `}>
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

      {textBlock && <BlockContent value={textBlock} classes="px-2 sm:px-5" />}
    </div>
  );
};
