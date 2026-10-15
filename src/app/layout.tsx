import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
  keywords: siteConfig.meta.keywords,
  authors: [{ name: siteConfig.name, url: "https://saheetrix.com" }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saheetrix.com",
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    siteName: siteConfig.brandName,
    images: [
      {
        url: "https://saheetrix.com/images/sahee-portrait.jpg",
        width: 1200,
        height: 630,
        alt: "SAHEE TRIX Portfolio Cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    creator: "@saheetrix",
    images: ["https://saheetrix.com/images/sahee-portrait.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: siteConfig.brandName,
    url: "https://saheetrix.com",
    jobTitle: "Senior Graphic Designer & Printing Manager",
    knowsAbout: [
      "Graphic Design",
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
