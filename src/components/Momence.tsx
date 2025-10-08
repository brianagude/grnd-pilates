import { typography, spacing } from "@/styles/design-tokens";
import type { Momence as MomenceProps } from "@types";
import MembershipCard from "./cards/Membership";
import EventCard from "./cards/Event";
import TeacherCard from "./cards/Teachers";
import ProductsCard from "./cards/Products";

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
  console.log('event items:', items)

  return (
    <section className={spacing.section}>
      <div className={spacing.container}>
        {title && <h3 className={typography.h3}>{title}</h3>}
        {integration === "Memberships" && <MembershipCard items={items} />}
        {integration === "Events" && <EventCard items={items} />}
        {integration === "Teachers" && <TeacherCard items={items} />}
        {integration === "Products" && <ProductsCard items={items} />}
      </div>
    </section>
  );
}
