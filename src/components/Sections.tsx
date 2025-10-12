import Callout from "@/components/Callout";
import Details from "@/components/Details";
import MidHero from "@/components/MidHero";
import Momence from "@/components/Momence";
import MomenceForm from "@/components/MomenceForm";
import Reviews from "@/components/Reviews";

import type {
  UpdatedCallout,
  UpdatedDetails,
  UpdatedMidHero,
  UpdatedMomence,
  UpdatedMomenceForm,
  UpdatedReviews,
} from "@/sanity/lib/types";

type SectionModule =
  | UpdatedCallout
  | UpdatedDetails
  | UpdatedMidHero
  | UpdatedMomence
  | UpdatedMomenceForm
  | UpdatedReviews;

type SectionsProps = {
  sections: SectionModule[];
};

export default function Sections({ sections }: SectionsProps) {
  if (!sections || sections.length < 1) return null;

  return (
    <div>
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
          default:
            return null;
        }
      })}
    </div>
  );
}
