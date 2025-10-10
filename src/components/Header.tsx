"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Drawer } from "vaul";
import Button from "@/components/inputs/Button";
import { urlFor } from "@/sanity/lib/image";
import type { UpdatedHeader } from "@/sanity/lib/types";

export default function Header(props: UpdatedHeader) {
  const { logo, mainCTA, menuList } = props ?? {};
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Drawer.Root direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <header className="fixed py-4 w-full top-0 left-0 z-30">
        <div className={`${logo ? 'justify-between' : 'justify-end'} px-4 w-full flex  items-center max-w-[1728px] mx-auto sm:px-6`}>
          {logo && (
            <Link href="/">
              <Image
                src={urlFor(logo).url()}
                width={200}
                height={120}
                alt="grnd pilates logo"
                priority
                className="object-fit h-16 w-auto sm:h-fit"
              />
            </Link>
          )}
          <div className="flex items-center gap-6">
            {menuList && (
              <nav className="items-center gap-4 hidden xl:flex">
                {menuList.map((item) => (
                  <Button
                    key={item._key}
                    {...item}
                    classes="text-lg font-medium hover:border-b-2"
                  />
                ))}
              </nav>
            )}
            {mainCTA && <Button {...mainCTA} classes="hidden sm:block" />}
            <Drawer.Trigger className="xl:hidden">
              <Bars3Icon className="size-16 text-black cursor-pointer hover:text-brown-700 transition-colors" />
            </Drawer.Trigger>
          </div>
        </div>
      </header>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Drawer.Content
          className="right-2 top-2 bottom-2 fixed outline-none w-[310px] flex z-50"
          // The gap between the edge of the screen and the drawer is 8px in this case.
          style={
            { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
          }
        >
          <div className="bg-white h-full w-full grow p-5 flex flex-col gap-10 rounded-2xl">
            <button
              type="button"
              className="ml-auto"
              onClick={() => setIsOpen(false)}
            >
              <XMarkIcon className="size-10 text-black cursor-pointer hover:text-brown-700 transition-colors" />
            </button>
            {menuList && (
              <nav className="flex flex-col gap-4">
                {menuList.map((item) => (
                  <Button
                    key={item._key}
                    {...item}
                    classes="text-lg font-semibold"
                  />
                ))}
              </nav>
            )}
            {mainCTA && <Button {...mainCTA} classes="block !w-full" />}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
