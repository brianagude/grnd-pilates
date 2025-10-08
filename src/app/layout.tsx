import type { Metadata } from "next";
import { Comfortaa, Be_Vietnam_Pro } from "next/font/google";
import "@/styles/globals.css";

const fontDisplay = Comfortaa({
  variable: "--font-display",
  subsets: ["latin"],
});

const fontBody = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const currentYear = new Date().getFullYear();

  return {
    title: `GRND. Pilates`,
    description: `GRND. combines Joseph Pilates’ method with light weight training, resistance work, and cardio for one effective 45-minute class.`,
    keywords: [
      "GRND Pilates",
      "Atlanta Pilates studio",
      "Pilates classes Atlanta",
      "Boutique Pilates",
      "Reformer Pilates Atlanta",
      "Mat Pilates",
      `Pilates Atlanta ${currentYear}`,
      "Wellness Atlanta",
    ],
    authors: [
      { name: "Briana Gude", url: "https://www.brianagude.com/" },
      { name: "Dianthe Studio", url: "https://www.dianthe.studio/" },
      { name: "GRND. Pilates Team", url: "https://www.grndpilates.com/" },
    ],
    metadataBase: new URL("https://www.grndpilates.com/"),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://www.grndpilates.com/",
      title: `GRND. Pilates`,
      description: `GRND. combines Joseph Pilates’ method with light weight training, resistance work, and cardio for one effective 45-minute class.`,
      siteName: "GRND Pilates",
    },
    twitter: {
      card: "summary_large_image",
      title: `GRND. Pilates`,
      description: `GRND. combines Joseph Pilates’ method with light weight training, resistance work, and cardio for one effective 45-minute class.`,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
