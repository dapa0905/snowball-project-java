import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { ApiResponse, CandleData } from "@/types/global";

export function useCandles(ticker: string, startDate: string, endDate: string) {
  const [data, setData] = useState<CandleData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let aborted = false;

    async function fetchCandles() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get<ApiResponse>("/api/stocks/candles", {
          params: { ticker, startDate, endDate },
        });
        if (!aborted) setData(res.data?.data ?? []);
      } catch (e) {
        if (!aborted) setError("Failed to load data");
      } finally {
        if (!aborted) setLoading(false);
      }
    }

    fetchCandles();
    return () => {
      aborted = true;
    };
  }, [ticker, startDate, endDate]);

  return { data, loading, error };
}
