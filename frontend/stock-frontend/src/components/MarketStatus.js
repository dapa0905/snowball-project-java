import { useEffect, useState } from "react";

function MarketStatus() {
  const [domesticStatus, setDomesticStatus] = useState("");
  const [usStatus, setUsStatus] = useState("");

  useEffect(() => {
    const now = new Date();

    // Korean stock market
    const koreaHour = now.getHours();
    const koreaMinute = now.getMinutes();
    const koreaTime = koreaHour * 60 + koreaMinute;

    if (koreaTime >= 540 && koreaTime <= 930) {
      setDomesticStatus("Regular trading");
    } else {
      setDomesticStatus("Market close");
    }

    //American stock market
    const usTime = koreaTime;
    if (usTime >= 1020 && usTime < 1350) {
      setUsStatus("Pre-market trading");
    } else if (usTime >= 1350 || usTime < 300) {
      setUsStatus("Regular trading");
    } else if (usTime >= 300 && usTime < 540) {
      setUsStatus("After-hours trading");
    } else {
      setUsStatus("Market close");
    }
  }, []);

    // 활성 상태 체크 함수
  const isActive = (status) => status !== "Market close";

  // 초록색 원 스타일
  const dotStyle = {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "var(--wts-adaptive-green600)",
    marginRight: "6px",
  };

  // 상태별 스타일
  const getTextStyle = (status) => ({
    color: isActive(status) ? "inherit" : "gray",
    fontWeight: isActive(status) ? "bold" : "normal",
    display: "flex",
    alignItems: "center",
  });

  return (
    <div className="d-flex align-items-center mb-2" style={{ gap: "20px" }}>
      <div style={getTextStyle(domesticStatus)}>
        {isActive(domesticStatus) && <span style={dotStyle}></span>}
        <small>Korean stock market・{domesticStatus}</small>
      </div>
      <div style={getTextStyle(usStatus)}>
        {isActive(usStatus) && <span style={dotStyle}></span>}
        <small>American stock market・{usStatus}</small>
      </div>
    </div>
  );
}

export default MarketStatus;
