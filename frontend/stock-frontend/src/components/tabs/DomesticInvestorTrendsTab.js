import React from 'react';

const DomesticInvestorTrendsTab = () => {
  // 국내 투자자 트렌드 데이터
  const trends = [
    { type: "Individual Investors", netBuy: "1,234억원", trend: "up" },
    { type: "Institutional Investors", netBuy: "-567억원", trend: "down" },
    { type: "Foreign Investors", netBuy: "890억원", trend: "up" }
  ];

  return (
    <div>
      <h4>Domestic Investor Trends</h4>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Investor Type</th>
              <th>Net Buy/Sell</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {trends.map((trend, idx) => (
              <tr key={idx}>
                <td>{trend.type}</td>
                <td className={trend.trend === 'up' ? 'text-success' : 'text-danger'}>
                  {trend.netBuy}
                </td>
                <td>
                  <span className={`badge ${trend.trend === 'up' ? 'bg-success' : 'bg-danger'}`}>
                    {trend.trend === 'up' ? '↑' : '↓'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DomesticInvestorTrendsTab;