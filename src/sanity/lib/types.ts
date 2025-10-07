import type {
  Home as HomeType,
  PageType as NewPageType,
  Callout as CalloutType,
  Details as DetailsType,
  MidHero as MidHeroType,
  Momence as MomenceType,
  MomenceForm as MomenceFormType,
  Reviews as ReviewsType,
  TextOnly as TextOnlyType,
  Settings as SettingsType,
  ReviewType,
  ContentType
} from "@types";

export type ExpandedSanityImage = {
  _type: "image";
  alt?: string;
  asset?: {
    _ref: string;
    _type: "reference";
  };
};

type ReviewItem = {
  _key: string;
  data: ReviewType & {
    playbackId?: string;
    videoAlt?: string;
  };
};

type DetailDataType = Omit<ContentType, "_id" | "_type" | "_createdAt" | "_updatedAt" | "_rev"> & {
  playbackId?: string;
  videoAlt?: string;
  link?: string;
};

type DetailItem = {
  _key: string;
  data: DetailDataType;
};

export type UpdatedReviews = Omit<ReviewsType, "button" | "reviewsContent"> & {
  button?: Omit<ReviewsType["button"], "internalPage"> & {
    internalPage?: { _id?: string; slug?: string | null };
  };
  reviewsContent?: ReviewItem[];
  _key?: string;
};

export type UpdatedDetails = Omit<DetailsType, "button" | "carouselContent"> & {
  button?: Omit<DetailsType["button"], "internalPage"> & {
    internalPage?: { _id?: string; slug?: string | null };
  };
  carouselContent?: DetailItem[];
  _key?: string;
};

export type UpdatedCallout = Omit<CalloutType, "button"> & {
  button?: Omit<CalloutType["button"], "internalPage"> & {
    internalPage?: { _id?: string; slug?: string | null };
  };
  _key?: string;
};

export type UpdatedMomence = Omit<MomenceType, "button"> & {
  button?: Omit<DetailsType["button"], "internalPage"> & {
    internalPage?: { _id?: string; slug?: string | null };
  };
  _key?: string;
};

export type UpdatedMomenceForm = MomenceFormType & {
  _key?: string;
};

export type UpdatedTextOnly = TextOnlyType & {
  _key?: string;
};

export type UpdatedMidHero = Omit<MidHeroType, "buttons"> & {
  buttons?: Array<
    Omit<NonNullable<MidHeroType["buttons"]>[number], "internalPage"> & {
      internalPage?: { _id?: string; slug?: string | null };
    }
  >;
  _key?: string;
};

export type UpdatedHome = Omit<HomeType, "sections"> & {
  sections?: Array<
    | UpdatedMidHero
    | UpdatedTextOnly
    | UpdatedReviews
    | UpdatedDetails
    | UpdatedCallout
    | UpdatedMomence
    | UpdatedMomenceForm
  >;
  _key?: string;
};

export type UpdatedNewPageType = Omit<NewPageType, "sections"> & {
  sections?: Array<
    | UpdatedMidHero
    | UpdatedTextOnly
    | UpdatedReviews
    | UpdatedDetails
    | UpdatedCallout
    | UpdatedMomence
    | UpdatedMomenceForm
  >;
  _key?: string;
};

// Make sure the Settings type exists
type HeaderBase = NonNullable<SettingsType["header"]>;
type FooterBase = NonNullable<SettingsType["footer"]>;

// First, define your "updated button" shape
export type UpdatedButton = Omit<HeaderBase["mainCTA"], "internalPage"> & {
  internalPage?: { _id?: string; slug?: string | null };
};

// Now create the type for the header only
export type UpdatedHeader = {
  logo?: HeaderBase["logo"];
  mainCTA?: UpdatedButton;
  menuList?: Array<
    Omit<NonNullable<HeaderBase["menuList"]>[number], "internalPage"> & {
      internalPage?: { _id?: string; slug?: string | null };
    }
  >;
};

// Reuse the UpdatedButton type for links that need the internalPage update
export type UpdatedFooterLink = Omit<NonNullable<FooterBase["footerLinks"]>[number], "internalPage"> & {
  internalPage?: { _id?: string; slug?: string | null };
};

// Now define the footer type including logo, links, supportText, and social media
export type UpdatedFooter = {
  logo?: FooterBase["logo"];
  copyrightText?: FooterBase["copyrightText"];
  footerLinks?: UpdatedFooterLink[];
  supportText?: FooterBase["supportText"];
  socialMedia?: SettingsType["socialMedia"];
};



