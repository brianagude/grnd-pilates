"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import Button from "@/components/inputs/Button";
import React, { useState, useRef, useEffect } from "react";
import { typography } from "@/styles/design-tokens";
import type { Settings } from "@types";
import { Drawer } from 'vaul';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

type HeaderType = Settings["header"];

export default function Header(props: HeaderType) {
  const { logo, mainCTA, menuList } = props ?? {};
  const [isOpen, setIsOpen] = React.useState(false);
  const logoUrl = logo ? urlFor(logo).url() : "/logo.svg";

  // console.log(menuList)

  return (
    <Drawer.Root direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <header className="fixed py-4 w-full top-0 left-0 z-30">
        <div className="px-4 w-full flex justify-between items-center max-w-[1728px] mx-auto sm:px-6">
          <Link href="/">
            <Image
              src={logoUrl}
              width={200}
              height={120}
              alt="grnd pilates logo"
              priority
              className="object-fit h-20 w-auto sm:h-fit"
            />
          </Link>
          <div className="flex items-center gap-6">
            {menuList && <nav>
              {menuList.map((item) => (
                  <Button
                    key={item._key}
                    {...item}
                  />
                ))}
              </nav>
            }
            {mainCTA && <Button {...mainCTA} classes="hidden sm:block" />}
            <Drawer.Trigger>
              <Bars3Icon className="size-16 text-black cursor-pointer hover:text-brown-700 transition-colors"/>
            </Drawer.Trigger>
          </div>
        </div>
      </header>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Drawer.Content 
          className="right-2 top-2 bottom-2 fixed outline-none w-[310px] flex z-50"
          // The gap between the edge of the screen and the drawer is 8px in this case.
          style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}>
          <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col gap-10 rounded-2xl">
            <button
              type="button"
              className="ml-auto"
              onClick={() => setIsOpen(false)}
            >
              <XMarkIcon className="size-10 text-black cursor-pointer hover:text-brown-700 transition-colors"/>
            </button>
            <Link href="/">
              <Image
                src={logoUrl}
                width={200}
                height={120}
                alt="grnd pilates logo"
                priority
                className="object-fit h-20 w-auto sm:h-fit"
              />
            </Link>
            {menuList && <nav>
              {menuList.map((item) => (
                  <Button
                    key={item._key}
                    {...item}
                  />
                ))}
              </nav>
            }
            {mainCTA && <Button {...mainCTA} classes="block !w-full" />}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}