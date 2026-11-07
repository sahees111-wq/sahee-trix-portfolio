import type { MetadataRoute } from "next";
import { portfolioProjects } from "@/data/portfolioData";

const siteUrl = "https://saheetrix.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: "2026-11-07",
      changeFrequency: "monthly",
      priority: 1,
    },
    ...portfolioProjects.map((project) => ({
      url: `${siteUrl}/work/${project.slug}`,
      lastModified: "2026-11-07",
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.8 : 0.6,
    })),
  ];
}
