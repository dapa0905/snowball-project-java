package com.snowball.snowball_project_java.service.mock;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import org.springframework.stereotype.Service;
import com.snowball.snowball_project_java.dto.stock.StockCandleDto;
import com.snowball.snowball_project_java.dto.stock.StockMainIndexDto;
import com.snowball.snowball_project_java.dto.stock.StockSearchDto;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class MockDataService {

    private final Random random = new Random();
    private final String[][] TICKER_DATA = {
            { "AAPL", "Apple Inc.", "Technology", "150.00" },
            { "TSLA", "Tesla Inc.", "Automotive", "200.00" },
            { "MSFT", "Microsoft Corporation", "Technology", "300.00" },
            { "NVDA", "NVIDIA Corporation", "Technology", "400.00" },
            { "GOOGL", "Alphabet Inc.", "Technology", "120.00" },
            { "AMZN", "Amazon.com Inc.", "E-commerce", "130.00" },
            { "META", "Meta Platforms Inc.", "Technology", "250.00" },
            { "VOO", "Vanguard S&P 500 ETF", "ETF", "350.00" },
            { "QQQ", "Invesco QQQ Trust", "ETF", "380.00" },
            { "UUP", "Invesco DB US Dollar Index Bullish Fund", "ETF", "28.00" },
            { "DIA", "SPDR Dow Jones Industrial Average ETF", "ETF", "340.00" }
    };

    public List<StockCandleDto> generateMockCandleData(String ticker, LocalDate startDate, LocalDate endDate) {
        log.info("Generating mock candle data for ticker: {}, from {} to {}", ticker, startDate, endDate);

        List<StockCandleDto> candles = new ArrayList<>();

        // 티커별 기본 가격 찾기
        double basePrice = getBasePriceForTicker(ticker);

        LocalDate currentDate = startDate;
        double currentPrice = basePrice;

        while (!currentDate.isAfter(endDate)) {
            StockCandleDto candle = new StockCandleDto();

            // 주말 제외 (토요일, 일요일)
            if (currentDate.getDayOfWeek().getValue() <= 5) {
                // 가격 변동 시뮬레이션 (-5% ~ +5%)
                double changePercent = (random.nextDouble() - 0.5) * 0.1; // -5% ~ +5%
                double newPrice = currentPrice * (1 + changePercent);

                // OHLC 데이터 생성
                double open = currentPrice;
                double close = newPrice;
                double high = Math.max(open, close) * (1 + random.nextDouble() * 0.02); // 최대 2% 상승
                double low = Math.min(open, close) * (1 - random.nextDouble() * 0.02); // 최대 2% 하락

                // 거래량 생성 (100만 ~ 5000만)
                long volume = 1000000 + (long) (random.nextDouble() * 49000000);

                candle.setDate(currentDate.toString());
                candle.setOpen(roundToTwoDecimals(open));
                candle.setHigh(roundToTwoDecimals(high));
                candle.setLow(roundToTwoDecimals(low));
                candle.setClose(roundToTwoDecimals(close));
                candle.setVolume(volume);
                candle.setTimestamp(System.currentTimeMillis());

                candles.add(candle);
                currentPrice = close;
            }

            currentDate = currentDate.plusDays(1);
        }

        return candles;
    }

    public List<StockSearchDto> generateMockSearchData(String query) {
        log.info("Generating mock search data for query: {}", query);

        List<StockSearchDto> results = new ArrayList<>();

        for (String[] tickerInfo : TICKER_DATA) {
            if (tickerInfo[0].toLowerCase().contains(query.toLowerCase()) ||
                    tickerInfo[1].toLowerCase().contains(query.toLowerCase())) {

                StockSearchDto dto = new StockSearchDto();
                dto.setTicker(tickerInfo[0]);
                dto.setName(tickerInfo[1]);
                dto.setDescription("Mock description for " + tickerInfo[1]);
                dto.setType(tickerInfo[2]);
                dto.setMarketCap(1000000000L + (long) (random.nextDouble() * 9000000000L)); 
                dto.setHomepageUrl("https://example.com/" + tickerInfo[0].toLowerCase());
                dto.setLogoUrl("https://logo.clearbit.com/" + tickerInfo[0].toLowerCase() + ".com");
                dto.setSicCode("1234");
                dto.setSicDescription("Mock SIC Description");

                results.add(dto);
            }
        }

        return results;
    }

    public List<StockMainIndexDto> generateMockMainIndexData(String ticker) {
        log.info("Generating mock main index data for ticker: {}", ticker);

        List<StockMainIndexDto> results = new ArrayList<>();
        double basePrice = getBasePriceForTicker(ticker);

        // 최근 5일 데이터 생성
        for (int i = 4; i >= 0; i--) {
            LocalDate date = LocalDate.now().minusDays(i);

            // 주말 제외
            if (date.getDayOfWeek().getValue() <= 5) {
                StockMainIndexDto dto = new StockMainIndexDto();

                double changePercent = (random.nextDouble() - 0.5) * 0.08; // -4% ~ +4%
                double price = basePrice * (1 + changePercent);

                dto.setDate(date.toString());
                dto.setOpen(roundToTwoDecimals(price * 0.99));
                dto.setHigh(roundToTwoDecimals(price * 1.02));
                dto.setLow(roundToTwoDecimals(price * 0.98));
                dto.setClose(roundToTwoDecimals(price));
                dto.setVolume(1000000 + (long) (random.nextDouble() * 10000000));
                dto.setTimeStamp(System.currentTimeMillis());
                dto.setNumberOfTransactions(1000 + random.nextInt(5000));

                results.add(dto);
            }
        }

        return results;
    }

    private double getBasePriceForTicker(String ticker) {
        for (String[] tickerInfo : TICKER_DATA) {
            if (tickerInfo[0].equals(ticker)) {
                return Double.parseDouble(tickerInfo[3]);
            }
        }
        return 100.0; // 기본값
    }

    private double roundToTwoDecimals(double value) {
        return Math.round(value * 100.0) / 100.0;
    }

}
