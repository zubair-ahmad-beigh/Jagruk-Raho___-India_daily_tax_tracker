package com.jagrukraho.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParseExpenseResponse {
    private String product;
    private String categoryId;
    private BigDecimal amount;
    private BigDecimal quantity;
    private String unit;
    private LocalDate expenseDate;
    private String state;
    private Double confidence;
}
