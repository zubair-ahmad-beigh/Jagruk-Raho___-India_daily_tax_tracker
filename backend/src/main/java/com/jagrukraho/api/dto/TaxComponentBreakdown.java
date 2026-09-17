package com.jagrukraho.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaxComponentBreakdown {
    private String name;
    private String rateDisplay; // e.g. "9.00%" or "₹19.90/L"
    private BigDecimal amount;
}
