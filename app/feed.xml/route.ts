import { SITE_FEED_PATH, SITE_TITLE, SITE_URL, siteDescription } from "@/lib/meta";
import { newsRssXml } from "@/lib/rss";
import { getSite } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const site = getSite();
  const xml = newsRssXml({
    title: SITE_TITLE,
    homeUrl: SITE_URL,
    feedUrl: `${SITE_URL}${SITE_FEED_PATH}`,
    description: siteDescription(site.good),
    items: site.news,
  });

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
