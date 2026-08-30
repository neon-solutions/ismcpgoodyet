import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/meta";
import { getSite } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const newest = getSite().news[0]?.publishedAt;
  return [
    {
      url: SITE_URL,
      lastModified: newest,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
