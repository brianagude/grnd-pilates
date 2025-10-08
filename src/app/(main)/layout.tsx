import { Analytics } from "@vercel/analytics/next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MomenceWebchat from "@/components/MomenceWebchat";
import { TailwindHelper } from "@/components/TailwindHelper";
import { CACHE_TAGS, getCacheOptions } from "@/lib/cache-tags";
import { client } from "@/sanity/lib/client";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";

// ---------- ISR / Revalidation options ----------
const options = getCacheOptions([CACHE_TAGS.SETTINGS], 3600);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await client.fetch(SETTINGS_QUERY, {}, options);
  const { footer, header, socialMedia } = settings;

  return (
    <>
      <Header {...header} />
      <main>
        {children}
        <Footer {...footer} socialMedia={socialMedia} />
      </main>
      <MomenceWebchat />
      <Analytics/>
      {process.env.NODE_ENV === "development" && <TailwindHelper />}
      {(await draftMode()).isEnabled && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
    </>
  );
}
