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

export type UpdatedReviews = Omit<ReviewsType, "button" | "reviewsContent"> & {
  button?: Omit<ReviewsType["button"], "internalPage"> & {
    internalPage?: { _id?: string; slug?: string | null };
  };
  reviewsContent?: ReviewItem[];
  _key?: string
};

export type UpdatedDetails = Omit<DetailsType, "button" | "reviewsContent"> & {
  button?: Omit<ReviewsType["button"], "internalPage"> & {
    internalPage?: { _id?: string; slug?: string | null };
  };
  reviewsContent?: ReviewItem[];
  _key?: string
};

export type UpdatedCallout = Omit<CalloutType, "button"> & {
  button?: Omit<CalloutType["button"], "internalPage"> & {
    internalPage?: { _id?: string; slug?: string | null };
  };
  _key?: string
};

export type UpdatedMomence = Omit<MomenceType, "button"> & {
  button?: Omit<DetailsType["button"], "internalPage"> & {
    internalPage?: { _id?: string; slug?: string | null };
  };
  _key?: string
};

export type UpdatedMomenceForm = MomenceFormType & {
  _key?: string
};

export type UpdatedTextOnly = TextOnlyType & {
  _key?: string
};

export type UpdatedMidHero = Omit<MidHeroType, "buttons"> & {
  buttons?: Array<
    Omit<
      NonNullable<MidHeroType["buttons"]>[number],
      "internalPage"
    > & {
      internalPage?: { _id?: string; slug?: string | null };
    }
  >;
  _key?: string;
};

export type UpdatedHome = Omit<HomeType, "sections"> & {
  sections?: Array<
    UpdatedMidHero |
    UpdatedTextOnly |
    UpdatedReviews |
    UpdatedDetails |
    UpdatedCallout |
    UpdatedMomence |
    UpdatedMomenceForm
  >;
  _key?: string;
};

export type UpdatedNewPageType = Omit<NewPageType, "sections"> & {
  sections?: Array<
    UpdatedMidHero |
    UpdatedTextOnly |
    UpdatedReviews |
    UpdatedDetails |
    UpdatedCallout |
    UpdatedMomence |
    UpdatedMomenceForm
  >;
  _key?: string;
};


