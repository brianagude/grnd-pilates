"use client"

import type { Settings } from "@types";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { typography, buttons, spacing } from "@/styles/design-tokens";
import Button from "@/components/inputs/Button";
import { BlockContent } from "./inputs/PortableTextComponents";

type FooterType = NonNullable<Settings["footer"]>;
type SocialType = NonNullable<Settings["socialMedia"]>;

interface FooterProps {
  footer: FooterType;
  socialMedia: SocialType;
}

export default function Footer({ footer, socialMedia }: FooterProps) {
  const year = new Date().getFullYear();
  const {copyrightText, footerLinks, logo, supportText } = footer

  return (
    <footer className="w-full">
      <div className="flex flex-col px-4 py-12 justify-center gap-16 md:px-8 md:py-12 lg:flex-row lg:px-16 lg:py-20 lg:justify-between">
        {logo && 
          <Link href="/" className="mx-auto lg:ml-0">
            <Image
              src={urlFor(logo).url()}
              width={480}
              height={158}
              alt="grnd pilates logo"
            />
          </Link>
        }

        <div className="flex flex-col gap-10 md:mx-auto md:flex-row lg:mr-0">
          { footerLinks && 
            <div className="space-y-3 md:min-w-xs">
              <h6 className={`${typography.caption} mb-4 pb-4 border-b-2`}>Navigation</h6>
              <nav className="grid grid-cols-2 gap-x-6 gap-y-3 lg:gap-x-16">
              {footerLinks.map((item) => (
                  <Button
                    key={item._key}
                    {...item}
                    classes="text-lg font-medium"
                  />
                ))}
              </nav>
            </div> 
          }
          { supportText && 
            <div className="space-y-3 md:min-w-xs">
              <h6 className={`${typography.caption} mb-4 pb-4 border-b-2`}>Support</h6>
              <BlockContent value={supportText} />
            </div> 
          }
        </div>

      </div>
      <div className="w-full p-4 flex flex-col-reverse items-center justify-center gap-4 border-t-2 md:flex-row sm:justify-between md:px-12">
        <p className={typography.body}>
          &copy; {year} {copyrightText}
        </p>

        {socialMedia && (
          <div className="flex flex-wrap gap-4 items-center">
            {socialMedia.instagram && (
              <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                <Image src="/instagram.svg" width={40} height={40} alt="Instagram icon"/>
              </a>
            )}
            {socialMedia.youtube && (
              <a href={socialMedia.youtube} target="_blank" rel="noopener noreferrer">
                <Image src="/youtube.svg" width={40} height={40} alt="Youtube icon"/>
              </a>
            )}
            {socialMedia.twitter && (
              <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                <Image src="/twitter.svg" width={40} height={40} alt="Twitter icon"/>
              </a>
            )}
            {socialMedia.tiktok && (
              <a href={socialMedia.tiktok} target="_blank" rel="noopener noreferrer">
                <Image src="/tiktok.svg" width={40} height={40} alt="Tiktok icon"/>
              </a>
            )}
            {socialMedia.facebook && (
              <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                <Image src="/facebook.svg" width={40} height={40} alt="Facebook icon"/>
              </a>
            )}
            {socialMedia.linkedin && (
              <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                <Image src="/linkedin.svg" width={40} height={40} alt="Linkedin icon"/>
              </a>
            )}
          </div>
        )}


        {/* {footer.footerLinks && footer.footerLinks.length > 0 && (
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-3 md:justify-end"
          >
            {footer.footerLinks.map((link: FooterLink) => (
              <Button key={link._key} {...link} classes={buttons.link} />
            ))}
          </nav>
        )} */}
      </div>
    </footer>
  );
}
