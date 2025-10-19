"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Alert,
} from "@mui/material";
import {
  TrendingUp,
  People,
  Assessment,
  Psychology,
} from "@mui/icons-material";
import DomesticInvestorTrendsTabTable from "./DomesticInvestorTrendsTabTable";
import { useMockList } from "@/hooks/useMockList";
import { MockTickerDataWithTrends } from "@/types/global";

const DomesticInvestorTrendsTab: React.FC = () => {
  const { data, loading, error } = useMockList();
  const [selectedTicker, setSelectedTicker] = useState<string>("AAPL");

  // data에서 ticker 목록을 추출
  const tickerData =
    data?.map((item) => ({
      ticker: item.symbol,
      name: item.name,
    })) || [];

  // 선택된 티커의 전체 데이터
  const currentData = data?.find((item) => item.symbol === selectedTicker);

  const calculateTotalNetBuy = (): number => {
    if (
      !currentData ||
      typeof currentData !== "object" ||
      !("trends" in currentData) ||
      !Array.isArray((currentData as any).trends)
    ) {
      return 0;
    }
    return (currentData as { trends: unknown[] }).trends.reduce(
      (sum: number, trend: any) => {
        const netBuyStr =
          typeof trend?.netBuy === "string" ? trend.netBuy : "0";
        const number = parseFloat(netBuyStr.replace(/[^0-9.-]/g, ""));
        return sum + (isNaN(number) ? 0 : number);
      },
      0
    );
  };

  const getMostActiveInvestor = () => {
    if (
      !currentData ||
      typeof currentData !== "object" ||
      !("trends" in currentData) ||
      !Array.isArray((currentData as any).trends)
    ) {
      return { type: "-", volume: "-" };
    }
    // We need to ensure type safety for trends
    type Trend = { type: string; volume: string };
    const trends = (currentData as { trends: Trend[] }).trends;
    if (trends.length === 0) {
      return { type: "-", volume: "-" };
    }
    return trends.reduce((max: Trend, cur: Trend) => {
      const curVolume = parseFloat(cur.volume.replace(/[^0-9.]/g, ""));
      const maxVolume = parseFloat(max.volume.replace(/[^0-9.]/g, ""));
      return curVolume > maxVolume ? cur : max;
    }, trends[0]);
  };

  const getMarketSentiment = (): "Bullish" | "Bearish" | "Neutral" => {
    const total = calculateTotalNetBuy();
    if (total > 0) return "Bullish";
    if (total < 0) return "Bearish";
    return "Neutral";
  };

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center" }}
      >
        <People sx={{ mr: 1 }} />
        Domestic Investor Trends Analysis
      </Typography>

      {/* 티커 선택 */}
      <Box sx={{ mb: 3, minWidth: 200 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="ticker-select-label">Select Ticker</InputLabel>
          <Select
            labelId="ticker-select-label"
            value={selectedTicker}
            label="Select Ticker"
            onChange={(e) => setSelectedTicker(e.target.value)}
          >
            {tickerData.map((data) => (
              <MenuItem key={data.ticker} value={data.ticker}>
                {data.ticker} - {data.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* 현재 선택된 티커 정보 */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        </Typography>
        <Typography variant="body2">
        </Typography>
      </Alert>
      {/* 투자자 트렌드 테이블 */}
      <DomesticInvestorTrendsTabTable
        data={data as MockTickerDataWithTrends[]}
        loading={loading}
        error={error}
      />
      {/* 요약 정보 카드들 */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                <TrendingUp sx={{ mr: 1 }} />
                Total Net Buy
              </Typography>
              <Typography
                variant="h4"
                color="primary"
                sx={{ fontWeight: "bold" }}
              >
                {calculateTotalNetBuy().toFixed(0)}억원
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Overall market sentiment
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Assessment sx={{ mr: 1 }} />
                Most Active
              </Typography>
              <Typography
                variant="h5"
                color="info.main"
                sx={{ fontWeight: "bold" }}
              >
                {getMostActiveInvestor().type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Volume: {getMostActiveInvestor().volume}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Psychology sx={{ mr: 1 }} />
                Market Sentiment
              </Typography>
              <Typography
                variant="h4"
                color={
                  getMarketSentiment() === "Bullish"
                    ? "success.main"
                    : "error.main"
                }
                sx={{ fontWeight: "bold" }}
              >
                {getMarketSentiment()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Based on investor trends
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DomesticInvestorTrendsTab;
