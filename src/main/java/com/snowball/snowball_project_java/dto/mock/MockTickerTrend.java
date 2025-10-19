package com.snowball.snowball_project_java.dto.mock;

import java.util.Random;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MockTickerTrend {

  private String type;
  private String netBuy;
  private String trend;
  private double percentage;
  private String volume;

  public static MockTickerTrend randomTrend(String type, Random random) {
    // ±2,000억 사이의 랜덤 순매수
    int netBuyValue = random.nextInt(4000) - 2000;
    String trend = netBuyValue >= 0 ? "up" : "down";
    String netBuy = String.format("%,d억원", Math.abs(netBuyValue));

    // ±20% 변동률
    double percentage = Math.round(((random.nextDouble() - 0.5) * 40) * 10.0) / 10.0;

    // 거래량 (10M ~ 100M)
    double volume = 10 + random.nextDouble() * 90;

    return new MockTickerTrend(type, netBuy, trend, percentage, String.format("%.1fM", volume));
  }

}
