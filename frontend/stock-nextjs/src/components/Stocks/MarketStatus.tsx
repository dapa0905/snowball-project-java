"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Chip } from "@mui/material";
import { Circle } from "@mui/icons-material";

type MarketStatusType =
  | "Regular trading"
  | "Pre-market trading"
  | "After-hours trading"
  | "Market close";

const MarketStatus: React.FC = () => {
  const [domesticStatus, setDomesticStatus] =
    useState<MarketStatusType>("Market close");
  const [usStatus, setUsStatus] = useState<MarketStatusType>("Market close");

  useEffect(() => {
    const now = new Date();
    const koreaHour = now.getHours();
    const koreaMinute = now.getMinutes();
    const koreaTime = koreaHour * 60 + koreaMinute;

    // Korean stock market
    if (koreaTime >= 540 && koreaTime <= 930) {
      setDomesticStatus("Regular trading");
    } else {
      setDomesticStatus("Market close");
    }

    // American stock market
    const usTime = koreaTime;
    if (usTime >= 1020 && usTime < 1350) {
      setUsStatus("Pre-market trading");
    } else if (usTime >= 1350 || usTime < 300) {
      setUsStatus("Regular trading");
    } else if (usTime >= 300 && usTime < 540) {
      setUsStatus("After-hours trading");
    } else {
      setUsStatus("Market close");
    }
  }, []);

  const isActive = (status: MarketStatusType): boolean =>
    status !== "Market close";

  const getStatusColor = (status: MarketStatusType) => {
    if (status === "Market close") return "default";
    if (status === "Regular trading") return "success";
    if (status === "Pre-market trading") return "warning";
    return "info";
  };

  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      <Chip
        icon={
          isActive(domesticStatus) ? <Circle sx={{ fontSize: 8 }} /> : undefined
        }
        label={`Korean Market: ${domesticStatus}`}
        color={getStatusColor(domesticStatus)}
        variant="outlined"
        size="small"
      />
      <Chip
        icon={isActive(usStatus) ? <Circle sx={{ fontSize: 8 }} /> : undefined}
        label={`US Market: ${usStatus}`}
        color={getStatusColor(usStatus)}
        variant="outlined"
        size="small"
      />
    </Box>
  );
};

export default MarketStatus;
