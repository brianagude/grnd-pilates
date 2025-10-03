import Callout from "@/components/Callout";
import Details from "@/components/Details";
import MidHero from "@/components/MidHero";
import Momence from "@/components/Momence";
import MomenceForm from "@/components/MomenceForm";
import Reviews from "@/components/Reviews";
import TextOnly from "@/components/TextOnly";

import type {
  Callout as CalloutType,
  Details as DetailsType,
  MidHero as MidHeroType,
  Momence as MomenceType,
  MomenceForm as MomenceFormType,
  Reviews as ReviewsType,
  TextOnly as TextOnlyType,
} from "@types";

// // Add _key string property to extended types
// type CollaborationType = Omit<AutoCollaboration, "collab"> & {
//   collab?: Collaborator[];
//   _key: string;
// };

// type EventsType = Omit<AutoEvents, "eventsList"> & {
//   eventsList?: Event[];
//   _key: string;
// };

// type FeaturedArtistsType = Omit<AutoFeaturedArtists, "artists"> & {
//   artists?: Artist[];
//   _key: string;
// };

// type TicketsType = Omit<AutoTickets, "tickets"> & {
//   tickets?: Ticket[];
//   _key: string;
// };

// // Add _key similarly for other types as needed if they don't already have it
// type CountdownExtended = CountdownType & { _key: string };
// type FAQsExtended = FAQsType & { _key: string };
// type FeaturedImageExtended = FeaturedImageType & { _key: string };
// type MarqueeExtended = MarqueeType & { _key: string };
// type PromoBannerExtended = PromoBannerType & { _key: string };
// type SocialMediaExtended = SocialMediaType & { _key: string };
// type SponsorshipsExtended = SponsorshipsType & { _key: string };

type SectionModule =
  | CalloutType
  | DetailsType
  | MidHeroType
  | MomenceType
  | MomenceFormType
  | ReviewsType
  | TextOnlyType

type SectionsProps = {
  sections: SectionModule[];
};

export default function Sections({ sections }: SectionsProps) {
  if (!sections || sections.length < 1) return null;

  return (
    <div className="bg-fancy-gradient min-h-screen">
      {sections.map((module) => {
        switch (module._type) {
          case "callout":
            return <Callout {...module} key={module._key} />;
          case "details":
            return <Details {...module} key={module._key} />;
          case "midHero":
            return <MidHero {...module} key={module._key} />;
          case "momence":
            return <Momence {...module} key={module._key} />;
          case "momenceForm":
            return <MomenceForm {...module} key={module._key} />;
          case "reviews":
            return <Reviews {...module} key={module._key} />;
          case "textOnly":
            return <TextOnly {...module} key={module._key} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
