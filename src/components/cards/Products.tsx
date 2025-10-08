// ProductsCard.tsx
import React from "react";
import Image from "next/image"
import { buttons, typography } from "@/styles/design-tokens"
import { BanknotesIcon } from "@heroicons/react/24/solid";

export interface Product {
  id: number;
  name: string;
  description: string;
  link: string;
  imageLink: string;
  price: number;
  leftInStock: number | null;
  isDeleted: boolean;
  availableForShipping: boolean;
  variants: string[];
}

interface ProductsCardProps {
  items: Product[];
}

const ProductsCard: React.FC<ProductsCardProps> = ({ items }) => {
  if (items.length < 1) {
    return (
      <div className="text-center space-y-3">
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
          <div key={item.id} className="w-full group space-y-4">
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
            <div className="space-y-2">
              <h3 className={`${typography.h6} line-clamp-1`}>{item.name}</h3>
              <p className={`${typography.bodySmall} line-clamp-3`}>{item.description}</p>
              {/* <div className="flex gap-1 items-center">
                <BanknotesIcon className="size-4 text-black" />
                <span>{item.price ? `$${item.price}` : "Free"}</span>
              </div> */}
            </div>
            <a href={item.link} target="_blank" rel="noopener noreferrer" className={`${buttons.secondary} !w-full`}>
              Purchase &mdash; {item.price ? `$${item.price}` : "Free"}
            </a>
          </div>
        ))}
    </div>
  );
};

export default ProductsCard;
