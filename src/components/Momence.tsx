import { typography, spacing } from "@/styles/design-tokens";
import MembershipCards from "./cards/Memberships";
import EventCards from "./cards/Events";
import TeacherCards from "./cards/Teachers";
import ProductsCards from "./cards/Products";
import type { UpdatedMomence, Membership, Event, Teacher, Product } from "@/sanity/lib/types";

export default async function Momence({ title, integration }: UpdatedMomence) {
  if (!integration) return null;

  const hostId = process.env.MOMENCE_HOST_ID;
  const token = process.env.MOMENCE_TOKEN;

  if (!hostId || !token) {
    console.error("Missing MOMENCE_HOST_ID or MOMENCE_TOKEN");
    return null;
  }

  const endpoint = `https://api.momence.com/api/v1/${integration}?hostId=${hostId}&token=${token}`;

    let items: Membership[] | Event[] | Teacher[] | Product[] = [];

  try {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();

    switch (integration) {
      case "Memberships":
        items = data as Membership[];
        break;
      case "Events":
        items = data as Event[];
        break;
      case "Teachers":
        items = data as Teacher[];
        break;
      case "Products":
        items = data as Product[];
        break;
    }
  } catch (err) {
    console.error(err);
  }

  return (
    <section className={spacing.section}>
      <div className={spacing.container}>
        {title && <h3 className={`${typography.h3} ${integration !== "Memberships" && "w-full text-left"}`}>{title}</h3>}
        {integration === "Memberships" && <MembershipCards items={items as Membership[]} />}
        {integration === "Events" && <EventCards items={items as Event[]} />}
        {integration === "Teachers" && <TeacherCards items={items as Teacher[]} />}
        {integration === "Products" && <ProductsCards items={items as Product[]} />}
      </div>
    </section>
  );
}
