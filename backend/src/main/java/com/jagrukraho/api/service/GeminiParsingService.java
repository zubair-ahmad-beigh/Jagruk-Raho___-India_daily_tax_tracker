package com.jagrukraho.api.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jagrukraho.api.dto.ParseExpenseRequest;
import com.jagrukraho.api.dto.ParseExpenseResponse;
import com.jagrukraho.api.entity.Category;
import com.jagrukraho.api.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class GeminiParsingService {

    @Value("${gemini.api.key:mock_key}")
    private String apiKey;

    @Value("${gemini.api.url:https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent}")
    private String apiUrl;

    private final CategoryRepository categoryRepository;
    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;

    @Autowired
    public GeminiParsingService(CategoryRepository categoryRepository, ObjectMapper objectMapper) {
        this.categoryRepository = categoryRepository;
        this.objectMapper = objectMapper;
        this.restTemplate = new RestTemplate();
    }

    public ParseExpenseResponse parseExpense(ParseExpenseRequest request) {
        String rawText = request.getRawText();
        String defaultState = request.getDefaultState() != null ? request.getDefaultState() : "Karnataka";

        if (apiKey != null && !apiKey.equalsIgnoreCase("mock_key") && !apiKey.isBlank()) {
            try {
                return callGeminiApi(rawText, defaultState);
            } catch (Exception e) {
                // Fallback to local heuristic parser on API error
            }
        }

        return fallbackParsing(rawText, defaultState);
    }

    private ParseExpenseResponse callGeminiApi(String rawText, String defaultState) throws Exception {
        String systemPrompt = """
            You are a precise expense extraction assistant for India.
            Examine the user's natural language expense input and return ONLY a JSON object with:
            - product (string description)
            - categoryId (one of: mobile_phone, laptop, electronics, clothing, restaurant, grocery, packaged_food, petrol, diesel, cng, lpg, online_subscription, hotel, cab_service)
            - amount (number)
            - quantity (number, default 1)
            - unit (string, e.g. piece, litre, month, unit)
            - expenseDate (YYYY-MM-DD format, default today if unspecified)
            - state (string, default provided state if unspecified)
            - confidence (number 0.0 to 1.0)
            
            Do NOT include any markdown code formatting or extra text. Output plain valid JSON only.
            """;

        String fullUrl = apiUrl.contains("?") ? apiUrl + "&key=" + apiKey : apiUrl + "?key=" + apiKey;

        Map<String, Object> contents = Map.of(
            "contents", List.of(
                Map.of("parts", List.of(
                    Map.of("text", systemPrompt + "\nUser Input: " + rawText + "\nDefault State: " + defaultState)
                ))
            )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(contents, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(fullUrl, entity, String.class);
        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            JsonNode rootNode = objectMapper.readTree(response.getBody());
            String jsonText = rootNode.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText();
            jsonText = jsonText.replaceAll("```json", "").replaceAll("```", "").trim();

            JsonNode expenseNode = objectMapper.readTree(jsonText);
            return ParseExpenseResponse.builder()
                    .product(expenseNode.path("product").asText(rawText))
                    .categoryId(expenseNode.path("categoryId").asText("grocery"))
                    .amount(new BigDecimal(expenseNode.path("amount").asText("0.00")))
                    .quantity(new BigDecimal(expenseNode.path("quantity").asText("1.0")))
                    .unit(expenseNode.path("unit").asText("unit"))
                    .expenseDate(expenseNode.has("expenseDate") ? LocalDate.parse(expenseNode.path("expenseDate").asText()) : LocalDate.now())
                    .state(expenseNode.path("state").asText(defaultState))
                    .confidence(expenseNode.path("confidence").asDouble(0.95))
                    .build();
        }

        return fallbackParsing(rawText, defaultState);
    }

    private ParseExpenseResponse fallbackParsing(String rawText, String defaultState) {
        String textLower = rawText.toLowerCase();

        // 1. Extract Amount
        BigDecimal amount = BigDecimal.ZERO;
        Pattern amountPattern = Pattern.compile("(?:₹|rs\\.?|rupees)?\\s*(\\d+(?:,\\d+)*(?:\\.\\d+)?)", Pattern.CASE_INSENSITIVE);
        Matcher amountMatcher = amountPattern.matcher(rawText);
        if (amountMatcher.find()) {
            String cleanAmountStr = amountMatcher.group(1).replace(",", "");
            try {
                amount = new BigDecimal(cleanAmountStr);
            } catch (Exception ignored) {}
        }

        // 2. Classify Category
        String categoryId = "grocery";
        if (textLower.contains("phone") || textLower.contains("mobile") || textLower.contains("samsung") || textLower.contains("iphone")) {
            categoryId = "mobile_phone";
        } else if (textLower.contains("laptop") || textLower.contains("macbook") || textLower.contains("computer")) {
            categoryId = "laptop";
        } else if (textLower.contains("tv") || textLower.contains("television") || textLower.contains("speaker") || textLower.contains("fridge")) {
            categoryId = "electronics";
        } else if (textLower.contains("shirt") || textLower.contains("jeans") || textLower.contains("clothes") || textLower.contains("wear")) {
            categoryId = "clothing";
        } else if (textLower.contains("petrol") || textLower.contains("fuel")) {
            categoryId = "petrol";
        } else if (textLower.contains("diesel")) {
            categoryId = "diesel";
        } else if (textLower.contains("cng")) {
            categoryId = "cng";
        } else if (textLower.contains("lpg") || textLower.contains("gas cylinder")) {
            categoryId = "lpg";
        } else if (textLower.contains("dinner") || textLower.contains("lunch") || textLower.contains("restaurant") || textLower.contains("swiggy") || textLower.contains("zomato")) {
            categoryId = "restaurant";
        } else if (textLower.contains("netflix") || textLower.contains("spotify") || textLower.contains("subscription") || textLower.contains("prime")) {
            categoryId = "online_subscription";
        } else if (textLower.contains("uber") || textLower.contains("ola") || textLower.contains("cab") || textLower.contains("taxi")) {
            categoryId = "cab_service";
        }

        // 3. Extract State
        String state = defaultState;
        if (textLower.contains("karnataka") || textLower.contains("bangalore") || textLower.contains("bengaluru")) {
            state = "Karnataka";
        } else if (textLower.contains("maharashtra") || textLower.contains("mumbai") || textLower.contains("pune")) {
            state = "Maharashtra";
        } else if (textLower.contains("delhi")) {
            state = "Delhi";
        }

        return ParseExpenseResponse.builder()
                .product(rawText)
                .categoryId(categoryId)
                .amount(amount)
                .quantity(BigDecimal.ONE)
                .unit("unit")
                .expenseDate(LocalDate.now())
                .state(state)
                .confidence(0.85)
                .build();
    }
}
