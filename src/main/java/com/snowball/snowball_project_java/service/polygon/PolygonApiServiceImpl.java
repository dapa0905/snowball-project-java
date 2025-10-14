package com.snowball.snowball_project_java.service.polygon;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.snowball.snowball_project_java.dto.stock.StockCandleDto;
import com.snowball.snowball_project_java.dto.stock.StockMainIndexDto;
import com.snowball.snowball_project_java.dto.stock.StockSearchDto;
import com.snowball.snowball_project_java.error.CustomException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class PolygonApiServiceImpl implements PolygonApiService {

    private final String TIMEZONE_NY = "America/New_York";

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public JsonNode fetchAndParseApiResponse(String url) {
        log.debug("Fetching data from URL: {}", url);

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        if (response.getStatusCode() != HttpStatus.OK) {
            throw new CustomException("Failed to fetch data from Polygon API");
        }

        String jsonBody = response.getBody();
        try {
            JsonNode root = objectMapper.readTree(jsonBody);
            String status = root.path("status").asText();

            if (!List.of("OK", "DELAYED", "SUCCESS").contains(status)) {
                throw new CustomException("Polygon API returned error: " + root.path("error").asText());
            }

            return root;
        } catch (JsonProcessingException e) {
            log.error("Failed to parse JSON response", e);
            throw new CustomException("Failed to parse Polygon API response");
        }
    }

    @Override
    public List<StockCandleDto> parseCandleData(JsonNode root) {
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
            LocalDate date = Instant.ofEpochMilli(node.path("t").asLong())
                    .atZone(ZoneId.of(TIMEZONE_NY)).toLocalDate();
            candle.setDate(date.toString());

            candles.add(candle);
        }

        return candles;
    }

    @Override
    public List<StockSearchDto> parseSingleSearchData(JsonNode root) {
        JsonNode resultNode = root.path("results");
        log.info("Search data: {}", resultNode);
        StockSearchDto dto = new StockSearchDto();
        dto.setTicker(resultNode.path("ticker").asText());
        dto.setName(resultNode.path("name").asText());
        dto.setDescription(resultNode.path("description").asText());
        dto.setHomepageUrl(resultNode.path("homepage_url").asText());
        dto.setMarketCap(resultNode.path("market_cap").asLong());
        dto.setLogoUrl(resultNode.path("branding").path("logo_url").asText());
        dto.setSicCode(resultNode.path("sic_code").asText());
        dto.setSicDescription(resultNode.path("sic_description").asText());
        dto.setType(resultNode.path("type").asText());
        return List.of(dto);
    }

    @Override
    public List<StockSearchDto> parseMultipleSearchData(JsonNode root) {
        List<StockSearchDto> dtos = new ArrayList<>();
        log.info("Search data: {}", root);
        for (JsonNode node : root.path("results")) {
            StockSearchDto dto = new StockSearchDto();
            dto.setTicker(node.path("ticker").asText());
            dto.setName(node.path("name").asText());
            dto.setDescription(node.path("description").asText());
            dto.setHomepageUrl(node.path("homepage_url").asText());
            dto.setMarketCap(node.path("market_cap").asLong());
            dto.setLogoUrl(node.path("branding").path("logo_url").asText());
            dto.setSicCode(node.path("sic_code").asText());
            dto.setSicDescription(node.path("sic_description").asText());
            dto.setType(node.path("type").asText());
            dtos.add(dto);
        }

        return dtos;
    }

    @Override
    public List<StockMainIndexDto> parseMainIndexData(JsonNode root) {
        List<StockMainIndexDto> dtos = new ArrayList<>();

        for (JsonNode node : root.path("results")) {
            StockMainIndexDto dto = new StockMainIndexDto();
            dto.setOpen(node.path("o").asDouble());
            dto.setClose(node.path("c").asDouble());
            dto.setHigh(node.path("h").asDouble());
            dto.setLow(node.path("l").asDouble());
            dto.setVolume(node.path("v").asLong());
            dto.setTimeStamp(node.path("t").asLong());
            dto.setNumberOfTransactions(node.path("n").asInt());

            // 밀리 초 단위 -> 시간 변환
            LocalDate date = Instant.ofEpochMilli(node.path("t").asLong())
                    .atZone(ZoneId.of(TIMEZONE_NY)).toLocalDate();
            dto.setDate(date.toString());

            dtos.add(dto);
        }

        return dtos;
    }

}
