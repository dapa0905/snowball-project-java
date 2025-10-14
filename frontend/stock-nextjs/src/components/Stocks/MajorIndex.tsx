"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { TrendingUp, TrendingDown, TrendingFlat } from "@mui/icons-material";
import { MarketSummaryProps, CandleData } from "@/types/global";
import { useCandles } from "@/hooks/useCandles";

const MajorIndex: React.FC<MarketSummaryProps> = ({ ticker, startDate, endDate }) => {
  const { data, loading, error } = useCandles(ticker, startDate, endDate);

  if (loading) {
    return (
      <Card sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <CircularProgress size={40} />
            <Typography variant="body2" sx={{ mt: 1 }}>Loading...</Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Alert severity="error">{error}</Alert>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Alert severity="info">No data available</Alert>
        </CardContent>
      </Card>
    );
  }

  // 데이터 가공
  let label = "";
  let value = "";
  let changeText = "no change";
  let isPositive = true;

  if (data.length < 2) {
    const only = data[0] as CandleData;
    label = `${ticker} (${only.date})`;
    value = only.close.toFixed(2);
    isPositive = true;
  } else {
    const lastDay = data[data.length - 1] as CandleData;
    const prevDay = data[data.length - 2] as CandleData;
    const change = (lastDay.close - prevDay.close).toFixed(2);
    const percent = ((parseFloat(change) / prevDay.close) * 100).toFixed(2);

    label = `${ticker} (${lastDay.date})`;
    value = lastDay.close.toFixed(2);
    changeText = `${parseFloat(change) > 0 ? "+" : ""}${change} (${percent}%)`;
    isPositive = parseFloat(change) > 0;
  }

  const isNeutral = changeText === "no change";

  return (
    <Card
      sx={{
        height: "100%",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {ticker}
          </Typography>
          {isNeutral ? (
            <TrendingFlat color="disabled" />
          ) : isPositive ? (
            <TrendingUp color="success" />
          ) : (
            <TrendingDown color="error" />
          )}
        </Box>

        <Typography variant="h4" component="div" sx={{ fontWeight: "bold", mb: 1 }}>
          ${value}
        </Typography>

        <Chip
          label={changeText}
          color={isNeutral ? "default" : isPositive ? "success" : "error"}
          variant="filled"
          size="small"
          sx={{ fontWeight: "bold" }}
        />

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MajorIndex;