"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Card,
  CardContent,
  Grid,
  Alert,
  LinearProgress,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  People,
  Assessment,
  Psychology,
} from "@mui/icons-material";
import { TickerInvestorData, InvestorTrend } from "@/types/global";

const DomesticInvestorTrendsTab: React.FC = () => {
  const [selectedTicker, setSelectedTicker] = useState<string>("AAPL");

  // Mock 데이터 - 실제 티커들에 대한 투자자 트렌드
  const tickerData: TickerInvestorData[] = [
    {
      ticker: "AAPL",
      name: "Apple Inc.",
      lastUpdated: "2024-01-15 15:30:00",
      trends: [
        {
          type: "Individual Investors",
          netBuy: "1,234억원",
          trend: "up",
          percentage: 12.5,
          volume: "45.2M",
        },
        {
          type: "Institutional Investors",
          netBuy: "-567억원",
          trend: "down",
          percentage: -8.3,
          volume: "23.1M",
        },
        {
          type: "Foreign Investors",
          netBuy: "890억원",
          trend: "up",
          percentage: 15.7,
          volume: "67.8M",
        },
      ],
    },
    {
      ticker: "TSLA",
      name: "Tesla Inc.",
      lastUpdated: "2024-01-15 15:30:00",
      trends: [
        {
          type: "Individual Investors",
          netBuy: "2,156억원",
          trend: "up",
          percentage: 18.2,
          volume: "78.9M",
        },
        {
          type: "Institutional Investors",
          netBuy: "-1,234억원",
          trend: "down",
          percentage: -12.1,
          volume: "34.5M",
        },
        {
          type: "Foreign Investors",
          netBuy: "1,567억원",
          trend: "up",
          percentage: 22.3,
          volume: "89.2M",
        },
      ],
    },
    {
      ticker: "MSFT",
      name: "Microsoft Corporation",
      lastUpdated: "2024-01-15 15:30:00",
      trends: [
        {
          type: "Individual Investors",
          netBuy: "987억원",
          trend: "up",
          percentage: 9.8,
          volume: "32.1M",
        },
        {
          type: "Institutional Investors",
          netBuy: "1,456억원",
          trend: "up",
          percentage: 14.2,
          volume: "56.7M",
        },
        {
          type: "Foreign Investors",
          netBuy: "-234억원",
          trend: "down",
          percentage: -3.1,
          volume: "23.4M",
        },
      ],
    },
    {
      ticker: "NVDA",
      name: "NVIDIA Corporation",
      lastUpdated: "2024-01-15 15:30:00",
      trends: [
        {
          type: "Individual Investors",
          netBuy: "3,456억원",
          trend: "up",
          percentage: 25.6,
          volume: "123.4M",
        },
        {
          type: "Institutional Investors",
          netBuy: "2,789억원",
          trend: "up",
          percentage: 19.8,
          volume: "98.7M",
        },
        {
          type: "Foreign Investors",
          netBuy: "1,234억원",
          trend: "up",
          percentage: 16.5,
          volume: "67.8M",
        },
      ],
    },
    {
      ticker: "GOOGL",
      name: "Alphabet Inc.",
      lastUpdated: "2024-01-15 15:30:00",
      trends: [
        {
          type: "Individual Investors",
          netBuy: "1,567억원",
          trend: "up",
          percentage: 11.2,
          volume: "45.6M",
        },
        {
          type: "Institutional Investors",
          netBuy: "-890억원",
          trend: "down",
          percentage: -6.7,
          volume: "28.9M",
        },
        {
          type: "Foreign Investors",
          netBuy: "2,345억원",
          trend: "up",
          percentage: 18.9,
          volume: "78.3M",
        },
      ],
    },
  ];

  const currentData =
    tickerData.find((data) => data.ticker === selectedTicker) || tickerData[0];

  const getTrendColor = (trend: "up" | "down") => {
    return trend === "up" ? "success" : "error";
  };

  const getTrendIcon = (trend: "up" | "down") => {
    return trend === "up" ? <TrendingUp /> : <TrendingDown />;
  };

  const getInvestorIcon = (type: string) => {
    switch (type) {
      case "Individual Investors":
        return <People />;
      case "Institutional Investors":
        return <Assessment />;
      case "Foreign Investors":
        return <Psychology />;
      default:
        return <People />;
    }
  };

  const calculateTotalNetBuy = () => {
    return currentData.trends.reduce((sum, trend) => {
      const value = parseFloat(trend.netBuy.replace(/[^\d.-]/g, ""));
      return sum + (trend.trend === "up" ? value : -value);
    }, 0);
  };

  const getMostActiveInvestor = () => {
    return currentData.trends.reduce((max, trend) =>
      parseFloat(trend.volume.replace(/[^\d.]/g, "")) >
      parseFloat(max.volume.replace(/[^\d.]/g, ""))
        ? trend
        : max
    );
  };

  const getMarketSentiment = () => {
    const upCount = currentData.trends.filter(
      (trend) => trend.trend === "up"
    ).length;
    const downCount = currentData.trends.filter(
      (trend) => trend.trend === "down"
    ).length;
    return upCount > downCount ? "Bullish" : "Bearish";
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
          {currentData.ticker} - {currentData.name}
        </Typography>
        <Typography variant="body2">
          Last updated: {currentData.lastUpdated}
        </Typography>
      </Alert>

      {/* 투자자 트렌드 테이블 */}
      <TableContainer component={Paper} sx={{ mb: 3, boxShadow: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="investor trends table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Investor Type
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Net Buy/Sell
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Change %
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Volume
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Trend
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.trends.map((trend, idx) => (
              <TableRow
                key={idx}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "action.hover" },
                }}
              >
                <TableCell component="th" scope="row">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {getInvestorIcon(trend.type)}
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {trend.type}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      color:
                        trend.trend === "up" ? "success.main" : "error.main",
                    }}
                  >
                    {trend.netBuy}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={`${trend.percentage > 0 ? "+" : ""}${trend.percentage}%`}
                    color={getTrendColor(trend.trend)}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {trend.volume}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getTrendIcon(trend.trend)}
                    label={trend.trend === "up" ? "↗" : "↘"}
                    color={getTrendColor(trend.trend)}
                    size="small"
                    variant="filled"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
