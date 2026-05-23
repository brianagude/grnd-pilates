import { Analytics } from "@vercel/analytics/next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MomenceWebchat from "@/components/MomenceWebchat";
import { TailwindHelper } from "@/components/TailwindHelper";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: settings } = await sanityFetch({ query: SETTINGS_QUERY });
  const { footer, header, socialMedia } = settings ?? {};

  return (
    <>
      <Header {...header} />
      <main>
        {children}
        <Footer {...footer} socialMedia={socialMedia} />
      </main>
      <MomenceWebchat />
      <Analytics />
      <SanityLive />
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
