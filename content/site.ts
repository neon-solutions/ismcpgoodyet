import type {
  Cell,
  Client,
  ClientId,
  Feature,
  FeatureId,
  NewsItem,
  TimelineEvent,
} from "@/lib/types";

export const clients = [
  {
    id: "codex",
    name: "Codex",
    docsUrl: "https://developers.openai.com/codex/mcp",
  },
  {
    id: "cursor",
    name: "Cursor",
    docsUrl: "https://cursor.com/docs/mcp",
  },
  {
    id: "claude-code",
    name: "Claude Code",
    docsUrl: "https://code.claude.com/docs/en/mcp",
  },
  {
    id: "grok",
    name: "Grok",
    docsUrl: "https://docs.x.ai",
  },
  {
    id: "opencode",
    name: "OpenCode",
    docsUrl: "https://opencode.ai/docs/mcp",
  },
] satisfies readonly Client[];

export const features = [
  {
    id: "stateless-2026-07-28",
    name: "Stateless spec",
    kind: "spec",
    summary:
      "Protocol revision 2026-07-28. No initialize handshake, no session id. Each request carries version and capabilities.",
    specUrl: "https://blog.modelcontextprotocol.io/posts/2026-07-28/",
    shippedAt: "2026-07-28",
  },
  {
    id: "code-mode",
    name: "Code mode",
    kind: "client-pattern",
    summary:
      "The model writes code against MCP tools instead of stuffing every schema and intermediate result into context.",
    specUrl: "https://www.anthropic.com/engineering/code-execution-with-mcp",
    shippedAt: "2025-11-04",
  },
  {
    id: "dynamic-load",
    name: "Dynamic tool loading",
    kind: "client-pattern",
    summary:
      "Native tool search or deferred schemas. The catalog is an index until the model hydrates a tool.",
    specUrl: "https://code.claude.com/docs/en/agent-sdk/tool-search.md",
    shippedAt: "2026-01-01",
  },
  {
    id: "tool-filter",
    name: "Per-tool filter",
    kind: "client-pattern",
    summary:
      "The user can disable a server or a single tool without deleting the config.",
    shippedAt: "2025-06-01",
  },
  {
    id: "list-pagination",
    name: "tools/list pagination",
    kind: "spec",
    summary:
      "The client drains nextCursor on tools/list so a large catalog is not truncated on the wire.",
    specUrl:
      "https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/pagination",
    shippedAt: "2025-03-26",
  },
  {
    id: "mcp-apps",
    name: "MCP Apps",
    kind: "spec",
    summary: "A tool result can render interactive UI in the client.",
    specUrl: "https://modelcontextprotocol.io/extensions/apps/overview",
    shippedAt: "2026-01-26",
  },
  {
    id: "oauth",
    name: "In-client OAuth",
    kind: "spec",
    summary: "Remote servers authenticate inside the client, not via a pasted token.",
    specUrl: "https://modelcontextprotocol.io/specification/2026-07-28",
    shippedAt: "2025-03-26",
  },
  {
    id: "approvals",
    name: "Approval policy",
    kind: "client-pattern",
    summary:
      "Something between prompt-every-call and yolo: allowlists, classifiers, or annotation-aware auto-run.",
    shippedAt: "2025-06-01",
  },
] satisfies readonly Feature[];

export const status = {
  "stateless-2026-07-28": {
    codex: {
      status: "partial",
      evidenceUrl: "https://github.com/openai/codex/issues/33952",
      notes: "Opt-in 2026-07-28 work exists. Not the default.",
    },
    cursor: { status: "no" },
    "claude-code": {
      status: "partial",
      evidenceUrl: "https://claude.com/blog/bringing-mcp-2026-07-28-to-claude",
      notes: "Anthropic announced the spec on Claude. Claude Code coverage unverified.",
    },
    grok: { status: "no" },
    opencode: { status: "no" },
  },
  "code-mode": {
    codex: {
      status: "yes",
      evidenceUrl:
        "https://github.com/openai/codex/commit/51c9ed6d4f6665faa6c443dfa10a8460fd0edbdd",
      notes: "Code Mode is a first-class MCP surface next to direct and deferred.",
    },
    cursor: { status: "no" },
    "claude-code": {
      status: "partial",
      evidenceUrl: "https://www.anthropic.com/engineering/code-execution-with-mcp",
      notes: "Anthropic documented the pattern. Native Claude Code surface unverified.",
    },
    grok: { status: "no" },
    opencode: { status: "no" },
  },
  "dynamic-load": {
    codex: {
      status: "yes",
      evidenceUrl:
        "https://github.com/openai/codex/commit/51c9ed6d4f6665faa6c443dfa10a8460fd0edbdd",
      notes: "Deferred / tool-search surface.",
    },
    cursor: {
      status: "no",
      notes: "Official MCP docs do not describe deferred schemas or tool search.",
    },
    "claude-code": {
      status: "yes",
      evidenceUrl: "https://code.claude.com/docs/en/agent-sdk/tool-search.md",
      notes: "Tool Search is native. Auto-on around 10% of context.",
    },
    grok: { status: "no" },
    opencode: {
      status: "no",
      notes: "Stock OpenCode loads MCP tools into the prompt. Search exists as plugins.",
    },
  },
  "tool-filter": {
    codex: {
      status: "yes",
      evidenceUrl: "https://developers.openai.com/codex/mcp",
      notes: "enabled_tools and disabled_tools.",
    },
    cursor: {
      status: "yes",
      evidenceUrl: "https://cursor.com/docs/mcp",
      notes: "Server toggle and per-tool on/off in the tools list.",
    },
    "claude-code": {
      status: "yes",
      evidenceUrl: "https://code.claude.com/docs/en/mcp",
      notes: "Allowlists and alwaysLoad.",
    },
    grok: { status: "no" },
    opencode: { status: "partial", notes: "Per-agent tools map. Not a first-class MCP filter UI." },
  },
  "list-pagination": {
    codex: { status: "no", notes: "Not verified against nextCursor." },
    cursor: { status: "no", notes: "Not verified against nextCursor." },
    "claude-code": { status: "no", notes: "Not verified against nextCursor." },
    grok: { status: "no" },
    opencode: { status: "no", notes: "Not verified against nextCursor." },
  },
  "mcp-apps": {
    codex: { status: "no" },
    cursor: {
      status: "yes",
      evidenceUrl: "https://cursor.com/docs/mcp",
      notes: "MCP Apps extension is documented.",
    },
    "claude-code": {
      status: "no",
      notes: "Claude (web/desktop) supports Apps. Claude Code unverified.",
    },
    grok: { status: "no" },
    opencode: { status: "no" },
  },
  oauth: {
    codex: { status: "partial", notes: "Remote MCP exists. In-client OAuth flow unverified." },
    cursor: {
      status: "yes",
      evidenceUrl: "https://cursor.com/docs/mcp",
      notes: "Marketplace OAuth and static client credentials in mcp.json.",
    },
    "claude-code": {
      status: "yes",
      evidenceUrl: "https://code.claude.com/docs/en/mcp",
    },
    grok: { status: "no" },
    opencode: { status: "no" },
  },
  approvals: {
    codex: {
      status: "yes",
      evidenceUrl: "https://developers.openai.com/codex/mcp",
      notes: "approval_mode: auto, prompt, writes, approve.",
    },
    cursor: {
      status: "yes",
      evidenceUrl: "https://cursor.com/docs/mcp",
      notes: "Auto-review with allowlist and classifier.",
    },
    "claude-code": {
      status: "yes",
      evidenceUrl: "https://code.claude.com/docs/en/mcp",
      notes: "Permission modes and allowedTools.",
    },
    grok: { status: "no" },
    opencode: { status: "partial", notes: "Permission modes exist. MCP-specific policy unverified." },
  },
} satisfies Record<FeatureId, Record<ClientId, Cell>>;

export const timeline = [
  {
    date: "2024-11-25",
    title: "MCP announced",
    href: "https://www.anthropic.com/news/model-context-protocol",
  },
  {
    date: "2025-03-26",
    title: "Remote MCP, Streamable HTTP, OAuth",
    href: "https://modelcontextprotocol.io",
  },
  {
    date: "2025-11-04",
    title: "Anthropic: code execution with MCP",
    href: "https://www.anthropic.com/engineering/code-execution-with-mcp",
  },
  {
    date: "2026-01-26",
    title: "MCP Apps extension",
    href: "https://modelcontextprotocol.io/extensions/apps/overview",
  },
  {
    date: "2026-07-28",
    title: "Spec 2026-07-28: stateless core",
    href: "https://blog.modelcontextprotocol.io/posts/2026-07-28/",
  },
] satisfies readonly TimelineEvent[];

export const news = [
  {
    slug: "mcp-spec-2026-07-28",
    title: "MCP ships a stateless spec",
    publishedAt: "2026-07-28",
    sourceName: "MCP blog",
    sourceUrl: "https://blog.modelcontextprotocol.io/posts/2026-07-28/",
    summary:
      "Revision 2026-07-28 drops the initialize handshake and session id. Requests carry version and capabilities. Tasks and Apps move into the extensions framework.",
  },
  {
    slug: "anthropic-code-execution-with-mcp",
    title: "Anthropic: stop stuffing MCP tools into context, write code instead",
    publishedAt: "2025-11-04",
    sourceName: "Anthropic",
    sourceUrl: "https://www.anthropic.com/engineering/code-execution-with-mcp",
    summary:
      "Present MCP servers as code APIs. The model loads the tools it needs and filters results in a sandbox. Cloudflare called the same idea Code Mode.",
  },
  {
    slug: "claude-code-tool-search",
    title: "Claude Code defers MCP schemas until search hits them",
    publishedAt: "2026-04-01",
    sourceName: "Claude Code docs",
    sourceUrl: "https://code.claude.com/docs/en/agent-sdk/tool-search.md",
    summary:
      "Tool Search is native. When deferred definitions cross about 10% of the window, Claude Code withholds schemas and hydrates on demand.",
  },
  {
    slug: "cursor-mcp-apps",
    title: "Cursor renders MCP Apps",
    publishedAt: "2026-02-01",
    sourceName: "Cursor docs",
    sourceUrl: "https://cursor.com/docs/mcp",
    summary:
      "Cursor documents Tools, Prompts, Resources, Roots, Elicitation, and the MCP Apps extension. A tool can return interactive UI next to its result.",
  },
] satisfies readonly NewsItem[];
