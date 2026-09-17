package com.jagrukraho.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyTaxSummaryDto {
    private LocalDate date;
    private BigDecimal totalSpending;
    private BigDecimal totalEstimatedTax;
    private Integer expenseCount;
    private List<TaxCategoryBreakdown> breakdown;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TaxCategoryBreakdown {
        private String taxType;
        private BigDecimal amount;
        private Double percentage;
    }
}
