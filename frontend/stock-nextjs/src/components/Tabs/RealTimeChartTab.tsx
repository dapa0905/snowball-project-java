"use client";

import React, { useState } from "react";
import {
  Box,
  ButtonGroup,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  LinearProgress,
  Chip,
} from "@mui/material";
import { TrendingUp, TrendingDown, Timeline, } from "@mui/icons-material";

interface StockData {
  rank: number;
  name: string;
  currentPrice: string;
  rateOfChange: string;
  tradingValue: string;
  volumeRatio: number;
}

const RealTimeChartTab: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("Total");

  const filterOptions = [
    "Total",
    "Trading Value",
    "Trading Volume",
    "Rapid Rise",
    "Rapid Decline",
  ];

  // Mock 데이터
  const stockData: StockData[] = [
    {
      rank: 1,
      name: "Apple Inc.",
      currentPrice: "150.25",
      rateOfChange: "+2.35%",
      tradingValue: "6,298만원",
      volumeRatio: 85,
    },
    {
      rank: 2,
      name: "Tesla Inc.",
      currentPrice: "245.80",
      rateOfChange: "-1.25%",
      tradingValue: "4,521만원",
      volumeRatio: 72,
    },
    {
      rank: 3,
      name: "Microsoft Corp.",
      currentPrice: "312.45",
      rateOfChange: "+0.85%",
      tradingValue: "3,987만원",
      volumeRatio: 68,
    },
    {
      rank: 4,
      name: "NVIDIA Corp.",
      currentPrice: "425.30",
      rateOfChange: "+3.15%",
      tradingValue: "5,234만원",
      volumeRatio: 92,
    },
    {
      rank: 5,
      name: "Amazon.com Inc.",
      currentPrice: "128.75",
      rateOfChange: "-0.45%",
      tradingValue: "2,876만원",
      volumeRatio: 45,
    },
  ];

  const getChangeColor = (change: string) => {
    return change.startsWith("+") ? "success" : "error";
  };

  const getChangeIcon = (change: string) => {
    return change.startsWith("+") ? <TrendingUp /> : <TrendingDown />;
  };

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Timeline sx={{ mr: 1 }} />
        Real-time Stock Data
      </Typography>

      {/* 필터 버튼 */}
      <Box sx={{ mb: 3 }}>
        <ButtonGroup variant="outlined" aria-label="filter options">
          {filterOptions.map((option) => (
            <Button
              key={option}
              variant={activeFilter === option ? "contained" : "outlined"}
              onClick={() => setActiveFilter(option)}
              size="small"
            >
              {option}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {/* 주식 데이터 테이블 */}
      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="stock data table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Rank
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Stock Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Current Price
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Rate of Change
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Trading Value
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Volume Ratio
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stockData.map((stock) => (
              <TableRow
                key={stock.rank}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "action.hover" },
                }}
              >
                <TableCell component="th" scope="row">
                  <Chip
                    label={stock.rank}
                    color="primary"
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>{stock.name}</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  ${stock.currentPrice}
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getChangeIcon(stock.rateOfChange)}
                    label={stock.rateOfChange}
                    color={getChangeColor(stock.rateOfChange)}
                    size="small"
                    variant="filled"
                  />
                </TableCell>
                <TableCell>{stock.tradingValue}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={stock.volumeRatio}
                      sx={{
                        width: "100%",
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "grey.200",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor:
                            stock.volumeRatio > 70
                              ? "error.main"
                              : "success.main",
                        },
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {stock.volumeRatio}%
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RealTimeChartTab;
