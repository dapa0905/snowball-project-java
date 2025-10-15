import { useMemo } from "react";

export function useRankedData<T>(
  data: T[] | null,
  compareFn: (a: T, b: T) => number
) {
  return useMemo(() => {
    if (!data) return [];
    return [...data]
      .sort(compareFn)
      .map((item, index) => ({ ...item, rank: index + 1 }));
  }, [data, compareFn]);
}
