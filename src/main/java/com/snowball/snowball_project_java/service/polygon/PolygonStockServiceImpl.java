package com.snowball.snowball_project_java.service.polygon;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import com.snowball.snowball_project_java.dto.stock.StockCandleDto;
import com.snowball.snowball_project_java.dto.stock.StockMainIndexDto;
import com.snowball.snowball_project_java.dto.stock.StockSearchDto;
import com.snowball.snowball_project_java.service.mock.MockDataService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class PolygonStockServiceImpl implements PolygonStockService {

  // API 상수들
  private static final String POLYGON_BASE_URL = "https://api.polygon.io";
  private static final String DAILY_AGGREGATES_URL = POLYGON_BASE_URL
      + "/v2/aggs/ticker/%s/range/1/day/%s/%s?adjusted=true&sort=asc&limit=120&apiKey=%s";
  private static final String TICKER_SEARCH_URL = POLYGON_BASE_URL + "/v3/reference/tickers/%s?apiKey=%s";
  private static final String AUTO_SEARCH_URL = POLYGON_BASE_URL
      + "/v3/reference/tickers?search=%s&active=true&apikey=%s";
  private static final String CANDLES_URL = POLYGON_BASE_URL
      + "/v2/aggs/ticker/%s/range/1/day/%s/%s?adjusted=true&sort=asc&limit=5000&apikey=%s";
  private static final String PREV_DAY_URL = POLYGON_BASE_URL + "/v2/aggs/ticker/%s/prev?adjusted=true&apikey=%s";
  private final PolygonApiService polygonApiService;
  private final MockDataService mockDataService;

  @Value("${app.mock.enabled:true}")
  private boolean mockModeEnabled;

  @Value("${polygon.api.key}")
  private String apiKey;

  @Override
  public List<StockCandleDto> getDailyCandles(String ticker, String from, String to) {
    String url = String.format(DAILY_AGGREGATES_URL, ticker, from, to, apiKey);
    JsonNode root = polygonApiService.fetchAndParseApiResponse(url);
    return polygonApiService.parseCandleData(root);
  }

  @Override
  public List<StockSearchDto> getStockSearchTicker(String ticker) {
    if (mockModeEnabled) {
      log.info("Using mock data for single stock search: {}", ticker);
      return mockDataService.generateMockSearchData(ticker);
    }
    String url = String.format(TICKER_SEARCH_URL, ticker, apiKey);
    JsonNode root = polygonApiService.fetchAndParseApiResponse(url);
    return polygonApiService.parseSingleSearchData(root);
  }

  @Override
  public List<StockSearchDto> getStockAutoSearchTicker(String keyword) {
    if (mockModeEnabled) {
      log.info("Using mock data for auto search: {}", keyword);
      return mockDataService.generateMockSearchData(keyword);
    }
    String encodedKeyword = URLEncoder.encode(keyword, StandardCharsets.UTF_8);
    String url = String.format(AUTO_SEARCH_URL, encodedKeyword, apiKey);
    JsonNode root = polygonApiService.fetchAndParseApiResponse(url);
    return polygonApiService.parseMultipleSearchData(root);
  }

  @Override
  public List<StockCandleDto> getStockCandles(String ticker, LocalDate startDate,
      LocalDate endDate) {
    if (mockModeEnabled) {
      log.info("Using mock data for stock candles: {}", ticker);
      return mockDataService.generateMockCandleData(ticker, startDate, endDate);
    }
    String encodedTicker = URLEncoder.encode(ticker, StandardCharsets.UTF_8);
    String url = String.format(CANDLES_URL, encodedTicker,
        startDate.format(DateTimeFormatter.ISO_DATE),
        endDate.format(DateTimeFormatter.ISO_DATE), apiKey);
    JsonNode root = polygonApiService.fetchAndParseApiResponse(url);
    return polygonApiService.parseCandleData(root);
  }

  @Override
  public List<StockMainIndexDto> getStockMainIndex(String ticker) {
    if (mockModeEnabled) {
      log.info("Using mock data for main index: {}", ticker);
      return mockDataService.generateMockMainIndexData(ticker);
    }
    String encodedTicker = URLEncoder.encode(ticker, StandardCharsets.UTF_8);
    String url = String.format(PREV_DAY_URL, encodedTicker, apiKey);
    JsonNode root = polygonApiService.fetchAndParseApiResponse(url);
    return polygonApiService.parseMainIndexData(root);
  }

}