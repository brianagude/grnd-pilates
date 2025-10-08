// EventCard.tsx
import React from "react";
import Image from "next/image";
import { buttons, typography } from "@/styles/design-tokens";
import { MapPinIcon, ClockIcon, CalendarDaysIcon, BanknotesIcon, ComputerDesktopIcon } from "@heroicons/react/24/solid";

export interface Event {
  id: number;
  title: string;
  description: string;
  type: string;
  link: string;
  dateTime: string;
  image1: string;
  image2: string;
  duration: number;
  fixedPrice: number;
  online: boolean;
  location: string;
  streamLink: string;
  streamPassword: string;
  isCancelled: boolean;
  isDeleted: boolean;
  allowWaitlist: boolean;
  capacity: number;
  spotsRemaining: number;
  ticketsSold: number;
  tags: string[];
  hostId: number;
  published: boolean;
  teacherId: number;
  originalTeacherId: number;
  originalTeacher: string;
  teacher: string;
  additionalTeachers: string[];
}

interface EventCardProps {
  items: Event[];
}

const EventCard: React.FC<EventCardProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {items
        .filter((item) => !item.isDeleted && !item.isCancelled)
        .map((item) => {
          const startDate = new Date(item.dateTime);
          const endDate = new Date(startDate.getTime() + item.duration * 60000);

          return (
            <div key={item.id} className="space-y-6">
              {(item.image1 || item.image2) && (
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden">
                  <Image
                    src={item.image1 ? item.image1 : item.image2}
                    alt={`${item.title} image`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className={`${typography.h6} line-clamp-1`}>{item.title}</h3>
                <p className={`${typography.bodySmall} mt-2 line-clamp-3`}>{item.description}</p>

                <ul className="space-y-1 mt-4">
                  <li className="flex gap-1 items-center">
                    <CalendarDaysIcon className="size-4 text-black" />
                    <span>
                      {startDate.toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </li>
                  <li className="flex gap-1 items-center">
                    <ClockIcon className="size-4 text-black" />
                    <span>
                      {startDate.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })} -{" "}
                      {endDate.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })} ({item.duration} min)
                    </span>
                  </li>
                  <li className="flex gap-1 items-center">
                    <MapPinIcon className="size-4 text-black" />
                    <span>{item.location}</span>
                  </li>
                  <li className="flex gap-1 items-center">
                    <BanknotesIcon className="size-4 text-black" />
                    <span>{item.fixedPrice ? `$${item.fixedPrice}` : "Free"}</span>
                  </li>
                  {item.online && 
                    <li className="flex gap-1 items-center">
                      <ComputerDesktopIcon className="size-4 text-black" />
                      <span>Online Class</span>
                    </li>
                  }
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
                <p className="text-center w-full mt-1">{item.spotsRemaining} Spots Open</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default EventCard;
