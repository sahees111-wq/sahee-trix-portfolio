import type { MetadataRoute } from "next";

const siteUrl = "https://saheetrix.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: "2026-10-25",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
