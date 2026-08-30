import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SITE_FEED_PATH, SITE_TITLE, SITE_URL, siteDescription } from "@/lib/meta";
import { getSite } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export function generateMetadata(): Metadata {
  const description = siteDescription(getSite().good);
  return {
    metadataBase: new URL(SITE_URL),
    title: SITE_TITLE,
    description,
    openGraph: {
      title: SITE_TITLE,
      description,
      url: SITE_URL,
      siteName: SITE_TITLE,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE,
      description,
    },
    alternates: {
      canonical: "/",
      types: {
        "application/rss+xml": SITE_FEED_PATH,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  const description = siteDescription(getSite().good);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_TITLE,
    url: SITE_URL,
    description,
  };

  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full bg-white font-sans text-neutral-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
