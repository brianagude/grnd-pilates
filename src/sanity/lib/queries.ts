const linkFragment = `
  ...,
  internalPage->{
    _id,
    "slug": slug.current
  }
`;

const heroFragment = `
  ...,
  buttons[]{
    ${linkFragment}
  },
  backgroundImage {
    alt,
    overlay,
    asset->{
      _id,
      url,
      metadata {
        lqip,
        palette {
          dominant { background, foreground, population, title },
        }
      }
    },
    crop { top, bottom, left, right },
    hotspot { x, y, width, height }
  }
`;

const midHeroFragment = `
  ...,
  buttons[]{
    ${linkFragment}
  },
  backgroundImage {
    alt,
    overlay,
    asset->{
      _id,
      url,
      metadata {
        lqip,
        palette {
          dominant { background, foreground, population, title },
        }
      }
    },
    crop { top, bottom, left, right },
    hotspot { x, y, width, height }
  }
`;

const detailsFragment = `
  ...,
  button {${linkFragment}},
  carouselContent[]{
    _key,
    "data": @->{
      ...,
      "playbackId": muxInput.muxVideo.asset->playbackId,
      "videoAlt": muxInput.title
    }
  }
`;

const calloutFragment = `
  ...,
  button {${linkFragment}}
`;

const momenceFragment = `
  ...,
`;

const momenceFormFragment = `
  ...,
`;

const reviewsFragment = `
  ...,
  backgroundImage {
    alt,
    overlay,
    asset->{
      _id,
      url,
      metadata {
        lqip,
        palette {
          dominant { background, foreground, population, title },
        }
      }
    },
    crop { top, bottom, left, right },
    hotspot { x, y, width, height }
  },
  button {${linkFragment}},
  reviewsContent[]{
    _key,
    "data": @->{
      ...,
      "playbackId": muxInput.muxVideo.asset->playbackId,
      "videoAlt": muxInput.title
    }
  }
`;

export const HOME_QUERY = `*[_type == "home"][0]{
  hero {${heroFragment}},
  sections[] {
    _key,
    _type,
    ...select(
      _type == "midHero" => {${midHeroFragment}},
      _type == "details" => {${detailsFragment}},
      _type == "callout" => {${calloutFragment}},
      _type == "momence" => {${momenceFragment}},
      _type == "momenceForm" => {${momenceFormFragment}},
      _type == "reviews" => {${reviewsFragment}},
    )
  }
}`;

export const PAGE_QUERY = `*[_type == "pageType" && slug.current == $slug][0]{
  hero {${heroFragment}},
  sections[] {
    _key,
    _type,
    ...select(
      _type == "midHero" => {${midHeroFragment}},
      _type == "details" => {${detailsFragment}},
      _type == "callout" => {${calloutFragment}},
      _type == "momence" => {${momenceFragment}},
      _type == "momenceForm" => {${momenceFormFragment}},
      _type == "reviews" => {${reviewsFragment}},
    )
  }
}`;

export const SETTINGS_QUERY = `*[_type == "settings"][0]{
  ...,
  header {
    ...,
    mainCTA {${linkFragment}},
    menuList[]{${linkFragment}}
  },
  footer {
    ...,
    footerLinks[]{${linkFragment}}
  }
}`;
