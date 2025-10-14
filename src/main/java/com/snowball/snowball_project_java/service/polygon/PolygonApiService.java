package com.snowball.snowball_project_java.service.polygon;

import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.snowball.snowball_project_java.dto.stock.StockCandleDto;
import com.snowball.snowball_project_java.dto.stock.StockMainIndexDto;
import com.snowball.snowball_project_java.dto.stock.StockSearchDto;

public interface PolygonApiService {
    JsonNode fetchAndParseApiResponse(String url);

    List<StockCandleDto> parseCandleData(JsonNode root);

    List<StockSearchDto> parseSingleSearchData(JsonNode root);

    List<StockSearchDto> parseMultipleSearchData(JsonNode root);

    List<StockMainIndexDto> parseMainIndexData(JsonNode root);

}
