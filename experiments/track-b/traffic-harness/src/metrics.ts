export const calculateSuccessRate = (
  successCount: number,
  totalCount: number,
): number => {
  if (totalCount <= 0) return 0;
  return Number(((successCount / totalCount) * 100).toFixed(2));
};

export const percentile = (samples: number[], target: number): number => {
  if (samples.length === 0) return 0;
  const sorted = [...samples].sort((left, right) => left - right);
  const rank = Math.ceil((target / 100) * sorted.length);
  const index = Math.min(sorted.length - 1, Math.max(0, rank - 1));
  return Number(sorted[index]?.toFixed(2) ?? 0);
};
