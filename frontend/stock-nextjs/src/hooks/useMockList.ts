import { MockApiResponse, MockTickerData } from "@/types/global";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

export function useMockList() {
  const [data, setData] = useState<MockTickerData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let aborted = false;
    async function fetchMockTickerData() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get<MockApiResponse>("/api/stocks/mocklist");
        if (!aborted) setData(res.data?.data ?? []);
      } catch (e) {
        if (!aborted) setError("Failed to load data");
      } finally {
        if (!aborted) setLoading(false);
      }
    }
    fetchMockTickerData();
    return () => {
      aborted = true;
    };
  }, []);

  return { data, loading, error };
}
