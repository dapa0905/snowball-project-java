import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function StockChart({ ticker, startDate, endDate }) {
  const [candles, setCandles] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/stocks/candles', {
        params: {
          ticker,
          startDate,
          endDate
        }
      })
      .then((res) => {
        setCandles(res.data.data);
      })
      .catch((err) => {
        console.error('Error fetching data', err);
      });
  }, [ticker, startDate, endDate]);

  const chartData = {
    labels: candles.map((c) => new Date(c.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: `${ticker} Close Price`,
        data: candles.map((c) => c.close),
        borderColor: 'blue',
        fill: false,
        tension: 0.1
      }
    ]
  };

  return (
    <div>
      <h2>{ticker} 차트</h2>
      <Line data={chartData} />
    </div>
  );
}

export default StockChart;
