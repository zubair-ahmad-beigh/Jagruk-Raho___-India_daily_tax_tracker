package com.jagrukraho.api.tax;

import com.jagrukraho.api.dto.TaxCalculationResult;
import com.jagrukraho.api.dto.TaxComponentBreakdown;
import com.jagrukraho.api.dto.TaxSourceDto;
import com.jagrukraho.api.entity.Expense;
import com.jagrukraho.api.entity.TaxRule;
import com.jagrukraho.api.entity.TaxRuleComponent;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
public class TaxInclusiveCalculator implements TaxCalculator {

    @Override
    public boolean supports(String calculationMethod) {
        return "TAX_INCLUSIVE".equalsIgnoreCase(calculationMethod);
    }

    @Override
    public TaxCalculationResult calculate(Expense expense, TaxRule rule) {
        BigDecimal totalAmount = expense.getAmount();
        BigDecimal rate = rule.getRate();

        BigDecimal taxAmount = TaxMathUtil.calculateTaxInclusive(totalAmount, rate);

        List<TaxComponentBreakdown> components = new ArrayList<>();
        if (rule.getComponents() != null && !rule.getComponents().isEmpty()) {
            for (TaxRuleComponent comp : rule.getComponents()) {
                BigDecimal compAmount = TaxMathUtil.calculateTaxInclusive(totalAmount, comp.getRateValue());
                components.add(TaxComponentBreakdown.builder()
                        .name(comp.getComponentName())
                        .rateDisplay(comp.getRateValue().stripTrailingZeros().toPlainString() + "%")
                        .amount(compAmount)
                        .build());
            }
        } else {
            // Default split into CGST (50%) and SGST (50%) if GST
            BigDecimal half = TaxMathUtil.splitHalf(taxAmount);
            components.add(TaxComponentBreakdown.builder()
                    .name("CGST")
                    .rateDisplay(rate.divide(new BigDecimal("2")).stripTrailingZeros().toPlainString() + "%")
                    .amount(half)
                    .build());
            components.add(TaxComponentBreakdown.builder()
                    .name("SGST")
                    .rateDisplay(rate.divide(new BigDecimal("2")).stripTrailingZeros().toPlainString() + "%")
                    .amount(half)
                    .build());
        }

        TaxSourceDto sourceDto = null;
        if (rule.getSource() != null) {
            sourceDto = TaxSourceDto.builder()
                    .id(rule.getSource().getId())
                    .name(rule.getSource().getName())
                    .url(rule.getSource().getUrl())
                    .referenceNumber(rule.getSource().getReferenceNumber())
                    .retrievedAt(rule.getSource().getRetrievedAt())
                    .notes(rule.getSource().getNotes())
                    .build();
        }

        String formula = String.format("₹%,.2f × %s / (100 + %s)",
                totalAmount, rate.stripTrailingZeros().toPlainString(), rate.stripTrailingZeros().toPlainString());

        return TaxCalculationResult.builder()
                .taxRuleId(rule.getId())
                .taxType(rule.getTaxType())
                .effectiveRate(rule.getRate())
                .taxAmount(taxAmount)
                .calculationMethod("TAX_INCLUSIVE")
                .formulaExplained(formula)
                .status("ESTIMATED")
                .components(components)
                .source(sourceDto)
                .hsnCode(rule.getHsnCode())
                .sacCode(rule.getSacCode())
                .build();
    }
}
