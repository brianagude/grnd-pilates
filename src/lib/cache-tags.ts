/**
 * Cache tag management for Sanity queries
 * This helps optimize ISR by providing targeted revalidation
 */

export const CACHE_TAGS = {
  // Page-level tags
  HOME: "home",
  EVENTS_PAGE: "eventsPage",
  INFO_PAGE: "infoPage",
  SETTINGS: "settings",

  // Content tags
  ARTIST: "artist",
  EVENT: "event",
  TICKET: "ticket",
  COLLABORATOR: "collaborator",

  // Section tags
  COLLABORATION: "collaboration",
  COUNTDOWN: "countdown",
  EVENTS: "events",
  FAQS: "faqs",
  FEATURED_ARTISTS: "featuredArtists",
  FEATURED_IMAGE: "featuredImage",
  MARQUEE: "marquee",
  PROMO_BANNER: "promoBanner",
  SOCIAL_MEDIA: "socialMedia",
  SPONSORSHIPS: "sponsorships",
  TICKETS: "tickets",
} as const;

/**
 * Get cache tags for a specific page
 */
export function getPageCacheTags(page: "home" | "events" | "info"): string[] {
  const baseTags = [CACHE_TAGS.SETTINGS];

  switch (page) {
    case "home":
      return [
        ...baseTags,
        CACHE_TAGS.HOME,
        CACHE_TAGS.ARTIST,
        CACHE_TAGS.EVENT,
        CACHE_TAGS.TICKET,
        CACHE_TAGS.COLLABORATION,
      ];
    case "events":
      return [
        ...baseTags,
        CACHE_TAGS.EVENTS_PAGE,
        CACHE_TAGS.EVENT,
        CACHE_TAGS.ARTIST,
        CACHE_TAGS.TICKET,
      ];
    case "info":
      return [
        ...baseTags,
        CACHE_TAGS.INFO_PAGE,
        CACHE_TAGS.ARTIST,
        CACHE_TAGS.TICKET,
        CACHE_TAGS.COLLABORATION,
      ];
    default:
      return baseTags;
  }
}

/**
 * Get pages that should be revalidated when a document type changes
 */
export function getPagesToRevalidate(documentType: string): string[] {
  const pageMap: Record<string, string[]> = {
    [CACHE_TAGS.HOME]: ["/"],
    [CACHE_TAGS.EVENTS_PAGE]: ["/events"],
    [CACHE_TAGS.INFO_PAGE]: ["/info"],
    [CACHE_TAGS.SETTINGS]: ["/", "/events", "/info"],
    [CACHE_TAGS.EVENT]: ["/events", "/"],
    [CACHE_TAGS.ARTIST]: ["/events", "/", "/info"],
    [CACHE_TAGS.TICKET]: ["/events", "/", "/info"],
    [CACHE_TAGS.COLLABORATOR]: ["/events", "/", "/info"],
    [CACHE_TAGS.COLLABORATION]: ["/events", "/", "/info"],
    [CACHE_TAGS.COUNTDOWN]: ["/events", "/", "/info"],
    [CACHE_TAGS.EVENTS]: ["/events", "/", "/info"],
    [CACHE_TAGS.FAQS]: ["/events", "/", "/info"],
    [CACHE_TAGS.FEATURED_ARTISTS]: ["/events", "/", "/info"],
    [CACHE_TAGS.FEATURED_IMAGE]: ["/events", "/", "/info"],
    [CACHE_TAGS.MARQUEE]: ["/events", "/", "/info"],
    [CACHE_TAGS.PROMO_BANNER]: ["/events", "/", "/info"],
    [CACHE_TAGS.SOCIAL_MEDIA]: ["/events", "/", "/info"],
    [CACHE_TAGS.SPONSORSHIPS]: ["/events", "/", "/info"],
    [CACHE_TAGS.TICKETS]: ["/events", "/", "/info"],
  };

  return pageMap[documentType] || [];
}

/**
 * Get cache options for Sanity queries
 */
export function getCacheOptions(
  tags: string[],
  revalidateSeconds: number = 3600,
) {
  return {
    next: {
      tags,
      revalidate: revalidateSeconds,
    },
  };
}
