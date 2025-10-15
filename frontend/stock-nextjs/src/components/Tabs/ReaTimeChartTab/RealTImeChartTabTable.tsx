import { useRankedData } from "@/hooks/useRankedData";
import { MockTickerData } from "@/types/global";
import { TrendingDown, TrendingUp } from "@mui/icons-material";
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
  LinearProgress,
  Chip,
} from "@mui/material";

interface MockRealTimeCahrtTabTableProps {
  data: MockTickerData[] | null;
  loading: boolean;
  error: string | null;
}

const getChangeColor = (change: string) => {
  return change.startsWith("+") ? "success" : "error";
};

const getChangeIcon = (change: string) => {
  return change.startsWith("+") ? <TrendingUp /> : <TrendingDown />;
};

const MockRealTimeCahrtTabTable: React.FC<MockRealTimeCahrtTabTableProps> = ({
  data,
  loading,
  error,
}) => {
  const rankedData = useRankedData(
    data,
    (a, b) => parseFloat(b.currentPrice) - parseFloat(a.currentPrice)
  );
  return (
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
          {rankedData.map((stock) => (
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
          )) ?? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                {loading ? "Loading..." : "No data available"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MockRealTimeCahrtTabTable;