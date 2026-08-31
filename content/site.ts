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
    docsUrl: "https://docs.x.ai/build/features/mcp-servers",
  },
  {
    id: "opencode",
    name: "OpenCode",
    docsUrl: "https://opencode.ai/docs/mcp-servers",
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
    id: "elicitation",
    name: "Elicitation",
    kind: "spec",
    summary:
      "A server can pause a tool call and ask the user for a form or an out-of-band URL.",
    specUrl:
      "https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation",
    shippedAt: "2025-11-25",
  },
  {
    id: "tasks",
    name: "Tasks",
    kind: "spec",
    summary:
      "Long-running work returns a durable task id. The client polls, supplies input, and resumes after a disconnect.",
    specUrl: "https://modelcontextprotocol.io/extensions/tasks/overview",
    shippedAt: "2026-07-28",
  },
  {
    id: "code-mode",
    name: "Code mode",
    kind: "client-pattern",
    summary:
      "The model writes code that calls MCP tools. Intermediate results stay out of the prompt.",
    specUrl: "https://www.anthropic.com/engineering/code-execution-with-mcp",
    shippedAt: "2025-11-04",
  },
  {
    id: "dynamic-load",
    name: "Deferred tool descriptions",
    kind: "client-pattern",
    summary:
      "The model does not get every MCP tool's full JSON up front. Names or a short index first; schemas load when needed.",
    specUrl: "https://cursor.com/blog/dynamic-context-discovery",
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
    id: "skills-over-mcp",
    name: "Skills over MCP",
    kind: "spec",
    summary:
      "An MCP server serves Agent Skills (SKILL.md directories) as skill:// resources. The client lists them with skills/list and reads them.",
    specUrl:
      "https://modelcontextprotocol.io/community/working-groups/skills-over-mcp",
    shippedAt: "2026-04-16",
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
      "Allowlists, classifiers, or annotation-aware auto-run.",
    shippedAt: "2025-06-01",
  },
] satisfies readonly Feature[];

export const status = {
  "stateless-2026-07-28": {
    codex: {
      status: "partial",
      evidenceUrl: "https://github.com/openai/codex/pull/35724",
      notes:
        "Opt-in mcp_2026_07_28. Default remains 2025-06-18. Stdio also needs CODEX_MCP_PROTOCOL_VERSION.",
    },
    cursor: {
      status: "no",
      evidenceUrl:
        "https://forum.cursor.com/t/stdio-mcp-oracle-sqlcl-dies-after-parallel-reconnect-and-resource-subscribe-with-failed-to-enqueue-message/166799",
      notes:
        "No public 2026-07-28 claim. Forum reports still show pre-stateless protocol versions.",
    },
    "claude-code": {
      status: "partial",
      evidenceUrl: "https://code.claude.com/docs/en/mcp#mcp-client-runtimes",
      notes:
        "v2 runtime (SDK 2.x) adds 2026-07-28 and is default on Anthropic-hosted CLI/VS Code/SDK. Bedrock, Vertex, Foundry, and some flags stay on v1. Stdio 2026 needs MCP_PROTOCOL_NEGOTIATION=auto.",
    },
    grok: {
      status: "no",
      evidenceUrl:
        "https://github.com/xai-org/grok-build/blob/main/crates/codegen/xai-grok-mcp/src/servers.rs",
      notes: "Grok Build pins the wire to 2025-11-25 so an rmcp bump cannot silently move it.",
    },
    opencode: {
      status: "no",
      evidenceUrl: "https://github.com/anomalyco/opencode/pull/39373",
      notes:
        "SDK v2 client migration reverted 2026-07-28. Stock still uses the initialize handshake.",
    },
  },
  elicitation: {
    codex: {
      status: "yes",
      evidenceUrl: "https://developers.openai.com/codex/app-server",
      notes:
        "elicitation/create surfaces as mcpServer/elicitation/request. Form, URL, and openai/form. Opt-in 2026-07-28 MRTR InputRequiredResult currently errors (issue 40657).",
    },
    cursor: {
      status: "partial",
      evidenceUrl: "https://cursor.com/docs/mcp",
      notes:
        "Support table lists Elicitation. Documented as JSON-schema forms. URL mode and 2026 MRTR not documented. ~60s timeout reported.",
    },
    "claude-code": {
      status: "yes",
      evidenceUrl:
        "https://code.claude.com/docs/en/mcp#respond-to-mcp-elicitation-requests",
      notes:
        "Form or URL dialogs appear automatically. Elicitation hooks and Agent SDK onElicitation can answer without a dialog.",
    },
    grok: {
      status: "yes",
      evidenceUrl:
        "https://github.com/xai-org/grok-build/blob/main/crates/codegen/xai-grok-mcp/src/servers.rs",
      notes: "Client advertises form (with schema validation) and URL elicitation.",
    },
    opencode: {
      status: "no",
      evidenceUrl:
        "https://github.com/anomalyco/opencode/blob/dev/packages/opencode/src/mcp/index.ts",
      notes: "elicitation capability is commented out. No request handler.",
    },
  },
  tasks: {
    codex: {
      status: "no",
      evidenceUrl: "https://developers.openai.com/codex/mcp",
      notes:
        "Codex MCP docs cover stdio, Streamable HTTP, tools, OAuth, and approval_mode. No Tasks extension, tasks/get, or io.modelcontextprotocol/tasks.",
    },
    cursor: {
      status: "no",
      evidenceUrl: "https://cursor.com/docs/mcp",
      notes:
        "Support table is Tools, Prompts, Resources, Roots, Elicitation, Apps. Tasks is absent. Cursor's own Task/subagent tool is unrelated.",
    },
    "claude-code": {
      status: "no",
      evidenceUrl: "https://github.com/anthropics/claude-code/issues/76571",
      notes:
        "Open request to implement MCP Tasks. Auto-background of a slow tools/call is not the extension.",
    },
    grok: {
      status: "no",
      evidenceUrl:
        "https://github.com/xai-org/grok-build/blob/main/crates/codegen/xai-grok-mcp/src/servers.rs",
      notes:
        "Client capabilities advertise elicitation and MCP UI mime types. No io.modelcontextprotocol/tasks. Grok's own background jobs are unrelated.",
    },
    opencode: {
      status: "no",
      evidenceUrl:
        "https://github.com/anomalyco/opencode/blob/dev/packages/opencode/src/mcp/index.ts",
      notes: "tasks capability is commented out. Built-in task subagent is unrelated.",
    },
  },
  "code-mode": {
    codex: {
      status: "partial",
      evidenceUrl: "https://github.com/openai/codex/pull/22256",
      notes:
        "code_mode surface exists next to direct and deferred. [features.code_mode] enabled = true; off by default and marked under development.",
    },
    cursor: {
      status: "no",
      evidenceUrl: "https://forum.cursor.com/t/code-mode-for-mcps/144487",
      notes:
        "No shipping Code Mode. Dynamic context discovery loads schemas from files; the model still calls tools directly.",
    },
    "claude-code": {
      status: "no",
      evidenceUrl: "https://code.claude.com/docs/en/mcp",
      notes:
        "Claude Code connects MCP servers and calls their tools (Tool Search when the catalog is large). No native execute-code-against-MCP surface. The Anthropic code-execution article is a builder pattern, not a Claude Code feature.",
    },
    grok: {
      status: "no",
      evidenceUrl:
        "https://github.com/xai-org/grok-build/blob/main/crates/codegen/xai-grok-pager/docs/user-guide/07-mcp-servers.md",
      notes: "MCP goes through search_tool and use_tool, not model-written code that calls MCP.",
    },
    opencode: {
      status: "partial",
      evidenceUrl:
        "https://github.com/anomalyco/opencode/blob/dev/packages/codemode/codemode.md",
      notes:
        "Ships in core behind OPENCODE_EXPERIMENTAL_CODE_MODE. MCP tools become child tools of execute. Default path still loads schemas into the prompt.",
    },
  },
  "dynamic-load": {
    codex: {
      status: "yes",
      evidenceUrl: "https://github.com/openai/codex/pull/29486",
      notes:
        "Default since 2026-06-22: MCP tools sit behind tool_search. The first request does not include those tools. Older models and providers that cannot search still get the full schemas.",
    },
    cursor: {
      status: "yes",
      evidenceUrl: "https://cursor.com/blog/dynamic-context-discovery",
      notes:
        "Turn 1 is tool names only. Full descriptions are files in a folder per server; the agent reads or greps them. Not a tool_search API. agent mcp list-tools is a human listing.",
    },
    "claude-code": {
      status: "yes",
      evidenceUrl: "https://code.claude.com/docs/en/agent-sdk/tool-search.md",
      notes:
        "Tool Search is on by default. Definitions are withheld; the agent gets a summary and loads up to five matches. alwaysLoad keeps a tool in the prompt. Foundry and some Vertex or proxy hosts load everything.",
    },
    grok: {
      status: "yes",
      evidenceUrl:
        "https://github.com/xai-org/grok-build/blob/main/crates/codegen/xai-grok-pager/docs/user-guide/07-mcp-servers.md",
      notes:
        "search_tool finds MCP tools by name or description. use_tool calls them. The catalog is not dumped into the prompt.",
    },
    opencode: {
      status: "partial",
      evidenceUrl: "https://opencode.ai/docs/mcp-servers",
      notes:
        "Default path puts MCP tools in the prompt. Docs warn GitHub MCP can blow the window. Experimental Code Mode puts a token-budgeted catalog in the prompt and searches for omitted signatures. Filter is allow/deny, not deferral.",
    },
  },
  "tool-filter": {
    codex: {
      status: "yes",
      evidenceUrl: "https://developers.openai.com/codex/mcp",
      notes: "enabled=false disables a server. enabled_tools allow list, disabled_tools deny list.",
    },
    cursor: {
      status: "yes",
      evidenceUrl: "https://cursor.com/help/customization/mcp",
      notes:
        "Customize > MCPs toggles a server. Click a tool name in the chat tools list to turn it off. CLI: agent mcp enable|disable and permissions.deny Mcp(server:tool).",
    },
    "claude-code": {
      status: "yes",
      evidenceUrl:
        "https://code.claude.com/docs/en/agent-sdk/permissions#allow-and-deny-rules",
      notes:
        "disallowedTools can hide a tool. disabledMcpServers / allowedMcpServers / deniedMcpServers filter servers. allowedTools is auto-approval, not visibility, unless dontAsk.",
    },
    grok: {
      status: "yes",
      evidenceUrl: "https://docs.x.ai/build/features/permissions",
      notes:
        "enabled on the server, grok mcp enable|disable, TUI /mcps Space toggle. MCPTool allow/deny rules. Per-tool registration in ToolBridge.",
    },
    opencode: {
      status: "yes",
      evidenceUrl: "https://opencode.ai/docs/mcp-servers",
      notes:
        "mcp.<name>.enabled disables a server without deleting it. Permission rules can deny a prefixed MCP tool id.",
    },
  },
  "list-pagination": {
    codex: {
      status: "partial",
      evidenceUrl: "https://github.com/openai/codex/pull/35724",
      notes:
        "Drains nextCursor in opt-in 2026-07-28 mode. Default 2025-06-18 still ignores the cursor (issue 28858).",
    },
    cursor: {
      status: "no",
      evidenceUrl:
        "https://forum.cursor.com/t/mcp-cursor-only-registers-the-first-page-of-a-paginated-tools-list-doesnt-follow-nextcursor-14-tool-server-shows-8/165213",
      notes: "Single tools/list request. Tools after the first page never appear.",
    },
    "claude-code": {
      status: "yes",
      evidenceUrl: "https://github.com/anthropics/claude-code/releases/tag/v2.1.144",
      notes:
        "v2.1.144 drains paginated tools/list. v2.1.147 paginates resources, templates, and prompts.",
    },
    grok: {
      status: "yes",
      evidenceUrl:
        "https://github.com/xai-org/grok-build/blob/main/crates/codegen/xai-grok-mcp/src/servers.rs",
      notes: "Follows next_cursor on tool and resource lists until none remains.",
    },
    opencode: {
      status: "yes",
      evidenceUrl:
        "https://github.com/anomalyco/opencode/blob/dev/packages/opencode/src/mcp/catalog.ts",
      notes:
        "Follows cursors for tools, prompts, resources, and templates. Cycle detection, 1000-page cap.",
    },
  },
  "mcp-apps": {
    codex: {
      status: "partial",
      evidenceUrl:
        "https://github.com/openai/codex/blob/main/codex-rs/app-server/README.md",
      notes:
        "App-server advertises io.modelcontextprotocol/ui with text/html;profile=mcp-app and mcpAppResourceUri on tool calls. enable_mcp_apps is off by default.",
    },
    cursor: {
      status: "yes",
      evidenceUrl: "https://cursor.com/docs/mcp",
      notes:
        "Support table lists Apps. Official extension matrix marks Cursor. CLI rendering not documented.",
    },
    "claude-code": {
      status: "no",
      evidenceUrl: "https://github.com/anthropics/claude-code/issues/88881",
      notes:
        "Claude mobile, web, desktop, and Cowork render Apps. Claude Code CLI and VS Code show the text result.",
    },
    grok: {
      status: "partial",
      evidenceUrl:
        "https://github.com/xai-org/grok-build/blob/main/crates/codegen/xai-grok-mcp/src/servers.rs",
      notes:
        "Advertises text/html;profile=mcp-app and recognizes app-only tools. No documented TUI renderer.",
    },
    opencode: {
      status: "no",
      evidenceUrl: "https://github.com/anomalyco/opencode/issues/10884",
      notes: "Open request. No Apps host in core.",
    },
  },
  "skills-over-mcp": {
    codex: {
      status: "partial",
      evidenceUrl:
        "https://developers.openai.com/plugins/build/mcp-server#import-skills-from-the-mcp-server",
      notes:
        "Plugin Scan Tools imports a bounded SEP-2640 snapshot (skills/list, skills/get, skill://) at submission. Codex CLI still loads SKILL.md from disk and can install MCP tools a skill depends on. No live skills/list against a connected MCP server.",
    },
    cursor: {
      status: "no",
      evidenceUrl: "https://cursor.com/docs/mcp",
      notes:
        "Support table is Tools, Prompts, Resources, Roots, Elicitation, Apps. Skills load from .cursor/skills, .agents/skills, and plugins. No skills/list or io.modelcontextprotocol/skills.",
    },
    "claude-code": {
      status: "no",
      evidenceUrl: "https://code.claude.com/docs/en/skills",
      notes:
        "Skills load from the filesystem and plugins. MCP resources are attachments, not a skills catalog. SEP-2640 notes an internal prototype that is not public.",
    },
    grok: {
      status: "no",
      evidenceUrl: "https://docs.x.ai/build/features/mcp-servers",
      notes:
        "MCP docs cover tools, OAuth, and approvals. No skills/list, skill://, or io.modelcontextprotocol/skills. docs.x.ai/build/features/skills is 404.",
    },
    opencode: {
      status: "no",
      evidenceUrl: "https://opencode.ai/docs/skills",
      notes:
        "Skills load from .opencode/skills, .claude/skills, and .agents/skills. The skill tool reads SKILL.md from disk. No skills/list or io.modelcontextprotocol/skills in core.",
    },
  },
  oauth: {
    codex: {
      status: "yes",
      evidenceUrl: "https://github.com/openai/codex/pull/38089",
      notes:
        "codex mcp login opens a browser. Remote servers default to auth=oauth. Registration auto prefers CIMD, falls back to DCR.",
    },
    cursor: {
      status: "yes",
      evidenceUrl: "https://cursor.com/docs/mcp",
      notes:
        "Marketplace Add to Cursor runs OAuth. Static CLIENT_ID/SECRET in mcp.json. CLI: agent mcp login. Cloud OAuth is per user on Cursor's backend.",
    },
    "claude-code": {
      status: "yes",
      evidenceUrl:
        "https://code.claude.com/docs/en/mcp#authenticate-with-remote-mcp-servers",
      notes:
        "/mcp or claude mcp login. Discovers CIMD; DCR and pre-configured client id/secret also work. Agent SDK does not open a browser; pass Authorization.",
    },
    grok: {
      status: "yes",
      evidenceUrl: "https://docs.x.ai/build/features/mcp-servers",
      notes:
        "Remote HTTP triggers a browser flow. Tokens in ~/.grok/mcp_credentials.json. TUI /mcps i to authenticate.",
    },
    opencode: {
      status: "yes",
      evidenceUrl:
        "https://github.com/anomalyco/opencode/blob/dev/packages/web/src/content/docs/mcp-servers.mdx",
      notes:
        "Automatic for remote servers. DCR if the server supports it. opencode mcp auth / list / logout.",
    },
  },
  approvals: {
    codex: {
      status: "yes",
      evidenceUrl: "https://developers.openai.com/codex/mcp",
      notes:
        "approval_mode auto, prompt, writes, approve. writes prompts when the tool is not read-only. readOnlyHint can skip approval.",
    },
    cursor: {
      status: "yes",
      evidenceUrl: "https://cursor.com/changelog/auto-review",
      notes:
        "Auto-review classifier plus mcpAllowlist. MCP follows Run Modes. CLI: approvalMode, /auto-review, --approve-mcps.",
    },
    "claude-code": {
      status: "yes",
      evidenceUrl:
        "https://code.claude.com/docs/en/agent-sdk/permissions#permission-modes",
      notes:
        "default prompts for unmatched MCP calls. allowedTools pre-approves. acceptEdits does not auto-approve MCP. anthropic/requiresUserInteraction forces a prompt.",
    },
    grok: {
      status: "yes",
      evidenceUrl: "https://docs.x.ai/build/features/permissions",
      notes:
        "Ask (default), Auto classifier, Always-approve. MCPTool allow/deny. deny and PreToolUse still apply under always-approve.",
    },
    opencode: {
      status: "yes",
      evidenceUrl: "https://opencode.ai/docs/permissions",
      notes:
        "allow, ask, deny, plus --auto for anything not denied. MCP tools use the same permission keys as their prefixed ids. No annotation-aware MCP policy.",
    },
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
    date: "2026-04-16",
    title: "Skills Over MCP working group",
    href: "https://modelcontextprotocol.io/community/working-groups/skills-over-mcp",
  },
  {
    date: "2026-05-19",
    title: "WebMCP at Chrome I/O",
    href: "https://developer.chrome.com/blog/chrome-at-io26",
  },
  {
    date: "2026-07-28",
    title: "Spec 2026-07-28: stateless core",
    href: "https://blog.modelcontextprotocol.io/posts/2026-07-28/",
  },
  {
    date: "2026-08-22",
    title: "MCP roadmap: messaging, identity, discovery",
    href: "https://modelcontextprotocol.io/development/roadmap",
  },
] satisfies readonly TimelineEvent[];

export const news = [
  {
    slug: "mcp-roadmap-2026-08",
    title:
      "MCP roadmap: agentic messaging, HTTP-over-stdio, DPoP, progressive discovery",
    publishedAt: "2026-08-22",
    sourceName: "MCP docs",
    sourceUrl: "https://modelcontextprotocol.io/development/roadmap",
    summary:
      "The 22 Aug 2026 cycle lists Tasks plus server-initiated events, HTTP-over-stdio, DPoP and agent identity, and protocol-level progressive discovery. Those are SEPs. No client on this board implements them.",
  },
  {
    slug: "mcp-spec-2026-07-28",
    title: "MCP ships a stateless spec",
    publishedAt: "2026-07-28",
    sourceName: "MCP blog",
    sourceUrl: "https://blog.modelcontextprotocol.io/posts/2026-07-28/",
    summary:
      "Revision 2026-07-28 drops the initialize handshake and session id. Requests carry version and capabilities. Elicitation moves to multi round-trip requests. Tasks and Apps live in the extensions framework. DCR and HTTP+SSE are deprecated.",
  },
  {
    slug: "webmcp-chrome-io-2026",
    title: "Chrome I/O: pages register tools on document.modelContext",
    publishedAt: "2026-05-19",
    sourceName: "Chrome",
    sourceUrl: "https://developer.chrome.com/blog/chrome-at-io26",
    summary:
      "At I/O 2026 Chrome showed WebMCP: a page registers tools for the life of the tab. Origin trial in Chrome 149. The five coding agents on this board do not consume it.",
  },
  {
    slug: "skills-over-mcp-sep-2640",
    title: "SEP-2640: serve Agent Skills as MCP resources",
    publishedAt: "2026-04-16",
    sourceName: "MCP",
    sourceUrl:
      "https://modelcontextprotocol.io/community/working-groups/skills-over-mcp",
    summary:
      "The Skills Over MCP working group is drafting SEP-2640: SKILL.md directories over skill://, listed with skills/list. OpenAI's plugin Scan Tools imports a bounded snapshot. The five coding agents on this board still load skills from disk.",
  },
  {
    slug: "claude-code-tool-search",
    title: "Claude Code defers MCP schemas until search hits them",
    publishedAt: "2026-04-01",
    sourceName: "Claude Code docs",
    sourceUrl: "https://code.claude.com/docs/en/agent-sdk/tool-search.md",
    summary:
      "Tool Search is native and on by default. Claude Code withholds schemas and hydrates on demand. alwaysLoad keeps a server in context.",
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
  {
    slug: "anthropic-code-execution-with-mcp",
    title: "Anthropic: stop stuffing MCP tools into context, write code instead",
    publishedAt: "2025-11-04",
    sourceName: "Anthropic",
    sourceUrl: "https://www.anthropic.com/engineering/code-execution-with-mcp",
    summary:
      "Present MCP servers as code APIs. The model loads the tools it needs and filters results in a sandbox. Cloudflare called the same idea Code Mode. Claude Code still calls tools directly.",
  },
] satisfies readonly NewsItem[];
