package com.jagrukraho.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaxCalculationResult {
    private UUID calculationId;
    private UUID taxRuleId;
    private String taxType; // GST, EXCISE_VAT, etc.
    private BigDecimal effectiveRate;
    private BigDecimal taxAmount;
    private String calculationMethod;
    private String formulaExplained;
    private String status; // ESTIMATED
    private List<TaxComponentBreakdown> components;
    private TaxSourceDto source;
    private String hsnCode;
    private String sacCode;
}
