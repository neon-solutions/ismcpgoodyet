export const SITE_URL = "https://ismcpgoodyet.com";
export const SITE_TITLE = "Is MCP good yet?";
export const SITE_FEED_PATH = "/feed.xml";

export function siteDescription(good: boolean): string {
  if (good) {
    return "Yes. MCP features across Codex, Cursor, Claude Code, Grok, and OpenCode.";
  }
  return "Spoiler: no. MCP features across Codex, Cursor, Claude Code, Grok, and OpenCode.";
}
