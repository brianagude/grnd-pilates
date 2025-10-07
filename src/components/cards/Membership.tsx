// MembershipCard.tsx
import React from "react";
import { buttons, typography } from "@/styles/design-tokens";

interface Membership {
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

interface MembershipCardProps {
  items: Membership[];
}

const MembershipCard: React.FC<MembershipCardProps> = ({ items }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="border p-4 space-y-4 rounded-4xl bg-white sm:p-6 lg:p-10"
        >
          <h3 className={typography.h5}>{item.name}</h3>
          {/* <p className="whitespace-pre-line">{item.description}</p> */}
          <p className={typography.caption}>
            ${item.price.toLocaleString()}
            {item.freeTrialExists && <span> | Free trial available!</span>}
          </p>
          {/* <p>Type: {item.type}</p> */}
          {/* {item.freeTrialExists && <p>Free trial available!</p>} */}
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttons.primary} !w-full mt-6`}
          >
            Learn More
          </a>
        </div>
      ))}
    </div>
  );
};

export default MembershipCard;
