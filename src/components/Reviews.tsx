"use client";

import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Button from "@/components/inputs/Button";
import { urlFor } from "@/sanity/lib/image";
import type { UpdatedReviews } from "@/sanity/lib/types";
import { spacing, typography } from "@/styles/design-tokens";
import HeroBackground from "./inputs/HeroBackground";
import { BlockContent } from "./inputs/PortableTextComponents";
import Video from "./inputs/Video";

export default function Reviews({
  title,
  reviewsContent,
  button,
  backgroundImage,
}: UpdatedReviews) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
    },
    [Autoplay({ delay: 10000, stopOnInteraction: false })],
  );
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
    <section className={`${spacing.section} min-h-[80vh] relative`}>
      <div className={`${spacing.container} !px-0`}>
        <div className="flex flex-col w-full gap-4 px-4 sm:px-8  md:flex-row md:justify-between items-start lg:px-16">
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

        <div
          ref={emblaRef}
          className="overflow-hidden w-full px-4 sm:px-8 lg:px-16"
        >
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
                  className="px-4 flex-shrink-0 overflow-hidden flex-[0_0_100%] sm:flex-[0_0_48%] lg:flex-[0_0_33%] 3xl:flex-[0_0_25%]"
                >
                  {mediaType !== "none" && (photo || playbackId) && (
                    <div className="relative aspect-video w-full h-auto rounded-2xl overflow-hidden mb-4">
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

                  <div>
                    {textBlock && (
                      <BlockContent value={textBlock} classes="!mt-0" />
                    )}
                    <div className="w-full border ml-auto mt-4" />
                    <Image
                      src="/stars.svg"
                      alt="5 stars"
                      width={100}
                      height={18}
                      className="ml-auto mt-3"
                    />
                    {attribution && (
                      <p className={`${typography.captionSmall} text-end mt-1`}>
                        {attribution}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {backgroundImage && <HeroBackground image={backgroundImage} />}
    </section>
  );
}
