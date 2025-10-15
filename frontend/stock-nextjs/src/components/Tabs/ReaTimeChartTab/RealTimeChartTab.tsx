"use client";

import React, { useState } from "react";
import { Box, ButtonGroup, Button, Typography } from "@mui/material";
import { Timeline } from "@mui/icons-material";
import { useMockList } from "@/hooks/useMockList";
import MockRealTimeCahrtTabTable from "./RealTImeChartTabTable";

const RealTimeChartTab: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("Total");

  const filterOptions = [
    "Total",
    "Trading Value",
    "Trading Volume",
    "Rapid Rise",
    "Rapid Decline",
  ];

  const { data, loading, error } = useMockList();

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
      <MockRealTimeCahrtTabTable data={data} loading={loading} error={error} />
    </Box>
  );
};

export default RealTimeChartTab;
