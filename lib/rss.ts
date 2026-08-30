import type { NewsItem } from "./types";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function rfc822(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00.000Z`).toUTCString();
}

export function newsRssXml(input: {
  title: string;
  homeUrl: string;
  feedUrl: string;
  description: string;
  items: readonly NewsItem[];
}): string {
  const latest = input.items[0]?.publishedAt;
  const lastBuild = latest ? rfc822(latest) : rfc822("1970-01-01");

  const items = input.items
    .map((item) => {
      const title = escapeXml(item.title);
      const link = escapeXml(item.sourceUrl);
      const guid = escapeXml(`ismcpgoodyet:${item.slug}`);
      const description = escapeXml(`${item.summary} (${item.sourceName})`);
      return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="false">${guid}</guid>
      <pubDate>${rfc822(item.publishedAt)}</pubDate>
      <description>${description}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(input.title)}</title>
    <link>${escapeXml(input.homeUrl)}</link>
    <description>${escapeXml(input.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${escapeXml(input.feedUrl)}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}
