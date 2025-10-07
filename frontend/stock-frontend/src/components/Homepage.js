import React from "react";

function MainPage() {
  // 예시 데이터
  const marketData = [
    { label: "달러 환율", value: "1,416.30", change: "+10.3 (0.73%)", isPositive: true },
    { label: "나스닥", value: "22,941.66", change: "+161.16 (0.70%)", isPositive: true },
    { label: "S&P 500", value: "6,740.28", change: "+24.49 (0.36%)", isPositive: true },
    { label: "VIX", value: "16.37", change: "-0.08 (0.48%)", isPositive: false },
  ];

  return (
    <div className="container mt-4">
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3">PayToWin</h1>
        <nav>
          <ul className="nav">
            <li className="nav-item"><a href="#" className="nav-link">Home</a></li>
            <li className="nav-item"><a href="#" className="nav-link">News</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Stocks</a></li>
          </ul>
        </nav>
        <button className="btn btn-primary ms-auto">로그인</button>
      </header>

      <section className="mb-4">
        <div className="d-flex align-items-center mb-2">
          <small className="mx-2">국내 데이마켓</small>
          <small className="mx-2">해외 데이마켓</small>
        </div>

        <div className="row text-center">
          {marketData.map((item, idx) => (
            <div className="col-3" key={idx}>
              <div className="mb-1">{item.label}</div>
              <div className="fw-bold">{item.value}</div>
              <div className={item.isPositive ? "text-danger" : "text-primary"}>
                {item.change}
              </div>
            </div>
          ))}
        </div>
      </section>

      <nav className="nav nav-tabs mb-3">
        <a className="nav-link active" href="#">실시간 차트</a>
        <a className="nav-link" href="#">지금 뜨는 카테고리</a>
        <a className="nav-link" href="#">국내 투자자 동향</a>
      </nav>

      <section>
        <div className="btn-group mb-3">
          {["전체", "토스증권 거래대금", "토스증권 거래량", "거래대금", "거래량", "급상승", "급하락"].map((tab, idx) => (
            <button type="button" className={`btn btn-outline-secondary ${idx === 0 ? 'active' : ''}`} key={idx}>
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
              <th>토스증권 거래 비율</th>
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
                  <div className="progress-bar bg-danger" style={{ width: "100%" }}></div>
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
