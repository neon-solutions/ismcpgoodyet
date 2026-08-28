import type { Cell, Support } from "./types";

export const YES_THRESHOLD = 0.8;

export function cellScore(status: Support): number {
  switch (status) {
    case "yes":
      return 1;
    case "partial":
      return 0.5;
    case "no":
      return 0;
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

export function matrixScore(cells: readonly Cell[]): {
  filled: number;
  total: number;
  ratio: number;
} {
  const total = cells.length;
  const filled = cells.reduce((sum, cell) => sum + cellScore(cell.status), 0);
  return {
    filled,
    total,
    ratio: total === 0 ? 0 : filled / total,
  };
}

export function isGoodYet(ratio: number): boolean {
  return ratio >= YES_THRESHOLD;
}

export function formatPercent(ratio: number): string {
  return `${Math.round(ratio * 100)}%`;
}
