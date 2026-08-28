export type Support = "yes" | "partial" | "no";

export type FeatureKind = "spec" | "client-pattern";

export type ClientId =
  | "codex"
  | "cursor"
  | "claude-code"
  | "grok"
  | "opencode";

export type FeatureId =
  | "stateless-2026-07-28"
  | "code-mode"
  | "dynamic-load"
  | "tool-filter"
  | "list-pagination"
  | "mcp-apps"
  | "oauth"
  | "approvals";

export type Client = {
  id: ClientId;
  name: string;
  docsUrl: string;
};

export type Feature = {
  id: FeatureId;
  name: string;
  kind: FeatureKind;
  summary: string;
  specUrl?: string;
  shippedAt: string;
};

export type Cell = {
  status: Support;
  evidenceUrl?: string;
  notes?: string;
};

export type TimelineEvent = {
  date: string;
  title: string;
  href?: string;
};

export type NewsItem = {
  slug: string;
  title: string;
  publishedAt: string;
  sourceName: string;
  sourceUrl: string;
  summary: string;
};
