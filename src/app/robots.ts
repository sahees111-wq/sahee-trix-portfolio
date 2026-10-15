import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://sahees111-wq.github.io/sahee-trix-portfolio/sitemap.xml",
  };
}
