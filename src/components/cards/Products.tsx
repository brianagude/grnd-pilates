// ProductsCard.tsx
import React from "react";
import Image from "next/image"
import { buttons, typography } from "@/styles/design-tokens"

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
  return (
    <div className="grid grid-cols-3 w-full">
      {items
        .filter((item) => !item.isDeleted)
        .map((item) => (
          <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" className="w-full group space-y-4">
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
              <h3 className={`${typography.h6} group-hover:underline`}>{item.name}</h3>
              <p className={typography.bodySmall}>{item.description}</p>
              <p className={typography.captionSmall}>Price: ${item.price}</p>
            </div>
          </a>
        ))}
    </div>
  );
};

export default ProductsCard;
