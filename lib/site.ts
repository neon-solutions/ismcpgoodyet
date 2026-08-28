import { clients, features, news, status, timeline } from "@/content/site";
import { formatPercent, isGoodYet, matrixScore } from "./score";
import type { Cell, ClientId, FeatureId } from "./types";

function cells(): Cell[] {
  const list: Cell[] = [];
  for (const feature of features) {
    for (const client of clients) {
      list.push(status[feature.id][client.id]);
    }
  }
  return list;
}

export function getSite() {
  const score = matrixScore(cells());
  return {
    clients,
    features,
    news: [...news].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    timeline: [...timeline].sort((a, b) => a.date.localeCompare(b.date)),
    status,
    score,
    percent: formatPercent(score.ratio),
    good: isGoodYet(score.ratio),
  };
}

export function cellAt(featureId: FeatureId, clientId: ClientId): Cell {
  return status[featureId][clientId];
}
