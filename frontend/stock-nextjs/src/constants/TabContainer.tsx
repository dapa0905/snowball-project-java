"use client";

import React, { useState } from "react";
import { Box, Tabs, Tab, Paper } from "@mui/material";
import { Timeline, TrendingUp, People } from "@mui/icons-material";
import RealTimeChartTab from "@/components/Tabs/RealTimeChartTab";
import TrendingCategoriesTab from "@/components/Tabs/TrendingCategoriesTab";
import DomesticInvestorTrendsTab from "@/components/Tabs/DomesticInvestorTrendsTab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const TabContainer: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs = [
    {
      id: "realtime",
      label: "Real-time Chart",
      icon: <Timeline />,
      component: RealTimeChartTab,
    },
    {
      id: "trending",
      label: "Trending Categories",
      icon: <TrendingUp />,
      component: TrendingCategoriesTab,
    },
    {
      id: "domestic",
      label: "Domestic Investor Trends",
      icon: <People />,
      component: DomesticInvestorTrendsTab,
    },
  ];

  return (
    <Paper sx={{ width: "100%", mt: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="stock analysis tabs"
          variant="fullWidth"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={tab.id}
              icon={tab.icon}
              label={tab.label}
              iconPosition="start"
              sx={{
                minHeight: 60,
                textTransform: "none",
                fontSize: "0.9rem",
              }}
            />
          ))}
        </Tabs>
      </Box>

      {tabs.map((tab, index) => (
        <TabPanel key={tab.id} value={value} index={index}>
          <tab.component />
        </TabPanel>
      ))}
    </Paper>
  );
};

export default TabContainer;
