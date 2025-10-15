package com.snowball.snowball_project_java.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.snowball.snowball_project_java.dto.api.ApiResponse;
import com.snowball.snowball_project_java.dto.stock.StockCandleDto;
import com.snowball.snowball_project_java.dto.stock.StockMainIndexDto;
import com.snowball.snowball_project_java.dto.stock.StockSearchDto;
import com.snowball.snowball_project_java.service.mock.MockDataService;
import com.snowball.snowball_project_java.service.polygon.PolygonStockService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/stocks")
@Slf4j
@RequiredArgsConstructor
public class StockController {

  private final PolygonStockService polygonStockService;
  private final MockDataService mockDataService;

  @GetMapping("/{ticker}")
  public ApiResponse<List<StockCandleDto>> getStockCandles(
      @PathVariable(name = "ticker") String ticker, @RequestParam(name = "from") String from,
      @RequestParam(name = "to") String to) {
    List<StockCandleDto> candles = polygonStockService.getDailyCandles(ticker, from, to);
    return new ApiResponse<List<StockCandleDto>>(true, "Success", candles);
  }

  @GetMapping("/search")
  public ApiResponse<List<StockSearchDto>> getStockSearchTicker(
      @RequestParam(name = "ticker") String ticker) {
    List<StockSearchDto> resultList = polygonStockService.getStockSearchTicker(ticker);
    return new ApiResponse<List<StockSearchDto>>(true, "Success", resultList);
  }

  @GetMapping("/autocomplete")
  public ApiResponse<List<StockSearchDto>> getStockAutoSearchTicker(
      @RequestParam(name = "keyword") String keyword) {
    List<StockSearchDto> resultList = polygonStockService.getStockAutoSearchTicker(keyword);
    return new ApiResponse<List<StockSearchDto>>(true, "Success", resultList);
  }

  @GetMapping("/candles")
  public ApiResponse<List<StockCandleDto>> getStockCandles(
      @RequestParam(name = "ticker") String ticker,
      @RequestParam(name = "startDate") @DateTimeFormat(
          iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
      @RequestParam(name = "endDate") @DateTimeFormat(
          iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
    List<StockCandleDto> candles = polygonStockService.getStockCandles(ticker, startDate, endDate);
    return new ApiResponse<List<StockCandleDto>>(true, "Success", candles);
  }

  @GetMapping("/index")
  public ApiResponse<List<StockMainIndexDto>> getStockMainIndex(
      @RequestParam(name = "ticker") String ticker) {
    List<StockMainIndexDto> resultList = polygonStockService.getStockMainIndex(ticker);
    return new ApiResponse<List<StockMainIndexDto>>(true, "Success", resultList);
  }
  
  @GetMapping("/mocklist")
  public ApiResponse<List<Map<String, Object>>> getGenerateMockStockList() {
    List<Map<String, Object>> resultList = mockDataService.getGenerateMockStockList();
    return new ApiResponse<List<Map<String,Object>>>(true, "Success", resultList);
  }

}
