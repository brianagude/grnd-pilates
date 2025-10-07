import { typography, spacing } from "@/styles/design-tokens";
import type { Momence as MomenceProps } from "@types";
// import MembershipCard from "./cards/Membership";
import ClassesCard from "./cards/Classes";

export default async function Momence({ title, integration }: MomenceProps) {
  if (!integration) return null;

  const hostId = process.env.MOMENCE_HOST_ID;
  const token = process.env.MOMENCE_TOKEN;

  if (!hostId || !token) {
    console.error("Missing MOMENCE_HOST_ID or MOMENCE_TOKEN");
    return null;
  }

  const endpoint = `https://api.momence.com/api/v1/${integration}?hostId=${hostId}&token=${token}`;

  let items: { title: string }[] = [];

  try {
    const res = await fetch(endpoint);
    items = await res.json();
  } catch (err) {
    console.error(err);
  }

  if (items.length === 0) return null;

  return (
    <section className={spacing.section}>
      <div className={spacing.container}>
        {title && <h3 className={typography.h3}>{title}</h3>}
        <div className="momence-wrapper">
          {/* {integration === "Memberships" && <MembershipCard items={items} />} */}
          {integration === "Classes" && <ClassesCard />}
          {/* {items.map((item, i) => (
            <MembershipCard key={item.id} item={item} />
          ))} */}
        </div>
      </div>
    </section>
  );
}
