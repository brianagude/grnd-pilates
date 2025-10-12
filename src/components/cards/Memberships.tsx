import type { Membership } from "@/sanity/lib/types";
import { buttons, spacing, typography } from "@/styles/design-tokens";

interface MembershipCardProps {
  items: Membership[];
}

export default function MembershipCards({ items }: MembershipCardProps) {
  if (items.length < 1) {
    return (
      <div className={`${spacing.inner} text-center`}>
        <h2 className={typography.h5}>Nothing here… yet!</h2>
        <p className={typography.body}>
          We don’t have any available memberships at the moment. Check back
          soon!
        </p>
      </div>
    );
  }
  return (
    <div className={`${spacing.block} w-full max-w-5xl mx-auto`}>
      {items.map((item) => (
        <a
          key={item.id}
          className={`${spacing.block} group flex flex-col sm:justify-between sm:flex-row sm:items-center bg-white py-4 px-6 rounded-2xl border border-black transition-all cursor-pointer hover:shadow-lg transform hover:translate-x-[-1px] hover:translate-y-[-1px]"`}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3 className={`${typography.h5} text-center sm:text-start font-semibold !mb-0`}>{item.name}</h3>
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
}
