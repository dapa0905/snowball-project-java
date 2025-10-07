package com.snowball.snowball_project_java.dto.polygon;

import java.util.List;
import com.snowball.snowball_project_java.dto.stock.StockCandleDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PolygonResponseDto {
  
  private String status;
  private int queryCount;
  private int resultsCount;
  private List<StockCandleDto> result;

}
