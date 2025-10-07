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
          case "textOnly":
            return <TextOnly {...module} key={module._key} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
