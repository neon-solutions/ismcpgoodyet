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
    docsUrl: "https://opencode.ai/v2/docs/mcp-servers",
  },
  {
    id: "factory-droid",
    name: "Factory Droid",
    docsUrl: "https://docs.factory.com/harness/mcp",
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
    id: "push-events",
    name: "Push events",
    kind: "spec",
    summary:
      "A server pushes an event to the model or wakes its session without a tool call per event. A watch may need setup; list-change notifications alone do not count. SEP-3415 is Final; the official Events extension is Beta and defines poll, push, and webhook delivery.",
    specUrl: "https://modelcontextprotocol.io/extensions/events/overview",
    shippedAt: "2026-11-19",
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
        "Opt-in mcp_2026_07_28. Default remains 2025-06-18. Stdio also needs CODEX_MCP_PROTOCOL_VERSION, or the off-by-default mcp_connection_sharing feature, which probes eligible local stdio servers (0.166.0).",
    },
    cursor: {
      status: "partial",
      evidenceUrl: "https://cursor.com/docs/release-notes/ide",
      notes:
        "IDE 3.30 (Nov 12) connects servers that only support the newer stateless handshake. The release does not name the revision or establish CLI and Cloud parity. Verified 2026-11-21.",
    },
    "claude-code": {
      status: "yes",
      evidenceUrl: "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
      notes:
        "Negotiates 2026-07-28 by default: HTTP servers on every install including Bedrock, Vertex, and Foundry (2.1.274), stdio (2.1.292), claude.ai connectors (2.1.295), cloud sessions and Remote Control connectors (2.1.299). 2.1.302 accepts servers that omit resultType, ttlMs, or cacheScope. 2.1.318 stops re-probing stdio servers that exit on the version probe and pins a server that dies within 3s to the legacy handshake for 7 days. 2.1.319 fixes legacy-handshake servers failing to connect or returning empty results because Claude Code declared an extension it only uses with newer servers. 2.1.323 removes the v1 MCP client; MCP_SDK_GENERATION=v1 now runs the v2 client on the earlier handshake. MCP_PROTOCOL_NEGOTIATION=legacy opts out.",
    },
    grok: {
      status: "partial",
      evidenceUrl:
        "https://github.com/xai-org/grok-build/blob/2bdd1d6a6369de0e8c68132ea4539e9abd9e14a8/crates/codegen/xai-grok-mcp/src/servers.rs",
      notes:
        "Public source checked 2026-11-16 probes server/discover for 2026-07-28 on HTTP (including OAuth) and the ACP bridge for in-process SDK servers, with legacy fallback. Stdio stays on the 2025-11-25 initialize handshake; modern-only stdio servers are unsupported. Shipping version not verified.",
    },
    opencode: {
      status: "yes",
      evidenceUrl: "https://github.com/anomalyco/opencode/releases/tag/v2.4.0",
      notes:
        "2.4 defaults local and remote servers to auto: probes server/discover for 2026-07-28, then falls back to the legacy handshake. Stdio servers that exit on the probe are restarted once on legacy; HTTP probe timeouts also retry on legacy. protocol: legacy remains an escape hatch. Opt-in pool: true shares matching 2026-07-28 connections across directories. OpenCode 2.2 required protocol opt-in; OpenCode 1 still uses initialize.",
    },
    "factory-droid": {
      status: "no",
      evidenceUrl: "https://docs.factory.com/harness/mcp",
      notes:
        "MCP docs describe stdio, Streamable HTTP, and legacy SSE. No public 2026-07-28 support claim.",
    },
  },
  elicitation: {
    codex: {
      status: "yes",
      evidenceUrl:
        "https://github.com/openai/codex/blob/rust-v0.169.0/codex-rs/rmcp-client/src/rmcp_client.rs",
      notes:
        "elicitation/create surfaces as mcpServer/elicitation/request. Form, URL, and openai/form. Tagged 0.169.0 source routes opt-in 2026-07-28 tool calls through input_required handling, answers input requests, and retries with request state.",
    },
    cursor: {
      status: "partial",
      evidenceUrl: "https://cursor.com/docs/release-notes",
      notes:
        "Input forms in agent chat. IDE 3.27 (Oct 22) fixes scrolling and clicking Submit or Cancel. URL mode and 2026 MRTR not documented.",
    },
    "claude-code": {
      status: "yes",
      evidenceUrl: "https://github.com/anthropics/claude-code/releases/tag/v2.1.326",
      notes:
        "Form or URL dialogs appear automatically. Cloud sessions show a form card (2.1.316). Elicitation hooks and Agent SDK onElicitation can answer without a dialog. 2.1.326 fixes Tab and Shift+Tab navigation between form fields and clears a required field's tick when emptied.",
    },
    grok: {
      status: "yes",
      evidenceUrl:
        "https://github.com/xai-org/grok-build/blob/2bdd1d6a6369de0e8c68132ea4539e9abd9e14a8/crates/codegen/xai-grok-mcp/src/servers.rs",
      notes:
        "Form (with schema validation) and URL elicitation when an input handler is attached; not advertised on ACP connections. Public source handles legacy elicitation/create and 2026-07-28 input_required round trips, including polling while a URL flow is pending. Stdio remains legacy-only.",
    },
    opencode: {
      status: "yes",
      evidenceUrl: "https://opencode.ai/v2/docs/mcp-servers#input-requests",
      notes:
        "OpenCode 2.2 advertises form and URL elicitation. Requests show as a form or a link to open; dismissing cancels. OpenCode 1 has no handler.",
    },
    "factory-droid": {
      status: "partial",
      evidenceUrl: "https://docs.factory.com/changelog/release-notes",
      notes:
        "Elicitation prompts from MCP tools appear and resume after an interruption (0.112.0). MCP docs do not cover it; form vs URL mode is not documented.",
    },
  },
  "push-events": {
    codex: {
      status: "no",
      evidenceUrl:
        "https://github.com/openai/codex/blob/rust-v0.169.0/codex-rs/app-server/src/request_processors/mcp_event_stream.rs",
      notes:
        "0.169.0 forwards hosted-app event streams to app-server callers. Delivery to the model or session wake-up is not established by this path; custom MCP servers are rejected. Checked 2026-11-18.",
    },
    cursor: {
      status: "no",
      evidenceUrl: "https://cursor.com/docs/mcp",
      notes:
        "MCP docs and release notes checked 2026-11-18 do not document server events reaching the model or waking its session.",
    },
    "claude-code": {
      status: "partial",
      evidenceUrl:
        "https://code.claude.com/docs/en/mcp#push-messages-with-channels",
      notes:
        "Research-preview Channels push messages into a running session via claude/channel and --channels. Requires Anthropic auth; Team/Enterprise and managed Console orgs need admin enablement. On the v2 runtime, channel servers must use the earlier handshake: 2026-07-28 servers cannot register. No io.modelcontextprotocol/events support documented as of 2026-11-18.",
    },
    grok: {
      status: "no",
      evidenceUrl: "https://docs.x.ai/build/features/mcp-servers",
      notes:
        "MCP docs checked 2026-11-18 describe tools and server setup, with no documented push-to-model or session-wake support. Changelog verification unavailable.",
    },
    opencode: {
      status: "partial",
      evidenceUrl:
        "https://github.com/anomalyco/opencode/releases/tag/v2.4.0",
      notes:
        "2.4 ships Events Beta push delivery on 2026-07-28 with argument checks, heartbeats and reconnects. Event-triggered automations can send a prompt or run Code Mode or a shell command. mcp_events is removed; automations are on by default and automations: false disables watches. Poll and webhook delivery are absent. The tagged client API still labels Events experimental, so support stays Partial.",
    },
    "factory-droid": {
      status: "no",
      evidenceUrl: "https://docs.factory.com/harness/mcp",
      notes:
        "MCP docs and release notes checked 2026-11-18 do not document server events reaching the model or waking its session. SSE transport support alone does not establish this.",
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
      status: "partial",
      evidenceUrl: "https://code.claude.com/docs/en/mcp#mcp-tasks-that-run-on-the-server",
      notes:
        "CLI since 2.1.304: polls tasks/get, answers input_required through tasks/update and cancels with tasks/cancel. Interactive terminals also work without feature-flag fetching on cloud providers and gateways. Esc defers a question; Enter in /tasks reopens it. HTTP reconnect and background handoff recovery exclude some servers. 2.1.331 adds eligible non-fork subagents and VS Code/local Desktop sessions with feature-flag fetching. Those apps cannot show task questions; an accepting Elicitation hook is needed to avoid cancellation. Desktop connectors and claude_desktop_config.json servers get no tasks. Cloud sessions support eligible claude.ai connectors, not project/plugin servers or cloud scheduled tasks. tasks/list and task notifications remain unused. Verified 2026-11-24.",
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
        "https://github.com/anomalyco/opencode/blob/v2.2.3/packages/core/src/mcp/client.ts",
      notes: "Client capabilities are elicitation and roots. No io.modelcontextprotocol/tasks. Built-in task subagent is unrelated.",
    },
    "factory-droid": {
      status: "no",
      evidenceUrl: "https://docs.factory.com/harness/mcp",
      notes:
        "MCP docs cover transports, tools, OAuth, filtering, timeouts, and policy. No Tasks extension. Droid's own Task subagents are unrelated.",
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
      status: "partial",
      evidenceUrl:
        "https://code.claude.com/docs/en/code-mode",
      notes:
        "Experimental and off by default (CLAUDE_CODE_EXPERIMENTAL_CODE_MODE=1). 2.1.329 waits up to ten minutes for most long MCP calls and pauses the script limit for input prompts; 2.1.330 honors MCP end-turn requests in auto/bypass scripts. Interactive terminal with Opus 5.5 / Sonnet 5.5 / Haiku 5.5 / Fable 5.2. 2.1.331 adds Bedrock, Google Agent Platform, Foundry and Claude Platform on AWS alongside subscription/Console accounts. Gateways, Claude for Government, HIPAA and ZDR remain unsupported; Enterprise Admin Console provider sign-in has further restrictions.",
    },
    grok: {
      status: "no",
      evidenceUrl:
        "https://github.com/xai-org/grok-build/blob/main/crates/codegen/xai-grok-pager/docs/user-guide/07-mcp-servers.md",
      notes: "MCP goes through search_tool and use_tool, not model-written code that calls MCP.",
    },
    opencode: {
      status: "yes",
      evidenceUrl: "https://opencode.ai/v2/docs/mcp-servers#permissions",
      notes:
        "Default in OpenCode 2.2: the model calls tools.<server>.<tool>() inside execute. codemode: false on a server keeps its tools on the native tool list. OpenCode 1 has it behind OPENCODE_EXPERIMENTAL_CODE_MODE.",
    },
    "factory-droid": {
      status: "yes",
      evidenceUrl: "https://factory.com/news/frontier-harness",
      notes:
        "Default since Droid 1.0 (Oct 29): the model writes JavaScript in a sandboxed Script tool that calls many tools, MCP included, in one request. On by default for GPT-6.x, GPT-5.6 Sol, Claude Opus 5 and 5.5, Fable, and Kimi K3; other models call tools directly.",
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
      evidenceUrl: "https://cursor.com/docs/release-notes/ide",
      notes:
        "Turn 1 is tool names only; full descriptions live in files per server and load on demand. IDE 3.30 tool search matches descriptions as well as server/tool names and reports servers still starting or failing to connect. agent mcp list-tools is a human listing. Verified 2026-11-24.",
    },
    "claude-code": {
      status: "yes",
      evidenceUrl: "https://github.com/anthropics/claude-code/releases/tag/v2.1.331",
      notes:
        "Tool Search is on by default. Definitions are withheld; the agent gets a summary and loads up to five matches. alwaysLoad keeps a tool in the prompt; alwaysLoad: false on a server defers all its tools (2.1.287). Azure-hosted Foundry and unsupported models load upfront. Gateways default to search since 2.1.304, with fallback if they reject it. 2.1.325 raises tool-search descriptions in new cloud sessions from 4,096 to 16,384 characters, matching other sessions. 2.1.326 fixes exact-name searches loading another MCP server's tool. 2.1.331 Code Mode search shows more of each tool's description, including limits, formats and defaults.",
    },
    grok: {
      status: "yes",
      evidenceUrl:
        "https://github.com/xai-org/grok-build/blob/main/crates/codegen/xai-grok-pager/docs/user-guide/07-mcp-servers.md",
      notes:
        "search_tool finds MCP tools by name or description. use_tool calls them. The catalog is not dumped into the prompt.",
    },
    opencode: {
      status: "yes",
      evidenceUrl:
        "https://github.com/anomalyco/opencode/releases/tag/v2.3.1",
      notes:
        "Under default Code Mode (2.2) the prompt gets a catalog capped at about 2,000 tokens; search(...) returns signatures for omitted tools. 2.2.7 sends only what changed when servers connect, disconnect, or change tools. 2.3.1 raises each catalog tool summary's limit from 120 to 500 characters. Servers with codemode: false still load full schemas.",
    },
    "factory-droid": {
      status: "yes",
      evidenceUrl: "https://docs.factory.com/changelog/release-notes",
      notes:
        "MCP tool search on by default since 0.140.0 (Jun 3): Droid searches and loads MCP tools on demand. Droid 1.0 sends 2 tool definitions up front.",
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
      evidenceUrl: "https://cursor.com/docs/release-notes/ide",
      notes:
        "Customize > MCPs toggles a server. Click a tool name in the chat tools list to turn it off. CLI: agent mcp enable|disable and permissions.deny Mcp(server:tool). Team admins can limit a URL server's tools from its detail dialog. IDE 3.30 team allowlist URL rules match scheme, host, port and path, including wildcards and hosts with a trailing dot. Verified 2026-11-24.",
    },
    "claude-code": {
      status: "yes",
      evidenceUrl:
        "https://github.com/anthropics/claude-code/releases/tag/v2.1.330",
      notes:
        "disallowedTools can hide a tool. disabledMcpServers / allowedMcpServers / deniedMcpServers filter servers. allowedTools is auto-approval, not visibility, unless dontAsk. Since 2.1.330, a deniedMcpServers name entry hides only that named claude.ai connector; deny its exact URL to block every connector at that URL.",
    },
    grok: {
      status: "yes",
      evidenceUrl: "https://docs.x.ai/build/features/permissions",
      notes:
        "enabled on the server, grok mcp enable|disable, TUI /mcps Space toggle. MCPTool allow/deny rules. Per-tool registration in ToolBridge.",
    },
    opencode: {
      status: "yes",
      evidenceUrl: "https://opencode.ai/v2/docs/mcp-servers",
      notes:
        "disabled: true keeps a server configured without connecting it. Permission rules can deny a prefixed MCP tool id. Managed policy mcp.use controls which MCP servers can be used (2.2.3).",
    },
    "factory-droid": {
      status: "yes",
      evidenceUrl: "https://docs.factory.com/changelog/release-notes",
      notes:
        "disabled: true or /mcp toggles a server without removing it. enabledTools allow list, disabledTools deny list. 1.17 lets admins add MCP servers for a user group on top of the organization allowlist.",
    },
  },
  "list-pagination": {
    codex: {
      status: "yes",
      evidenceUrl: "https://github.com/openai/codex/pull/50035",
      notes:
        "Drains nextCursor in both protocol modes. Default 2025-06-18 mode follows it since 0.162.0; opt-in 2026-07-28 mode already did.",
    },
    cursor: {
      status: "yes",
      evidenceUrl: "https://cursor.com/docs/release-notes",
      notes:
        "Oct 1, 2026 release: servers that paginate tools, prompts, or resources show every page, not just the first.",
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
        "https://github.com/anomalyco/opencode/blob/v1.19.5/packages/opencode/src/mcp/catalog.ts",
      notes:
        "OpenCode 1 follows cursors for tools, prompts, resources, and templates with cycle detection and a 1000-page cap. OpenCode 2.2 lists through @modelcontextprotocol/client 2.3.1, which follows nextCursor up to a page cap.",
    },
    "factory-droid": {
      status: "yes",
      evidenceUrl: "https://github.com/Factory-AI/factory/issues/7",
      notes:
        "1.0.0 follows nextCursor on tools/list and stops on a repeated cursor. The issue reporting only the first page (filed on 0.186.0) is still open, and no changelog line names the fix.",
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
      evidenceUrl: "https://cursor.com/docs/release-notes/ide",
      notes:
        "Interactive Apps render in agent chat. IDE 3.30 lets an app call tools on its own server without a server/tool approval prompt; tools hidden from apps remain unavailable. CLI rendering not documented. Verified 2026-11-24.",
    },
    "claude-code": {
      status: "no",
      evidenceUrl: "https://github.com/anthropics/claude-code/issues/88881",
      notes:
        "Claude mobile, web, desktop, and Cowork render Apps. Claude Code CLI and VS Code show the text result. The request to render Apps for local servers was closed as inactive (Oct 16).",
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
    "factory-droid": {
      status: "no",
      evidenceUrl: "https://docs.factory.com/harness/mcp",
      notes:
        "No MCP Apps host documented in the MCP reference.",
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
      status: "partial",
      evidenceUrl: "https://code.claude.com/docs/en/mcp#use-skills-from-mcp-servers",
      notes:
        "Public beta in 2.1.331: live MCP skills appear as /<server>:<skill> in supported terminal and local Desktop sessions. Requires a supported model, direct Anthropic access and feature-flag fetching. Pro/Max/Ultra login is on; Team/Enterprise needs admin enablement. VS Code and API/Console access are rolling out. Cloud sessions, headless runs, Agent SDK and cloud providers are unsupported. Filesystem and plugin skills remain available. Verified 2026-11-24.",
    },
    grok: {
      status: "no",
      evidenceUrl: "https://docs.x.ai/build/features/mcp-servers",
      notes:
        "MCP docs cover tools, OAuth, and approvals. No skills/list, skill://, or io.modelcontextprotocol/skills. docs.x.ai/build/features/skills is 404.",
    },
    opencode: {
      status: "no",
      evidenceUrl: "https://opencode.ai/v2/docs/skills",
      notes:
        "Skills load from .opencode/skills on disk. No skills/list or io.modelcontextprotocol/skills in the 2.2 MCP client.",
    },
    "factory-droid": {
      status: "no",
      evidenceUrl: "https://docs.factory.com/harness/skills",
      notes:
        "Skills load from .factory/skills, .agents/skills, .agent/skills, and plugins. No skills/list or skill://.",
    },
  },
  oauth: {
    codex: {
      status: "yes",
      evidenceUrl: "https://github.com/openai/codex/releases/tag/rust-v0.171.0",
      notes:
        "codex mcp login opens a browser; /mcp login <name> does it from the TUI (0.161.0). Remote servers default to auth=oauth. Registration auto prefers CIMD, falls back to DCR. --oauth-client-secret for pre-registered clients (0.158.0). 0.164.0 adds enterprise-managed authorization and requests the resource's scopes, not the authorization server's full list. 0.170.0 fixes credential races during cancellation, login, and logout. 0.171.0 supports enterprise identity providers that issue ID tokens without refresh tokens.",
    },
    cursor: {
      status: "yes",
      evidenceUrl: "https://cursor.com/docs/mcp",
      notes:
        "Marketplace Add to Cursor runs OAuth. Static CLIENT_ID/SECRET in mcp.json. CLI: agent mcp login. Cloud OAuth is per user on Cursor's backend. Servers that reject local redirect URLs sign in through a Cursor-hosted callback page (Oct 9). Cloud Agents show a sign-in card for missing permissions named by the server mid-call, and keep the granted scopes for later sign-ins (Oct 19).",
    },
    "claude-code": {
      status: "yes",
      evidenceUrl:
        "https://code.claude.com/docs/en/mcp#authenticate-with-remote-mcp-servers",
      notes:
        "/mcp or claude mcp login. Discovers CIMD; DCR and pre-configured client id/secret also work. Prompts to re-authenticate when a server asks for more scope mid-call (2.1.288). Agent SDK does not open a browser: sign in interactively first to reuse stored OAuth credentials, or pass Authorization.",
    },
    grok: {
      status: "yes",
      evidenceUrl: "https://docs.x.ai/build/features/mcp-servers",
      notes:
        "Remote HTTP triggers a browser flow. Tokens in ~/.grok/mcp_credentials.json. TUI /mcps i to authenticate.",
    },
    opencode: {
      status: "yes",
      evidenceUrl: "https://opencode.ai/v2/docs/mcp-servers#client-registration",
      notes:
        "Automatic for remote servers. Uses a pre-registered client, then CIMD, then DCR (2.2). opencode mcp auth / list / logout. 2.2.7 keeps rotating-token logins across concurrent refreshes and temporary token-endpoint failures. 2.3.0 fixes refreshes and localhost redirects when a server rewrites 127.0.0.1.",
    },
    "factory-droid": {
      status: "yes",
      evidenceUrl: "https://docs.factory.com/changelog/release-notes",
      notes:
        "Remote servers sign in from /mcp in a browser. droid mcp auth signs in to enabled, policy-allowed HTTP/SSE servers that need authentication, one at a time. Uses CIMD when supported or DCR. Pre-registered oauth.clientId/clientSecret require authorizationServerIssuer. Tokens in the system keyring or a fallback file. Adding a server from a session on another computer signs in through your browser (1.3.0). 1.16.0 makes authorization links clickable in MCP views and command output. 1.19.0 adds a per-server option to skip forced consent when it blocks sign-in.",
    },
  },
  approvals: {
    codex: {
      status: "yes",
      evidenceUrl: "https://developers.openai.com/codex/mcp",
      notes:
        "approval_mode auto, prompt, writes, approve. writes prompts when the tool is not read-only. readOnlyHint can skip approval; since 0.169.0 it takes precedence over destructiveHint and openWorldHint in automatic approval (PR 60638).",
    },
    cursor: {
      status: "yes",
      evidenceUrl: "https://cursor.com/changelog/auto-review",
      notes:
        "Auto-review classifier plus mcpAllowlist. MCP follows Run Modes. Tools the server marks as requiring confirmation always prompt under Auto-review. CLI: approvalMode, /auto-review, --approve-mcps.",
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
      evidenceUrl: "https://opencode.ai/v2/docs/permissions",
      notes:
        "Ordered allow, ask, and deny rules. MCP tools use the same permission keys as their prefixed ids. No annotation-aware MCP policy.",
    },
    "factory-droid": {
      status: "yes",
      evidenceUrl: "https://docs.factory.com/autonomy-and-safety/auto-run",
      notes:
        "MCP tools get a low, medium, or high risk level that is compared against the Autonomy Level. Read-only hints feed the classification. droid mcp permissions persists approvals per server.",
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
  {
    date: "2026-10-05",
    title: "Draft Events extension proposed (SEP-3415)",
    href: "https://github.com/modelcontextprotocol/modelcontextprotocol/pull/3415",
  },
  {
    date: "2026-11-11",
    title: "MCP moves to two spec releases a year",
    href: "https://blog.modelcontextprotocol.io/posts/mcp-release-cycle/",
  },
  {
    date: "2026-11-19",
    title: "SEP-3415 Final; Events extension in Beta",
    href: "https://modelcontextprotocol.io/extensions/events/overview",
  },
  {
    date: "2026-11-23",
    title: "OpenCode 2.4 defaults to stateless negotiation and event automations",
    href: "https://github.com/anomalyco/opencode/releases/tag/v2.4.0",
  },
  {
    date: "2026-11-24",
    title: "Claude Code documents Skills over MCP in public beta",
    href: "https://code.claude.com/docs/en/mcp#use-skills-from-mcp-servers",
  },
] satisfies readonly TimelineEvent[];

export const news = [
  {
    slug: "claude-code-live-mcp-skills",
    title: "Claude Code documents live MCP skills in public beta",
    publishedAt: "2026-11-24",
    sourceName: "Claude Code docs",
    sourceUrl: "https://code.claude.com/docs/en/mcp#use-skills-from-mcp-servers",
    summary:
      "Verified 2026-11-24: Claude Code 2.1.331 can load skills from connected MCP servers and expose them as /<server>:<skill>. Supported terminal and local Desktop sessions need a supported model, direct Anthropic access and feature-flag fetching. Pro, Max and Ultra logins have access; Team and Enterprise require admin enablement. VS Code and API/Console access are rolling out. Cloud, headless, Agent SDK and cloud-provider sessions are excluded, so Skills over MCP moves from No to Partial.",
  },
  {
    slug: "claude-code-mcp-tasks-more-surfaces",
    title: "Claude Code documents MCP tasks in subagents, VS Code and Desktop",
    publishedAt: "2026-11-24",
    sourceName: "Claude Code docs",
    sourceUrl: "https://code.claude.com/docs/en/mcp#mcp-tasks-that-run-on-the-server",
    summary:
      "Verified 2026-11-24: version 2.1.331 supports tasks in eligible non-fork subagents and VS Code/local Desktop sessions with feature-flag fetching. Those apps cannot display task questions and cancel unless an Elicitation hook accepts. Desktop connectors and servers from claude_desktop_config.json are excluded. Anthropic-hosted cloud sessions support eligible claude.ai connectors, with separate restrictions on scheduled work and project/plugin servers. Tasks stays Partial.",
  },
  {
    slug: "factory-droid-mcp-consent-option",
    title: "Factory Droid 1.19 adds an MCP sign-in consent option",
    publishedAt: "2026-11-24",
    sourceName: "Factory release notes",
    sourceUrl: "https://docs.factory.com/changelog/release-notes",
    summary:
      "An MCP server can now be configured to skip the forced consent step when it blocks sign-in. This extends the existing OAuth flow; OAuth stays Yes.",
  },
  {
    slug: "opencode-default-stateless-and-events",
    title: "OpenCode 2.4 defaults to stateless MCP and event automations",
    publishedAt: "2026-11-23",
    sourceName: "OpenCode release notes",
    sourceUrl: "https://github.com/anomalyco/opencode/releases/tag/v2.4.0",
    summary:
      "Local and remote servers now try 2026-07-28 before falling back to the legacy handshake, moving stateless support to Yes. Events push delivery follows the Beta extension with argument checks, heartbeats and reconnects. Event-triggered automations run prompts, Code Mode or shell commands by default; automations: false disables them. The mcp_events flag is removed, but the tagged client API still labels Events experimental, so push events stays Partial.",
  },
  {
    slug: "claude-code-cloud-provider-code-mode",
    title: "Claude Code 2.1.331 brings Code Mode to cloud providers",
    publishedAt: "2026-11-23",
    sourceName: "Claude Code release notes",
    sourceUrl: "https://github.com/anthropics/claude-code/releases/tag/v2.1.331",
    summary:
      "Interactive terminal Code Mode now supports Amazon Bedrock, Google Agent Platform, Microsoft Foundry and Claude Platform on AWS. It remains experimental and opt-in, with model, account and gateway restrictions. MCP tool search in Code Mode includes more of each tool's description. The release also fixes MCP calls hanging for up to 30 minutes on malformed replies from local or WebSocket servers.",
  },
  {
    slug: "codex-lazy-stdio-startup",
    title: "Codex 0.172 starts cached stdio MCP servers on first use",
    publishedAt: "2026-11-23",
    sourceName: "Codex release notes",
    sourceUrl: "https://github.com/openai/codex/releases/tag/rust-v0.172.0",
    summary:
      "Optional stdio MCP servers with a usable cached tool list now start on their first tool call by default. This delays starting the server process; deferred tool descriptions were already supported. The TUI also completes supported slash-command arguments, such as /mcp lo to /mcp login.",
  },
  {
    slug: "factory-droid-group-mcp-allowlists",
    title: "Factory Droid 1.17 adds group-specific MCP allowlist entries",
    publishedAt: "2026-11-21",
    sourceName: "Factory release notes",
    sourceUrl: "https://docs.factory.com/changelog/release-notes",
    summary:
      "Admins can add MCP servers for a user group on top of the organization allowlist. Per-tool filtering stays Yes. Live MCP health now stays in the footer while the startup header shows counts.",
  },
  {
    slug: "claude-code-mcp-background-handoff",
    title: "Claude Code 2.1.330 keeps MCP tasks running across background handoffs",
    publishedAt: "2026-11-20",
    sourceName: "Claude Code release notes",
    sourceUrl: "https://github.com/anthropics/claude-code/releases/tag/v2.1.330",
    summary:
      "Moving a session to the background no longer reports its MCP task as stopped: the background session follows it, except when the server uses stdio or sets headers. Shared subagent MCP servers stay connected until their remaining users finish. The release also fixes missing @-mentioned connector and plugin resources, rejected input schemas failing turns, and Code Mode ignoring MCP end-turn requests in auto or bypass mode. Denying a connector by name now blocks only that name; deny its exact URL to block every connector there.",
  },
  {
    slug: "factory-droid-mcp-auth-links",
    title: "Factory Droid 1.16 makes MCP sign-in links clickable",
    publishedAt: "2026-11-20",
    sourceName: "Factory release notes",
    sourceUrl: "https://docs.factory.com/changelog/release-notes",
    summary:
      "MCP authorization links are now clickable in MCP views and command output. This improves the existing browser sign-in flow; OAuth remains Yes on the board.",
  },
  {
    slug: "mcp-events-beta",
    title: "MCP Events becomes an official Beta extension",
    publishedAt: "2026-11-19",
    sourceName: "MCP",
    sourceUrl: "https://modelcontextprotocol.io/extensions/events/overview",
    summary:
      "SEP-3415 reached Final on November 19. The official io.modelcontextprotocol/events extension is Beta and defines event discovery plus poll, push, and webhook delivery, with cursors for resumption. OpenCode's initial experimental event watches predated finalization. Claude Code Channels remain a separate client capability.",
  },
  {
    slug: "claude-code-mcp-reconnect-and-code-mode",
    title: "Claude Code 2.1.329 repairs MCP task recovery and Code Mode waits",
    publishedAt: "2026-11-19",
    sourceName: "Claude Code release notes",
    sourceUrl: "https://github.com/anthropics/claude-code/releases/tag/v2.1.329",
    summary:
      "Background MCP tasks no longer stall after a slow reconnect leaves most HTTP servers on an older protocol version: Claude Code reconnects them automatically. Code Mode scripts wait up to ten minutes for most long MCP calls instead of receiving a moved-to-background message, and an MCP form or link prompt no longer consumes that script limit. The release also stops a pending token refresh from restoring a cleared MCP login and reports tools that could not be loaded in tool-search sessions.",
  },
  {
    slug: "codex-enterprise-mcp-without-refresh-token",
    title: "Codex 0.171 fixes enterprise MCP sign-in without refresh tokens",
    publishedAt: "2026-11-19",
    sourceName: "Codex release notes",
    sourceUrl: "https://github.com/openai/codex/releases/tag/rust-v0.171.0",
    summary:
      "Enterprise MCP sign-in now works with identity providers that issue ID tokens without refresh tokens. This repairs the existing enterprise-managed authorization flow; OAuth remains Yes on the board.",
  },
  {
    slug: "opencode-mcp-event-automations",
    title: "OpenCode 2.3.1 lets MCP events trigger automations",
    publishedAt: "2026-11-17",
    sourceName: "OpenCode release notes",
    sourceUrl: "https://github.com/anomalyco/opencode/releases/tag/v2.3.1",
    summary:
      "Experimental automations can react to a pushed MCP event by sending a prompt to a session or a new subagent, or by running Code Mode that decides whether to send one. In 2.3.1, event watches require both automations and mcp_events. Code Mode catalog tool summaries also grow from 120 to 500 characters, and search accepts a string as shorthand.",
  },
  {
    slug: "codex-mcp-oauth-races",
    title: "Codex 0.170 fixes MCP credential races",
    publishedAt: "2026-11-17",
    sourceName: "Codex release notes",
    sourceUrl: "https://github.com/openai/codex/releases/tag/rust-v0.170.0",
    summary:
      "MCP OAuth credential writes and refreshes now handle cancellation, login, and logout races. The release also adds experimental separation of identically named MCP servers across environments.",
  },
  {
    slug: "cursor-cli-mcp-resource-permissions",
    title: "Cursor CLI checks MCP resource saves and connects local worker servers",
    publishedAt: "2026-11-17",
    sourceName: "Cursor CLI release notes",
    sourceUrl: "https://cursor.com/docs/cli/changelog",
    summary:
      "MCP resource downloads follow file-write rules and approvals, must stay inside the workspace, and are refused in Ask and Plan modes. Self-hosted workers now connect URL servers in ~/.cursor/mcp.json at localhost, 127.0.0.1, or [::1]; other URL servers still run on Cursor's backend.",
  },
  {
    slug: "claude-code-mcp-result-and-form-fixes",
    title: "Claude Code 2.1.326 fixes MCP result mix-ups and input forms",
    publishedAt: "2026-11-16",
    sourceName: "Claude Code release notes",
    sourceUrl: "https://github.com/anthropics/claude-code/releases/tag/v2.1.326",
    summary:
      "Parallel MCP calls no longer read another call's saved result when two long results arrive in the same millisecond. Tool search fixes exact-name lookups loading a different server's tool. Input forms now accept Tab and Shift+Tab between fields and clear a required field's tick when emptied. These are fixes to existing support; the board's statuses stay unchanged.",
  },
  {
    slug: "grok-stateless-http-source",
    title: "Grok's public source supports stateless MCP on HTTP, not stdio",
    publishedAt: "2026-11-16",
    sourceName: "Grok Build source",
    sourceUrl:
      "https://github.com/xai-org/grok-build/blob/2bdd1d6a6369de0e8c68132ea4539e9abd9e14a8/crates/codegen/xai-grok-mcp/src/servers.rs",
    summary:
      "Verified in public source on 2026-11-16: Grok probes server/discover for revision 2026-07-28 on HTTP, including OAuth, and the ACP bridge for in-process SDK servers, with legacy fallback. It handles elicitation input_required round trips on modern connections with an input handler; ACP does not advertise elicitation. Stdio still uses the 2025-11-25 initialize handshake. The shipping version is not verified, so the board scores stateless support partial.",
  },
  {
    slug: "claude-code-mcp-task-recovery",
    title: "Claude Code 2.1.325 lets MCP task questions wait for you",
    publishedAt: "2026-11-13",
    sourceName: "Claude Code release notes",
    sourceUrl: "https://github.com/anthropics/claude-code/releases/tag/v2.1.325",
    summary:
      "Esc on a background MCP task's question now means answer later: nothing is sent to the server, and Enter in /tasks reopens the question. Background tasks resume polling after a later call reconnects the server, and questions wait until you send or clear a draft. New cloud sessions also load up to 16,384 characters per tool-search description instead of 4,096. Tasks remains public beta and partial on the board.",
  },
  {
    slug: "opencode-2-3-mcp-events",
    title: "OpenCode 2.3 adds experimental MCP events",
    publishedAt: "2026-11-13",
    sourceName: "GitHub",
    sourceUrl: "https://github.com/anomalyco/opencode/releases/tag/v2.3.0",
    summary:
      "Behind the mcp_events flag, OpenCode lists and streams events from servers that offer io.modelcontextprotocol/events, and a watch_mcp_event tool wakes a session when one arrives. This release implemented the draft; SEP-3415 reached Final on November 19, with the extension in Beta.",
  },
  {
    slug: "cursor-ide-stateless-connections",
    title: "Cursor IDE 3.30 connects stateless-only MCP servers",
    publishedAt: "2026-11-12",
    sourceName: "Cursor IDE release notes",
    sourceUrl: "https://cursor.com/docs/release-notes/ide",
    summary:
      "Verified 2026-11-21: the November 12 IDE release says MCP servers that only support the newer stateless handshake now connect. It also retries connections cut off mid-response and tolerates non-JSON output from stdio servers. The release does not name the protocol revision or establish CLI and Cloud parity, so stateless support moves from No to Partial.",
  },
  {
    slug: "claude-code-code-mode",
    title: "Claude Code adds an experimental Code Mode",
    publishedAt: "2026-11-12",
    sourceName: "Claude Code docs",
    sourceUrl: "https://code.claude.com/docs/en/code-mode",
    summary:
      "Verified 2026-11-18: Code Mode, introduced in 2.1.323, remains experimental and off by default. The 2.1.328 changelog confirms MCP calls from scripts with a fix for servers connected during the previous script, plus MCP prompt caching and server-list notifications. The board now scores Claude Code partial, like Codex's opt-in code mode.",
  },
  {
    slug: "mcp-release-cycle",
    title: "MCP moves to two spec releases a year; next is 2027-03-30",
    publishedAt: "2026-11-11",
    sourceName: "MCP blog",
    sourceUrl: "https://blog.modelcontextprotocol.io/posts/mcp-release-cycle/",
    summary:
      "Specification releases will generally land on the last Tuesday of March and September. The next is targeted for March 30, 2027, as version 2027-03-30.",
  },
  {
    slug: "mcp-files-extension",
    title: "Draft MCP extension for file uploads and downloads",
    publishedAt: "2026-11-10",
    sourceName: "MCP blog",
    sourceUrl:
      "https://blog.modelcontextprotocol.io/posts/exploring-file-uploads-and-downloads-in-mcp/",
    summary:
      "The experimental io.modelcontextprotocol/files extension works with revision 2026-07-28 and later and moves file bytes outside JSON-RPC: a tool returns an upload request, or download targets in _meta. The authors expect it to be stable before the end of the year. No client on this board implements it.",
  },
  {
    slug: "factory-droid-script-mode",
    title: "Factory Droid 1.0 makes code mode the default",
    publishedAt: "2026-10-29",
    sourceName: "Factory",
    sourceUrl: "https://factory.com/news/frontier-harness",
    summary:
      "Droid 1.0 runs most tool calls, MCP included, inside a Script tool: the model writes JavaScript that calls many tools in one request and prints only what it needs. On by default for GPT-6.x, GPT-5.6 Sol, Claude Opus 5 and 5.5, Fable, and Kimi K3. Codex keeps code mode opt-in; OpenCode 2.2 also defaults to Code Mode.",
  },
  {
    slug: "mcp-extension-lifecycle",
    title: "MCP extensions get stages: Apps and Auth Stable, Tasks and Skills Beta",
    publishedAt: "2026-10-29",
    sourceName: "MCP",
    sourceUrl: "https://modelcontextprotocol.io/seps/3392-extension-lifecycle",
    summary:
      "SEP-3392 is Final. Extensions move from Experimental to Beta to Stable or into the core spec, and Experimental and Beta extensions may still break. ext-apps and ext-auth are Stable; ext-skills, ext-tasks, and ext-server-card are Beta.",
  },
  {
    slug: "claude-code-mcp-tasks",
    title: "Claude Code runs MCP Tasks in public beta",
    publishedAt: "2026-10-28",
    sourceName: "Claude Code docs",
    sourceUrl: "https://code.claude.com/docs/en/mcp#mcp-tasks-that-run-on-the-server",
    summary:
      "Claude Code 2.1.304 and later can run a tool call as an MCP task: it polls tasks/get, answers input requests through tasks/update, and cancels with tasks/cancel. On 28 Oct the extension client matrix checked Tasks for Claude Code and Claude.ai. It is the first client on this board with Tasks.",
  },
  {
    slug: "opencode-2-2",
    title: "OpenCode 2.2 defaults MCP to Code Mode and answers elicitation",
    publishedAt: "2026-10-27",
    sourceName: "GitHub",
    sourceUrl: "https://github.com/anomalyco/opencode/releases/tag/v2.2.0",
    summary:
      "OpenCode 2.2.0 is the first 2.x release, installed from opencode.ai/v2/install. MCP tools run through Code Mode by default, with a catalog of about 2,000 tokens in the prompt and search for the rest. Servers can request form or URL input, and a per-server protocol setting opts into 2026-07-28. OpenCode 1 continues as 1.19.5; this board now scores OpenCode 2.",
  },
  {
    slug: "mcp-tasks-events-wg",
    title: "Tasks moves to a new Tasks and Events working group",
    publishedAt: "2026-10-26",
    sourceName: "MCP docs",
    sourceUrl: "https://modelcontextprotocol.io/extensions/client-matrix",
    summary:
      "On 20 Oct the Agents Working Group became an Interest Group, and Tasks moved to a new Tasks and Events Working Group alongside triggers and events. On 26 Oct the extension client matrix gained a Tasks column. MCPJam was the only client checked that day; on 28 Oct the matrix added Claude Code.",
  },
  {
    slug: "mcp-typescript-sdk-http-advisories",
    title: "Three high-severity HTTP advisories in the MCP TypeScript SDK",
    publishedAt: "2026-10-15",
    sourceName: "MCP TypeScript SDK",
    sourceUrl:
      "https://github.com/modelcontextprotocol/typescript-sdk/security/advisories/GHSA-jm63-cq47-j5jp",
    summary:
      "A shared stateless transport or a single McpServer instance could deliver one HTTP client's responses to another, because messages were matched by JSON-RPC id alone. Separately, servers did not limit body size, batch length, or how many array elements and keys they validated, so one unauthenticated request could exhaust memory. Fixed in @modelcontextprotocol/sdk 1.32.0 and @modelcontextprotocol/server 2.3.0.",
  },
  {
    slug: "mcp-sdk-advisories-2026-10",
    title: "Ten security advisories hit the official MCP SDKs in eight days",
    publishedAt: "2026-10-05",
    sourceName: "MCP TypeScript SDK",
    sourceUrl:
      "https://github.com/modelcontextprotocol/typescript-sdk/security/advisories",
    summary:
      "Six Python and four TypeScript advisories between 28 Sep and 5 Oct. OAuth clients could send credentials to an authorization server the MCP server chose, bearer auth accepted tokens issued for another service, HTTP transports followed cross-origin redirects with custom headers, and TypeScript experimental tasks were not tied to their session. Clients and servers built on these SDKs need the patched releases.",
  },
  {
    slug: "openai-mcp-extensions",
    title: "OpenAI open-sources mcp-extensions for ChatGPT plugins",
    publishedAt: "2026-09-29",
    sourceName: "GitHub",
    sourceUrl: "https://github.com/openai/mcp-extensions",
    summary:
      "OpenAI published openai/mcp-extensions: a toolkit to build MCP-based plugins that feel like native, first-class features of ChatGPT.",
  },
  {
    slug: "mcp-roadmap-2026-08",
    title:
      "MCP roadmap: agentic messaging, HTTP-over-stdio, DPoP, progressive discovery",
    publishedAt: "2026-08-22",
    sourceName: "MCP docs",
    sourceUrl: "https://modelcontextprotocol.io/development/roadmap",
    summary:
      "The 22 Aug 2026 cycle lists Tasks plus server-initiated events, HTTP-over-stdio, DPoP and agent identity, and protocol-level progressive discovery. Those are SEPs. Claude Code runs Tasks in public beta since 28 Oct, and OpenCode 2.3 introduced experimental server-initiated events behind a flag; no client on this board implements HTTP-over-stdio, DPoP, or progressive discovery.",
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
      "The Skills Over MCP working group is drafting SEP-2640: SKILL.md directories over skill://, listed with skills/list. OpenAI's plugin Scan Tools imports a bounded snapshot.",
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
      "Present MCP servers as code APIs. The model loads the tools it needs and filters results in a sandbox. Cloudflare called the same idea Code Mode. Claude Code added experimental, opt-in Code Mode in 2.1.323; the 2.1.328 changelog confirms MCP calls from scripts, so the board scores it partial.",
  },
] satisfies readonly NewsItem[];
