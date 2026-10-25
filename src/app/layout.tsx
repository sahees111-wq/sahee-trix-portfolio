import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/data/siteConfig";

const siteUrl = "https://saheetrix.com";
const socialPreviewImage = "/images/sahee-portrait.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.meta.title,
    template: "%s | SAHEETRIX",
  },
  description: siteConfig.meta.description,
  keywords: siteConfig.meta.keywords,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.brandName,
  applicationName: siteConfig.brandName,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/codex-clipboard-a9576f08-9cd8-4176-ab1d-21c5a4fc84a1.png",
    apple: "/images/codex-clipboard-a9576f08-9cd8-4176-ab1d-21c5a4fc84a1.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    siteName: siteConfig.brandName,
    images: [
      {
        url: socialPreviewImage,
        width: 1200,
        height: 630,
        alt: "SAHEETRIX creative design portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    creator: "@saheetrix",
    images: [socialPreviewImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: siteConfig.name,
        alternateName: siteConfig.brandName,
        url: siteUrl,
        image: `${siteUrl}${socialPreviewImage}`,
        jobTitle: "Senior Graphic Designer & Printing Manager",
        description: siteConfig.meta.description,
        knowsAbout: [
          "Graphic Design",
          "Web Design",
          "Social Media Management",
          "Marketing Campaigns",
          "Brand Identity",
          "Sublimation Printing",
          "DTF Printing",
          "Prepress Production",
          "AI Creative Direction",
          "Jersey & Apparel Design",
        ],
        address: {
          "@type": "PostalAddress",
          addressCountry: "Sri Lanka",
        },
        sameAs: siteConfig.socialLinks.map((s) => s.url),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteConfig.brandName,
        description: siteConfig.meta.description,
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
      },
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="font-sans bg-[#08080a] text-zinc-100 antialiased selection:bg-[#00e5ff] selection:text-[#08080a] min-h-screen relative overflow-x-hidden"
      >
        <div className="fixed inset-0 bg-noise pointer-events-none z-50 opacity-40 mix-blend-overlay" />
        {children}
      </body>
    </html>
  );
}
