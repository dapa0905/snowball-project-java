import React from "react";
import MarketSummary from "./MajorIndex";
import MarketStatus from "./MarketStatus";
import TabContainer from "./tabs/TabContainer";

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

      <TabContainer />
    </div>
  );
}

export default MainPage;
