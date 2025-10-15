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
public class MockTicker {

  private String symbol;
  private String name;
  private String sector;
  private double basePrice;


  // 실시간(혹은 mock) 변동 가격을 시뮬레이션
  public double generateCurrentPrice(Random random) {
    double volatility = 0.05;
    double changePercent = (random.nextDouble() - 0.5) * 2 * volatility;
    return roundToTwoDecimals(basePrice * (1 + changePercent));
  }

  // 변동률(%) 계산
  public String generateRateOfChange(double currentPrice) {
    double change = ((currentPrice - basePrice) / basePrice) * 100;
    return String.format("%+.2f%%", change);
  }

  // 거래대금 (mock)
  public String generateTradingValue(Random random) {
    int million = 10000 + random.nextInt(100000); 
    return String.format("%,d만원", million / 100);
  }

  // 거래량비율 (mock)
  public int generateVolumeRatio(Random random) {
    return 40 + random.nextInt(60); 
  }

  private double roundToTwoDecimals(double value) {
    return Math.round(value * 100.0) / 100.0;
  }

}
