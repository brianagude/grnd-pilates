import Image from "next/image";
import type { Product } from "@/sanity/lib/types";
import { buttons, spacing, typography } from "@/styles/design-tokens";

interface ProductsCardProps {
  items: Product[];
}

export default function ProductCards({ items }: ProductsCardProps) {
  if (items.length < 1) {
    return (
      <div className={`${spacing.inner} text-center`}>
        <h2 className={typography.h5}>Nothing here… yet!</h2>
        <p className={typography.body}>
          We don’t have any products at the moment. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items
        .filter((item) => !item.isDeleted)
        .map((item) => (
          <a 
            key={item.id} 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${spacing.block} w-full group`}
          >
            {item.imageLink && (
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden">
                <Image
                  src={item.imageLink}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                />
              </div>
            )}
            <div className={spacing.inner}>
              <h3 className={`${typography.h5} line-clamp-1 group-hover:underline group-hover:font-bold`}>{item.name}</h3>
              <p className={`${typography.body} line-clamp-3`}>
                {item.description}
              </p>
              <p className={typography.caption}>{item.price ? `$${item.price}` : "Free"}</p>
            </div>
          </a>
        ))}
    </div>
  );
}
