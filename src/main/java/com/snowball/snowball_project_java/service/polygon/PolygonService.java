package com.snowball.snowball_project_java.service.polygon;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.snowball.snowball_project_java.dto.stock.StockCandleDto;
import com.snowball.snowball_project_java.dto.stock.StockSearchDto;
import com.snowball.snowball_project_java.error.CustomException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class PolygonService implements PolygonServiceImpl {

  @Value("${polygon.api.key}")
  private String apiKey;

  private final RestTemplate restTemplate;

  @Override
  public List<StockCandleDto> getDailyCanles(String ticker, String from, String to) {
    String url = String.format(
        "https://api.polygon.io/v2/aggs/ticker/%s/range/1/day/%s/%s?adjusted=true&sort=asc&limit=120&apiKey=%s",
        ticker, from, to, apiKey);

    ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
    if (response.getStatusCode() != HttpStatus.OK) {
      throw new CustomException("Failed to fetch data from Polygon API");
    }

    String jsonBody = response.getBody();
    try {
      ObjectMapper mapper = new ObjectMapper();
      JsonNode root = mapper.readTree(jsonBody);
      if (!"OK".equals(root.path("status").asText())) {
        throw new CustomException("Polygon API returned error: " + root.path("error").asText());
      }

      List<StockCandleDto> candles = new ArrayList<>();
      for (JsonNode node : root.path("results")) {
        StockCandleDto candle = new StockCandleDto();
        candle.setTimestamp(node.path("t").asLong());
        candle.setOpen(node.path("o").asDouble());
        candle.setHigh(node.path("h").asDouble());
        candle.setLow(node.path("l").asDouble());
        candle.setClose(node.path("c").asDouble());
        candle.setVolume(node.path("v").asLong());
        candles.add(candle);
      }
      return candles;

    } catch (JsonProcessingException e) {
      throw new CustomException("Failed to parse Polygon API response");
    }
  }

  @Override
  public List<StockSearchDto> getStockSearchTicker(String ticker) {
    String url =
        String.format("https://api.polygon.io/v3/reference/tickers/%s?apiKey=%s", ticker, apiKey);
    ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
    if (response.getStatusCode() != HttpStatus.OK) {
      throw new CustomException("Failed to fetch data from Polygon API");
    }

    String jsonBody = response.getBody();
    try {
      ObjectMapper mapper = new ObjectMapper();
      JsonNode root = mapper.readTree(jsonBody);
      if (!"OK".equals(root.path("status").asText())) {
        throw new CustomException("Polygon API returned error :" + root.path("error").asText());
      }

      JsonNode resultNode = root.path("results");
      StockSearchDto dto = new StockSearchDto();
      dto.setTicker(resultNode.path("ticker").asText());
      dto.setName(resultNode.path("name").asText());
      return List.of(dto);

    } catch (JsonProcessingException e) {
      throw new CustomException("Failed to parse Polygon API response");
    }
  }

  @Override
  public List<StockSearchDto> getStockAutoSearchTicker(String keyword) {
    String encodedKeyword = URLEncoder.encode(keyword, StandardCharsets.UTF_8);
    String url =
        String.format("https://api.polygon.io/v3/reference/tickers?search=%s&active=true&apikey=%s",
            encodedKeyword, apiKey);

    ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
    if (response.getStatusCode() != HttpStatus.OK) {
      throw new CustomException("Failed to fetch data from Polygon API");
    }

    String jsonBody = response.getBody();
    try {
      ObjectMapper mapper = new ObjectMapper();
      JsonNode root = mapper.readTree(jsonBody);
      if (!"OK".equals(root.path("status").asText())) {
        throw new CustomException("Polygon API returned error: " + root.path("error").asText());
      }

      List<StockSearchDto> dtos = new ArrayList<>();
      for (JsonNode node : root.path("results")) {
        StockSearchDto dto = new StockSearchDto();
        dto.setTicker(node.path("ticker").asText());
        dto.setName(node.path("name").asText());
        dtos.add(dto);
      }
      return dtos;

    } catch (JsonProcessingException e) {
      throw new CustomException("Failed to parse Polygon API response");
    }
  }

  @Override
  public List<StockCandleDto> getStockCandles(String ticker, LocalDate startDate,
      LocalDate endDate) {
    String encodedTicker = URLEncoder.encode(ticker, StandardCharsets.UTF_8);
    String url = String.format(
        "https://api.polygon.io/v2/aggs/ticker/%s/range/1/day/%s/%s?adjusted=true&sort=asc&limit=5000&apikey=%s",
        encodedTicker, startDate.format(DateTimeFormatter.ISO_DATE),
        endDate.format(DateTimeFormatter.ISO_DATE), apiKey);

    ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
    if (response.getStatusCode() != HttpStatus.OK) {
      throw new CustomException("Failed to fetch data from Polygon API");
    }

    String jsonBody = response.getBody();
    try {
      ObjectMapper mapper = new ObjectMapper();
      JsonNode root = mapper.readTree(jsonBody);
      String status = root.path("status").asText();
      if (!List.of("OK", "DELAYED", "SUCCESS").contains(status)) {
        throw new CustomException("Polygon API returned error: " + root.path("error").asText());
      }

      List<StockCandleDto> candles = new ArrayList<>();
      for (JsonNode node : root.path("results")) {
        StockCandleDto candle = new StockCandleDto();
        candle.setTimestamp(node.path("t").asLong());
        candle.setOpen(node.path("o").asDouble());
        candle.setHigh(node.path("h").asDouble());
        candle.setLow(node.path("l").asDouble());
        candle.setClose(node.path("c").asDouble());
        candle.setVolume(node.path("v").asLong());
        
        // 밀리 초 단위 -> 시간 변환
        LocalDate date = Instant.ofEpochMilli(node.path("t").asLong()).atZone(ZoneId.of("America/New_York")).toLocalDate();
        candle.setDate(date.toString());
        
        candles.add(candle);
      }
      return candles;

    } catch (JsonProcessingException e) {
      throw new CustomException("Failed to parse Polygon API response");
    }
  }

}
