export const CACHE_TAGS = {
  HOME: "home",
  PAGE: "pageType",
  SETTINGS: "settings",
  CONTENT: "contentType",
  REVIEW: "reviewType",
} as const;

export function getCacheOptions(
  tags: string[],
  revalidateSeconds = 60,
) {
  return {
    next: {
      tags,
      revalidate: revalidateSeconds,
    },
  };
}
