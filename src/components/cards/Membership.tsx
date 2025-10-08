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
  if (items.length < 1) {
    return (
      <div className="text-center space-y-3">
        <h2 className={typography.h5}>Nothing here… yet!</h2>
        <p className={typography.body}>
          We don’t have any available memberships at the moment. Check back soon!
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-4 w-full max-w-5xl mx-auto">
      {items.map((item) => (
        <a
          key={item.id}
          className="group flex flex-col gap-6 sm:justify-between sm:flex-row items-center bg-white py-4 px-6 rounded-2xl border border-black transition-all cursor-pointer hover:shadow-lg transform hover:translate-x-[-1px] hover:translate-y-[-1px]"
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3 className={typography.h6}>{item.name}</h3>
          {/* <p className="whitespace-pre-line">{item.description}</p> */}
          {/* <p className={typography.caption}>
            ${item.price.toLocaleString()}
            {item.freeTrialExists && <span> | Free trial available!</span>}
          </p> */}
          {/* <p>Type: {item.type}</p> */}
          {/* {item.freeTrialExists && <p>Free trial available!</p>} */}
          <button
            type="button"
            className={`${buttons.secondary} whitespace-nowrap !bg-brown-100 text-black group-hover:!bg-black group-hover:!text-white`}
          >
            Learn More
          </button>
        </a>
      ))}
    </div>
  );
};

export default MembershipCard;
