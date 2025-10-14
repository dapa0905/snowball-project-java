"use client";

import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
} from "@mui/material";
import { TrendingUp, TrendingDown, Category } from "@mui/icons-material";

interface CategoryData {
  name: string;
  trend: "up" | "down";
  percentage: string;
  marketCap: string;
  volume: number;
  description: string;
}

const TrendingCategoriesTab: React.FC = () => {
  const categories: CategoryData[] = [
    {
      name: "Technology",
      trend: "up",
      percentage: "+2.5%",
      marketCap: "$12.5T",
      volume: 85,
      description: "AI, Cloud Computing, Software",
    },
    {
      name: "Healthcare",
      trend: "down",
      percentage: "-1.2%",
      marketCap: "$4.2T",
      volume: 45,
      description: "Biotech, Pharmaceuticals, Medical Devices",
    },
    {
      name: "Finance",
      trend: "up",
      percentage: "+0.8%",
      marketCap: "$8.7T",
      volume: 62,
      description: "Banking, Insurance, Fintech",
    },
    {
      name: "Energy",
      trend: "up",
      percentage: "+1.9%",
      marketCap: "$3.1T",
      volume: 78,
      description: "Oil, Gas, Renewable Energy",
    },
    {
      name: "Consumer Goods",
      trend: "down",
      percentage: "-0.5%",
      marketCap: "$5.8T",
      volume: 38,
      description: "Retail, Food, Beverages",
    },
    {
      name: "Automotive",
      trend: "up",
      percentage: "+3.2%",
      marketCap: "$2.3T",
      volume: 91,
      description: "EV, Autonomous Vehicles, Parts",
    },
  ];

  const getTrendColor = (trend: "up" | "down") => {
    return trend === "up" ? "success" : "error";
  };

  const getTrendIcon = (trend: "up" | "down") => {
    return trend === "up" ? <TrendingUp /> : <TrendingDown />;
  };

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Category sx={{ mr: 1 }} />
        Trending Market Categories
      </Typography>

      <Grid container spacing={3}>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                transition:
                  "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {category.name}
                  </Typography>
                  <Chip
                    icon={getTrendIcon(category.trend)}
                    label={category.percentage}
                    color={getTrendColor(category.trend)}
                    size="small"
                    variant="filled"
                  />
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {category.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Market Cap: {category.marketCap}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Trading Volume
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={category.volume}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "grey.200",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor:
                          category.volume > 70
                            ? "success.main"
                            : "warning.main",
                      },
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {category.volume}%
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TrendingCategoriesTab;
