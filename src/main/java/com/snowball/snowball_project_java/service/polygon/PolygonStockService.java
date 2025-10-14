package com.snowball.snowball_project_java.service.polygon;

import java.time.LocalDate;
import java.util.List;
import com.snowball.snowball_project_java.dto.stock.StockCandleDto;
import com.snowball.snowball_project_java.dto.stock.StockMainIndexDto;
import com.snowball.snowball_project_java.dto.stock.StockSearchDto;

public interface PolygonStockService {

  // 단일캔들검색
  List<StockCandleDto> getDailyCandles(String ticker, String from, String to);

  // 단일검색
  List<StockSearchDto> getStockSearchTicker(String ticker);

  // 자동검색
  List<StockSearchDto> getStockAutoSearchTicker(String keyword);

  // 기간별 캔들 차트
  List<StockCandleDto> getStockCandles(String ticker, LocalDate startDate, LocalDate endDate);
  
  // 메인인덱스수치검색
  List<StockMainIndexDto> getStockMainIndex(String ticker);

}
