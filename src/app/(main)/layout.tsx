import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TailwindHelper } from "@/components/TailwindHelper";
import { client } from "@/sanity/lib/client";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { getCacheOptions, CACHE_TAGS } from "@/lib/cache-tags";
import Script from "next/script";

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

  // console.log('settings', settings)
  const { footer, header, socialMedia } = settings;

  return (
    <>
      <Header {...header} />
      <main>
        {children}
        <Footer footer={footer} socialMedia={socialMedia} />
      </main>
      {process.env.NODE_ENV === "development" && <TailwindHelper />}
      {(await draftMode()).isEnabled && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
      <Script
        async
        type="module"
        src="https://momence.com/plugin/webchat/webchat.js"
        strategy="afterInteractive"
        data-host-id="107640"
        data-token="3mX0LbY9Xk"
        data-position="bottom-right"
      />
    </>
  );
}
