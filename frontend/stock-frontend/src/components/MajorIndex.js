import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/MajorIndex.css";

const MarketSummary = ({ ticker, startDate, endDate }) => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandleDate = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "http://localhost:8080/api/stocks/candles",
          {
            params: {
              ticker,
              startDate,
              endDate,
            },
          }
        );

        const raw = response.data;
        const data = raw.data;

        if (!Array.isArray(data) || data.length < 1) {
          setMarketData([]);
          return;
        }

        if (data.length < 2) {
          console.warn("데이터 한 개만 있음, 변화량 계산 불가");
          const only = data[0];
          setMarketData([
            {
              label: `${ticker} (${only.date})`,
              value: only.close.toFixed(2),
              change: "변화 없음",
              isPositive: true,
            },
          ]);
          return;
        }

        const lastDay = data[data.length - 1];
        const prevDay = data[data.length - 2];
        const change = (lastDay.close - prevDay.close).toFixed(2);
        const percent = ((change / prevDay.close) * 100).toFixed(2);

        setMarketData([
          {
            label: `${ticker} (${lastDay.date})`,
            value: lastDay.close.toFixed(2),
            change: `${change > 0 ? "+" : ""}${change} (${percent}%)`,
            isPositive: change > 0,
          },
        ]);
      } catch (error) {
        console.error("데이터 요청 실패", error);
        setError("데이터 요청 실패");
      } finally {
        setLoading(false);
      }
    };

    fetchCandleDate();
  }, [ticker, startDate, endDate]);

  if (loading) return <div className="market-card">로딩 중...</div>;
  if (error) return <div className="market-card text-danger">{error}</div>;
  if (marketData.length === 0)
    return <div className="market-card">데이터 없음</div>;

  return (
    <div className="market-card">
      <div className="market-label">{marketData[0].label}</div>
      <div className="market-value">{marketData[0].value} USD</div>
      <div
        className={
          marketData[0].isPositive ? "market-change up" : "market-change down"
        }
      >
        {marketData[0].change}
      </div>
    </div>
  );
};

export default MarketSummary;
