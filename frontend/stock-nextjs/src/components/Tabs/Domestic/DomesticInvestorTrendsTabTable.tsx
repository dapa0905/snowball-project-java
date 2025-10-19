import { MockTickerDataWithTrends } from "@/types/global";
import {
  Assessment,
  People,
  Psychology,
  TrendingDown,
  TrendingUp,
} from "@mui/icons-material";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
} from "@mui/material";

interface DomesticInvestorTrendsTabTableProps {
  data: MockTickerDataWithTrends[] | null;
  loading: boolean;
  error: string | null;
}

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

const DomesticInvestorTrendsTabTable: React.FC<
  DomesticInvestorTrendsTabTableProps
> = ({ data, loading, error }) => {
  if (!data || data.length === 0) return null;
  const trends = data[0].trend;

  return (
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
          {trends.map((trend, idx) => (
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
                    color: trend.trend === "up" ? "success.main" : "error.main",
                  }}
                >
                  {trend.netBuy}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={`${trend.percentage > 0 ? "+" : ""}${trend.percentage}%`}
                  color={getTrendColor(trend.trend as "up" | "down")}
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
                  icon={getTrendIcon(trend.trend as "up" | "down")}
                  label={trend.trend === "up" ? "↗" : "↘"}
                  color={getTrendColor(trend.trend as "up" | "down")}
                  size="small"
                  variant="filled"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DomesticInvestorTrendsTabTable;
