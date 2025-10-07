package com.snowball.snowball_project_java.dto.stock;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockCandleDto {

  private long timestamp;
  private String date;
  private double open;
  private double high;
  private double low;
  private double close;
  private long volume;

}
