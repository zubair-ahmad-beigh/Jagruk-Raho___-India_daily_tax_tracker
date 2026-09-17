package com.jagrukraho.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseResponse {
    private UUID expenseId;
    private UUID userId;
    private String categoryId;
    private String categoryName;
    private String description;
    private BigDecimal amount;
    private BigDecimal quantity;
    private String unit;
    private LocalDate expenseDate;
    private String state;
    private ZonedDateTime createdAt;
    private TaxCalculationResult taxResult;
}
