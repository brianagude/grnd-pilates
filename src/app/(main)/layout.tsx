// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
import { TailwindHelper } from "@/components/TailwindHelper";
import { client } from "@/sanity/lib/client";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { getCacheOptions, CACHE_TAGS } from "@/lib/cache-tags";

// ---------- GROQ Query ----------
const query = `*[_type == "settings"][0]{
  ...
}`;

// ---------- ISR / Revalidation options ----------
// Increased from 30 seconds to 1 hour for better performance
const options = getCacheOptions([CACHE_TAGS.SETTINGS], 3600);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await client.fetch(query, {}, options);
  // const { footer, header, mailchimp } = settings;

  return (
    <>
      {/* <Header {...header} /> */}
      <main>
        {children}
        {/* <Footer footer={footer} mailchimp={mailchimp} /> */}
      </main>
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
