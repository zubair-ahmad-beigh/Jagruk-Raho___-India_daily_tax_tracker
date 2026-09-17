package com.jagrukraho.api.tax;

import com.jagrukraho.api.dto.TaxCalculationResult;
import com.jagrukraho.api.dto.TaxComponentBreakdown;
import com.jagrukraho.api.dto.TaxSourceDto;
import com.jagrukraho.api.entity.Expense;
import com.jagrukraho.api.entity.TaxRule;
import com.jagrukraho.api.entity.TaxRuleComponent;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Component
public class MultiComponentCalculator implements TaxCalculator {

    private static final BigDecimal DEFAULT_PETROL_PRICE_PER_LITRE = new BigDecimal("102.50");

    @Override
    public boolean supports(String calculationMethod) {
        return "MULTI_COMPONENT".equalsIgnoreCase(calculationMethod);
    }

    @Override
    public TaxCalculationResult calculate(Expense expense, TaxRule rule) {
        BigDecimal totalAmount = expense.getAmount();
        List<TaxComponentBreakdown> components = new ArrayList<>();
        BigDecimal totalTax = BigDecimal.ZERO;

        BigDecimal quantityLitres = expense.getQuantity();
        if (quantityLitres == null || quantityLitres.compareTo(BigDecimal.ZERO) <= 0 || "unit".equalsIgnoreCase(expense.getUnit())) {
            // Estimate litres from total spending amount
            quantityLitres = totalAmount.divide(DEFAULT_PETROL_PRICE_PER_LITRE, 4, RoundingMode.HALF_UP);
        }

        BigDecimal exciseAmount = BigDecimal.ZERO;
        BigDecimal vatAmount = BigDecimal.ZERO;
        BigDecimal vatRate = BigDecimal.ZERO;

        if (rule.getComponents() != null) {
            for (TaxRuleComponent comp : rule.getComponents()) {
                if ("FLAT_PER_UNIT".equalsIgnoreCase(comp.getRateType())) {
                    // Central Excise Duty per litre
                    exciseAmount = comp.getRateValue().multiply(quantityLitres).setScale(2, RoundingMode.HALF_UP);
                    components.add(TaxComponentBreakdown.builder()
                            .name(comp.getComponentName())
                            .rateDisplay(String.format("₹%s / Litre", comp.getRateValue().stripTrailingZeros().toPlainString()))
                            .amount(exciseAmount)
                            .build());
                    totalTax = totalTax.add(exciseAmount);
                } else if ("PERCENTAGE".equalsIgnoreCase(comp.getRateType())) {
                    // State VAT % tax-inclusive formula
                    vatRate = comp.getRateValue();
                    vatAmount = TaxMathUtil.calculateTaxInclusive(totalAmount, vatRate);
                    components.add(TaxComponentBreakdown.builder()
                            .name(comp.getComponentName())
                            .rateDisplay(vatRate.stripTrailingZeros().toPlainString() + "%")
                            .amount(vatAmount)
                            .build());
                    totalTax = totalTax.add(vatAmount);
                }
            }
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

        String formula = String.format("Fuel Tax (%s): Central Excise (₹%,.2f) + State VAT (₹%,.2f) for ~%.2f Litres",
                expense.getState() != null ? expense.getState() : "Default State",
                exciseAmount, vatAmount, quantityLitres);

        BigDecimal effectiveRate = totalTax.divide(totalAmount, 4, RoundingMode.HALF_UP).multiply(new BigDecimal("100"));

        return TaxCalculationResult.builder()
                .taxRuleId(rule.getId())
                .taxType(rule.getTaxType())
                .effectiveRate(TaxMathUtil.roundCurrency(effectiveRate))
                .taxAmount(totalTax)
                .calculationMethod("MULTI_COMPONENT")
                .formulaExplained(formula)
                .status("ESTIMATED")
                .components(components)
                .source(sourceDto)
                .build();
    }
}
