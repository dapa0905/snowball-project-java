import React, { useState } from "react";

const RealTimeChartTab = () => {
  const [activeFilter, setActiveFilter] = useState("Total");

  const filterOptions = [
    "Total",
    "Trading Value",
    "Trading Volume",
    "Rapid Rise",
    "Rapid Decline",
  ];

  // 실시간 차트 데이터 (API 연동 예정)
  const stockData = [
    {
      rank: 1,
      name: "lemon",
      currentPrice: "78,595원",
      rateOfChange: "-0.35%",
      tradingValue: "6,298만원",
      volumeRatio: 30,
    },
    // ... 더 많은 데이터
  ];

  return (
    <div>
      <div className="btn-group mb-3">
        {filterOptions.map((option, idx) => (
          <button
            key={idx}
            type="button"
            className={`btn btn-outline-secondary ${
              activeFilter === option ? "active" : ""
            }`}
            onClick={() => setActiveFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Stock Name</th>
            <th>Current Price</th>
            <th>Rate of Change</th>
            <th>Trading Value</th>
            <th>Trading Volume Ratio</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((stock, idx) => (
            <tr key={idx}>
              <td>{stock.rank}</td>
              <td>{stock.name}</td>
              <td>{stock.currentPrice}</td>
              <td className="text-primary">{stock.rateOfChange}</td>
              <td>{stock.tradingValue}</td>
              <td>
                <div className="progress" style={{ height: "10px" }}>
                  <div
                    className="progress-bar bg-danger"
                    style={{ width: `${stock.volumeRatio}%` }}
                  ></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RealTimeChartTab;
