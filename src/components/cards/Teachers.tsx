import Image from "next/image";
import type { Teacher } from "@/sanity/lib/types";
import { spacing, typography } from "@/styles/design-tokens";

interface TeacherCardProps {
  items: Teacher[];
}

export default function TeacherCards({ items }: TeacherCardProps) {
  if (items.length < 1) {
    return (
      <div className={`${spacing.inner} text-center`}>
        <h2 className={typography.h5}>Nothing here… yet!</h2>
        <p className={typography.body}>
          We don’t have any instructors at the moment. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-10 xl:grid-cols-2">
      {items
        .filter((item) => !item.isDeleted)
        .map((item) => (
          <div key={item.id} className="grid sm:grid-cols-2">
            {item.profileImage && (
              <div className="relative aspect-[3/4] w-full h-auto rounded-3xl overflow-hidden">
                <Image
                  src={item.profileImage}
                  alt={`${item.firstName} ${item.lastName}`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="px-4 py-6 bg-brown-100 rounded-3xl flex flex-col gap-3 items-start justify-center text-left md:p-8 2xl:p-10">
              <h3 className={typography.h6}>
                {item.firstName} {item.lastName}
              </h3>
              <p className={typography.bodySmall}>{item.bio}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
