import { cellAt, getSite } from "@/lib/site";
import type { Support } from "@/lib/types";

function supportLabel(status: Support): string {
  switch (status) {
    case "yes":
      return "Yes";
    case "partial":
      return "Partial";
    case "no":
      return "No";
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

export default function Home() {
  const site = getSite();
  const barWidth = `${Math.round(site.score.ratio * 100)}%`;

  return (
    <div className="mx-auto max-w-screen-2xl px-6 py-16">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight">
          Is MCP good yet?
        </h1>
        <p className="mt-6 text-6xl font-semibold tracking-tight">
          {site.good ? "Yes" : "No"}
        </p>
        <p className="mt-6 text-lg text-neutral-700">
          {site.percent} of the scoreboard.
        </p>
        <div
          className="mt-4 h-3 w-full border border-neutral-900"
          aria-hidden="true"
        >
          <div className="h-full bg-neutral-900" style={{ width: barWidth }} />
        </div>
        <p className="mt-8 text-base text-neutral-700">
          Codex, Cursor, Claude Code, Grok, OpenCode, and Factory Droid.
          Partial means opt-in, a subset, or experimental. Click a cell for the
          source.
        </p>
      </header>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">Scoreboard</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[80rem] table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-36 sm:w-52" />
              {site.clients.map((client) => (
                <col key={client.id} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th className="sticky left-0 z-10 border-b border-neutral-900 bg-white py-3 pr-4 font-semibold sm:pr-6">
                  Feature
                </th>
                {site.clients.map((client) => (
                  <th
                    key={client.id}
                    className="border-b border-neutral-900 py-3 px-4 font-semibold"
                  >
                    <a href={client.docsUrl} className="underline">
                      {client.name}
                    </a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {site.features.map((feature) => (
                <tr key={feature.id}>
                  <th className="sticky left-0 z-10 border-b border-neutral-200 bg-white py-5 pr-4 align-top sm:pr-6 font-semibold">
                    {feature.specUrl ? (
                      <a href={feature.specUrl} className="underline">
                        {feature.name}
                      </a>
                    ) : (
                      feature.name
                    )}
                    <p className="mt-2 text-sm leading-6 font-normal text-neutral-600">
                      {feature.summary}
                    </p>
                  </th>
                  {site.clients.map((client) => {
                    const cell = cellAt(feature.id, client.id);
                    const label = supportLabel(cell.status);
                    return (
                      <td
                        key={client.id}
                        className="border-b border-neutral-200 py-5 px-4 align-top"
                      >
                        <p className="font-semibold">
                          {cell.evidenceUrl ? (
                            <a href={cell.evidenceUrl} className="underline">
                              {label}
                            </a>
                          ) : (
                            label
                          )}
                        </p>
                        {cell.notes ? (
                          <p className="mt-2 text-[13px] leading-5 break-words text-neutral-600">
                            {cell.notes}
                          </p>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-16 max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight">Timeline</h2>
        <ol className="mt-6">
          {site.timeline.map((event) => (
            <li key={`${event.date}-${event.title}`} className="mt-4 first:mt-0">
              <h3 className="text-base font-semibold">
                {event.href ? (
                  <a href={event.href} className="underline">
                    {event.title}
                  </a>
                ) : (
                  event.title
                )}
              </h3>
              <p className="mt-1 text-neutral-600">{event.date}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight">News</h2>
        <ol className="mt-6">
          {site.news.map((item) => (
            <li key={item.slug} className="mt-8 first:mt-0">
              <h3 className="text-xl font-semibold tracking-tight">
                <a href={item.sourceUrl} className="underline">
                  {item.title}
                </a>
              </h3>
              <p className="mt-1 text-neutral-600">
                {item.publishedAt} · {item.sourceName}
              </p>
              <p className="mt-2 text-neutral-700">{item.summary}</p>
            </li>
          ))}
        </ol>
      </section>

      <footer className="mt-20 border-t border-neutral-200 pt-6 text-sm text-neutral-600">
        ismcpgoodyet.com. Labs under neon-solutions. Cells cite docs or source.
      </footer>
    </div>
  );
}
