package com.snowball.snowball_project_java.dto.mock;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MockStockMainIndexDto {

  private double open;
  private double close;
  private double high;
  private double low;
  private long volume;
  private long timeStamp;
  private String date;
  private int numberOfTransactions;

}
