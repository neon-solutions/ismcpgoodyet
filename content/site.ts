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
      status: "no",
      evidenceUrl:
        "https://forum.cursor.com/t/stdio-mcp-oracle-sqlcl-dies-after-parallel-reconnect-and-resource-subscribe-with-failed-to-enqueue-message/166799",
      notes:
        "No public 2026-07-28 claim. Forum reports still show pre-stateless protocol versions.",
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
      status: "partial",
      evidenceUrl: "https://opencode.ai/v2/docs/mcp-servers#protocol-version",
      notes:
        "OpenCode 2.2 adds a per-server protocol: legacy (default), auto, or 2026-07-28. auto probes server/discover and falls back to initialize; 2.2.6 also falls back for stdio servers that ignore the probe. Opt-in pool: true (2.2.6) shares matching connections across directories only on 2026-07-28; an unset protocol then means auto. OpenCode 1 still uses the initialize handshake.",
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
      evidenceUrl: "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
      notes:
        "Public beta in the CLI since 2.1.304. Polls tasks/get, answers input_required through tasks/update, and cancels with tasks/cancel. 2.1.319 moves a task to the background at once and runs Tasks on Bedrock, Vertex, Foundry, and LLM gateways without feature-flag fetching. 2.1.325 makes Esc on a background task question mean answer later; Enter in /tasks reopens it. Polling resumes after a later call reconnects the server. tasks/list and task notifications are unused.",
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
        "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md#21328",
      notes:
        "Experimental and off by default (CLAUDE_CODE_EXPERIMENTAL_CODE_MODE=1). 2.1.328 fixes failed MCP calls in auto/bypass scripts when a server connected during the previous script, and improves MCP prompt caching and server-list notifications. Interactive terminal, Claude subscription or Console, Opus 5.5 / Sonnet 5.5 / Haiku 5.5 / Fable 5.2; not via gateway, Bedrock, Vertex, or Foundry.",
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
      evidenceUrl: "https://cursor.com/blog/dynamic-context-discovery",
      notes:
        "Turn 1 is tool names only. Full descriptions are files in a folder per server; the agent reads or greps them. Not a tool_search API. agent mcp list-tools is a human listing.",
    },
    "claude-code": {
      status: "yes",
      evidenceUrl: "https://github.com/anthropics/claude-code/releases/tag/v2.1.326",
      notes:
        "Tool Search is on by default. Definitions are withheld; the agent gets a summary and loads up to five matches. alwaysLoad keeps a tool in the prompt; alwaysLoad: false on a server defers all its tools (2.1.287). Azure-hosted Foundry and unsupported models load upfront. Gateways default to search since 2.1.304, with fallback if they reject it. 2.1.325 raises tool-search descriptions in new cloud sessions from 4,096 to 16,384 characters, matching other sessions. 2.1.326 fixes exact-name searches loading another MCP server's tool.",
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
        "https://github.com/anomalyco/opencode/blob/v2.2.3/packages/core/src/codemode/catalog.ts",
      notes:
        "Under default Code Mode (2.2) the prompt gets a catalog capped at about 2,000 tokens; search(...) returns signatures for omitted tools. 2.2.7 sends only what changed when servers connect, disconnect, or change tools. Servers with codemode: false still load full schemas.",
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
      evidenceUrl: "https://cursor.com/help/customization/mcp",
      notes:
        "Customize > MCPs toggles a server. Click a tool name in the chat tools list to turn it off. CLI: agent mcp enable|disable and permissions.deny Mcp(server:tool). Team admins can limit a URL server's tools from its detail dialog (Oct 5).",
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
      evidenceUrl: "https://opencode.ai/v2/docs/mcp-servers",
      notes:
        "disabled: true keeps a server configured without connecting it. Permission rules can deny a prefixed MCP tool id. Managed policy mcp.use controls which MCP servers can be used (2.2.3).",
    },
    "factory-droid": {
      status: "yes",
      evidenceUrl: "https://docs.factory.com/harness/mcp",
      notes:
        "disabled: true or /mcp toggles a server without removing it. enabledTools allow list, disabledTools deny list.",
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
      evidenceUrl: "https://cursor.com/docs/mcp",
      notes:
        "Support table lists Apps. Official extension matrix marks Cursor. CLI rendering not documented.",
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
      evidenceUrl: "https://github.com/openai/codex/pull/38089",
      notes:
        "codex mcp login opens a browser; /mcp login <name> does it from the TUI (0.161.0). Remote servers default to auth=oauth. Registration auto prefers CIMD, falls back to DCR. --oauth-client-secret for pre-registered clients (0.158.0). 0.164.0 adds enterprise-managed authorization and requests the resource's scopes, not the authorization server's full list.",
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
        "/mcp or claude mcp login. Discovers CIMD; DCR and pre-configured client id/secret also work. Prompts to re-authenticate when a server asks for more scope mid-call (2.1.288). Agent SDK does not open a browser; pass Authorization.",
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
      evidenceUrl: "https://docs.factory.com/harness/mcp",
      notes:
        "Remote servers sign in from /mcp in a browser. droid mcp auth signs in to enabled, policy-allowed HTTP/SSE servers that need authentication, one at a time. Uses CIMD when supported or DCR. Pre-registered oauth.clientId/clientSecret require authorizationServerIssuer. Tokens in the system keyring or a fallback file. Adding a server from a session on another computer signs in through your browser (1.3.0).",
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
    date: "2026-11-11",
    title: "MCP moves to two spec releases a year",
    href: "https://blog.modelcontextprotocol.io/posts/mcp-release-cycle/",
  },
] satisfies readonly TimelineEvent[];

export const news = [
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
      "Behind the mcp_events flag, OpenCode lists and streams events from servers that offer the draft io.modelcontextprotocol/events extension (SEP-3415, still an open PR), and a watch_mcp_event tool wakes a session when one arrives. It is the first client on this board with server-initiated events.",
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
      "The 22 Aug 2026 cycle lists Tasks plus server-initiated events, HTTP-over-stdio, DPoP and agent identity, and protocol-level progressive discovery. Those are SEPs. Claude Code runs Tasks in public beta since 28 Oct, and OpenCode 2.3 has experimental server-initiated events behind a flag; no client on this board implements HTTP-over-stdio, DPoP, or progressive discovery.",
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
      "Present MCP servers as code APIs. The model loads the tools it needs and filters results in a sandbox. Cloudflare called the same idea Code Mode. Claude Code added experimental, opt-in Code Mode in 2.1.323; the 2.1.328 changelog confirms MCP calls from scripts, so the board scores it partial.",
  },
] satisfies readonly NewsItem[];
