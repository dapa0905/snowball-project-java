import React, { useState } from "react";
import RealTimeChartTab from "./RealTimeChartTap";
import TrendingCategoriesTab from "./TrendingCategoriesTab";
import DomesticInvestorTrendsTab from "./DomesticInvestorTrendsTab";


const TabContainer = () => {
  const [activeTab, setActiveTab] = useState("realtime");

  const tabs = [
    { id: "realtime", label: "Real-time Chart", component: RealTimeChartTab },
    {
      id: "trending",
      label: "Trending Categories",
      component: TrendingCategoriesTab,
    },
    {
      id: "domestic",
      label: "Domestic Investor Trends",
      component: DomesticInvestorTrendsTab,
    },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <div>
      <nav className="nav nav-tabs mb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
            style={{ border: "none", background: "none" }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <section>{ActiveComponent && <ActiveComponent />}</section>
    </div>
  );
};

export default TabContainer;
