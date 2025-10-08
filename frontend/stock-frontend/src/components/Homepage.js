import React from "react";
import MarketSummary from "./MajorIndex";
import MarketStatus from "./MarketStatus";

function MainPage() {
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  const twoDaysAgo = new Date(Date.now() - 86400000 * 2)
    .toISOString()
    .split("T")[0];
  const tickers = ["VOO", "QQQ", "UUP", "DIA"];

  return (
    <div className="container mt-4">
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3">PayToWin</h1>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <a href="#" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                News
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Stocks
              </a>
            </li>
          </ul>
        </nav>
        <button className="btn btn-primary ms-auto">Login</button>
      </header>

      <section className="mb-4">
        <div className="d-flex align-items-center mb-2">
          <MarketStatus></MarketStatus>
        </div>

        <div
          style={{ display: "flex", overflowX: "auto", paddingBottom: "8px" }}
        >
          {tickers.map((ticker) => (
            <MarketSummary
              key={ticker}
              ticker={ticker}
              startDate={twoDaysAgo}
              endDate={yesterday}
            />
          ))}
        </div>
      </section>

      <nav className="nav nav-tabs mb-3">
        <a className="nav-link active" href="#">
          Real-time Chart
        </a>
        <a className="nav-link" href="#">
          Trending Categories
        </a>
        <a className="nav-link" href="#">
          Domestic Investor Trends
        </a>
      </nav>

      <section>
        <div className="btn-group mb-3">
          {[
            "Total",
            "Trading Value",
            "Trading Volume",
            "Rapid Rise",
            "Rapid Decline",
          ].map((tab, idx) => (
            <button
              type="button"
              className={`btn btn-outline-secondary ${
                idx === 0 ? "active" : ""
              }`}
              key={idx}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 실제 주식 데이터 테이블 자리 */}
        <table className="table table-hover">
          <thead>
            <tr>
              <th>순위</th>
              <th>종목명</th>
              <th>현재가</th>
              <th>등락률</th>
              <th>거래대금</th>
              <th>거래비율</th>
            </tr>
          </thead>
          <tbody>
            {/* 여기 데이터 map 돌려서 넣으면 됨 */}
            <tr>
              <td>1</td>
              <td>레모네이드</td>
              <td>78,595원</td>
              <td className="text-primary">-0.35%</td>
              <td>6,298만원</td>
              <td>
                <div className="progress" style={{ height: "10px" }}>
                  <div
                    className="progress-bar bg-danger"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </td>
            </tr>
            {/* 예시 한 줄 */}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default MainPage;
