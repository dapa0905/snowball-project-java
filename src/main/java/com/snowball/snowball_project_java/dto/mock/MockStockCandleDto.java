package com.snowball.snowball_project_java.dto.mock;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MockStockCandleDto {
  
  private long timestamp;
  private String date;
  private double open;
  private double high;
  private double low;
  private double close;
  private long volume;

}
