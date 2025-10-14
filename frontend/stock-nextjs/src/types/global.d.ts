export interface CandleData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ApiResponse {
  data: CandleData[];
}

export interface MarketSummaryProps {
  ticker: string;
  startDate: string;
  endDate: string;
}

export interface MarketData {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}
