import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/data/siteConfig";

const siteUrl = "https://saheetrix.com";
const socialPreviewImage = "/images/sahee-portrait.jpg";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#08080a",
  colorScheme: "dark",
};

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
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
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
        jobTitle: "Graphic Designer & Web Developer",
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
          "Custom Sportswear Design",
          "Sublimation Prepress",
          "Apparel Tech Packs",
          "Prepress Vector Separations",
          "RGB + CMYK Color Management",
          "Cricket Match Kit Design",
          "Esports Teamwear Branding",
        ],
        address: {
          "@type": "PostalAddress",
          addressCountry: "Sri Lanka",
        },
        sameAs: siteConfig.socialLinks.map((s) => s.url),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#professional-service`,
        name: siteConfig.brandName,
        url: siteUrl,
        description: siteConfig.meta.description,
        founder: {
          "@id": `${siteUrl}/#person`,
        },
        areaServed: "Worldwide",
        serviceType: [
          "Graphic Design",
          "Brand Identity Design",
          "Web Design",
          "Web Development",
          "UI/UX Design",
          "Creative Development",
        ],
        knowsAbout: [
          "Brand identity systems",
          "Responsive website development",
          "UI/UX experiences",
          "Digital creative direction",
        ],
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
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; base-uri 'self'; object-src 'none'; script-src 'self' 'unsafe-inline' https://www.paypal.com https://www.sandbox.paypal.com https://www.paypalobjects.com; connect-src 'self' https://www.paypal.com https://www.sandbox.paypal.com https://*.paypal.com https://www.paypalobjects.com; frame-src https://www.paypal.com https://www.sandbox.paypal.com https://*.paypal.com; form-action 'self' https://www.paypal.com https://www.sandbox.paypal.com; img-src 'self' data: blob: https://images.unsplash.com https://illustrations.popsy.co https://www.paypalobjects.com https://*.paypalobjects.com; style-src 'self' 'unsafe-inline'; font-src 'self' data:; media-src 'self' blob:; worker-src 'self' blob:; upgrade-insecure-requests;"
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
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
