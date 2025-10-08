// EventCard.tsx

import {
  BanknotesIcon,
  CalendarDaysIcon,
  ClockIcon,
  ComputerDesktopIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import type { Event } from "@/sanity/lib/types";
import { buttons, typography } from "@/styles/design-tokens";

interface EventCardProps {
  items: Event[];
}

export default function EventCards({ items }: EventCardProps) {
  if (items.length < 1) {
    return (
      <div className="text-center space-y-3">
        <h2 className={typography.h5}>Nothing here… yet!</h2>
        <p className={typography.body}>
          We don’t have any upcoming classes at the moment. Check back soon!
        </p>
      </div>
    );
  }
  // Filter out deleted, cancelled, and past events
  const upcomingEvents = items
    .filter((item) => !item.isDeleted && !item.isCancelled)
    .filter((item) => item.type === "Regular")
    .filter((item) => new Date(item.dateTime) >= new Date()) // future events only
    .sort(
      (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime(),
    ); // sort by date

  // Group events by date (yyyy-mm-dd string)
  const groupedEvents = upcomingEvents.reduce<Record<string, Event[]>>(
    (acc, event) => {
      const dateKey = new Date(event.dateTime).toDateString(); // e.g., "Wed Nov 23 2025"
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(event);
      return acc;
    },
    {},
  );

  return (
    <div className="space-y-20">
      {Object.entries(groupedEvents).map(([dateStr, events]) => {
        const dateLabel = new Date(dateStr).toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return (
          <div key={dateStr} className="space-y-4">
            {/* Date Divider */}
            <h2 className={`${typography.caption} border-b pb-2`}>
              {dateLabel}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {events.map((item) => {
                const startDate = new Date(item.dateTime);
                const endDate = new Date(
                  startDate.getTime() + item.duration * 60000,
                );

                return (
                  <div key={item.id} className="space-y-6 group">
                    {(item.image1 || item.image2) && (
                      <div className="relative aspect-square w-full rounded-2xl overflow-hidden">
                        <Image
                          src={item.image1 ? item.image1 : item.image2}
                          alt={`${item.title} image`}
                          fill
                          className="object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className={`${typography.h6} line-clamp-1`}>
                        {item.title}
                      </h3>
                      <p
                        className={`${typography.bodySmall} mt-2 line-clamp-3`}
                      >
                        {item.description}
                      </p>

                      <ul className="space-y-1 mt-4">
                        <li className="flex gap-1 items-center">
                          <ClockIcon className="size-4 text-black" />
                          <span>
                            {startDate.toLocaleTimeString(undefined, {
                              hour: "numeric",
                              minute: "2-digit",
                            })}{" "}
                            -{" "}
                            {endDate.toLocaleTimeString(undefined, {
                              hour: "numeric",
                              minute: "2-digit",
                            })}{" "}
                            ({item.duration} min)
                          </span>
                        </li>
                        <li className="flex gap-1 items-center">
                          <CalendarDaysIcon className="size-4 text-black" />
                          <span>
                            {startDate.toLocaleDateString(undefined, {
                              weekday: "long",
                              // year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </li>
                        <li className="flex gap-1 items-center">
                          <MapPinIcon className="size-4 text-black" />
                          <span>{item.location}</span>
                        </li>
                        <li className="flex gap-1 items-center">
                          <BanknotesIcon className="size-4 text-black" />
                          <span>
                            {item.fixedPrice ? `$${item.fixedPrice}` : "Free"}
                          </span>
                        </li>
                        {item.online && (
                          <li className="flex gap-1 items-center">
                            <ComputerDesktopIcon className="size-4 text-black" />
                            <span>Online Class</span>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <a
                        href={item.link}
                        className={`${buttons.secondary} !w-full`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Book Now
                      </a>
                      <p className="text-center w-full mt-1">
                        {item.spotsRemaining} Spots Open
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
