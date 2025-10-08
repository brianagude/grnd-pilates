// TeacherCard.tsx
import React from "react";
import Image from "next/image"
import { buttons, typography } from "@/styles/design-tokens"

export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  bio: string;
  profileImage: string;
  isDeleted: boolean;
}

interface TeacherCardProps {
  items: Teacher[];
}

const TeacherCard: React.FC<TeacherCardProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-2">
      {items
        .filter((item) => !item.isDeleted)
        .map((item) => (
          <div key={item.id} className="grid grid-cols-2">
            {item.profileImage && (
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden">
                <Image
                  src={item.profileImage}
                  alt={`${item.firstName} ${item.lastName}`}
                  fill 
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h3>
                {item.firstName} {item.lastName}
              </h3>
              <p>{item.bio}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TeacherCard;
