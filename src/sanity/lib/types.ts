import type {
  Callout as CalloutType,
  ContentType,
  Details as DetailsType,
  Home as HomeType,
  MidHero as MidHeroType,
  MomenceForm as MomenceFormType,
  Momence as MomenceType,
  PageType as NewPageType,
  Reviews as ReviewsType,
  ReviewType,
  Settings as SettingsType,
  TextOnly as TextOnlyType,
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

type DetailDataType = Omit<
  ContentType,
  "_id" | "_type" | "_createdAt" | "_updatedAt" | "_rev"
> & {
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
export type UpdatedFooterLink = Omit<
  NonNullable<FooterBase["footerLinks"]>[number],
  "internalPage"
> & {
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

export interface Membership {
  id: number;
  name: string;
  description: string;
  type: string;
  link: string;
  price: number;
  freeTrialExists: boolean;
  isFeatured: boolean;
  isDeleted: boolean;
  isDisabled: boolean;
  isAutoRenewing: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  link: string;
  imageLink: string;
  price: number;
  leftInStock: number | null;
  isDeleted: boolean;
  availableForShipping: boolean;
  variants: string[];
}

export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  bio: string;
  profileImage: string;
  isDeleted: boolean;
}

type IntegrationType = "Memberships" | "Events" | "Teachers" | "Products";

export type UpdatedMomence = Omit<MomenceType, "button" | "integration"> & {
  button?: Omit<DetailsType["button"], "internalPage"> & {
    internalPage?: { _id?: string; slug?: string | null };
  };
  integration: IntegrationType;
  _key?: string;
};
