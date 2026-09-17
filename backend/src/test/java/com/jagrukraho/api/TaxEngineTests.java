package com.jagrukraho.api;

import com.jagrukraho.api.dto.TaxCalculationResult;
import com.jagrukraho.api.entity.Expense;
import com.jagrukraho.api.entity.TaxRule;
import com.jagrukraho.api.entity.TaxRuleComponent;
import com.jagrukraho.api.entity.TaxSource;
import com.jagrukraho.api.tax.MultiComponentCalculator;
import com.jagrukraho.api.tax.TaxInclusiveCalculator;
import com.jagrukraho.api.tax.TaxMathUtil;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

public class TaxEngineTests {

    @Test
    @DisplayName("Tax Inclusive Formula: ₹1,180 at 18% GST should result in exactly ₹180.00 tax")
    void testTaxInclusiveFormula() {
        BigDecimal totalAmount = new BigDecimal("1180.00");
        BigDecimal rate = new BigDecimal("18.0000");

        BigDecimal taxAmount = TaxMathUtil.calculateTaxInclusive(totalAmount, rate);

        assertThat(taxAmount).isEqualByComparingTo("180.00");
    }

    @Test
    @DisplayName("Mobile Phone ₹50,000 purchase at 18% GST")
    void testMobilePhoneTaxCalculation() {
        TaxInclusiveCalculator calculator = new TaxInclusiveCalculator();

        TaxSource source = TaxSource.builder()
                .id(UUID.randomUUID())
                .name("CBIC Notification No. 03/2020-Central Tax (Rate)")
                .url("https://cbic-gst.gov.in")
                .retrievedAt(LocalDate.now())
                .build();

        TaxRule mobileRule = TaxRule.builder()
                .id(UUID.randomUUID())
                .categoryId("mobile_phone")
                .taxType("GST")
                .rate(new BigDecimal("18.0000"))
                .calculationMethod("TAX_INCLUSIVE")
                .source(source)
                .build();

        Expense expense = Expense.builder()
                .id(UUID.randomUUID())
                .amount(new BigDecimal("50000.00"))
                .expenseDate(LocalDate.now())
                .state("Karnataka")
                .build();

        TaxCalculationResult result = calculator.calculate(expense, mobileRule);

        assertThat(result.getTaxAmount()).isEqualByComparingTo("7627.12");
        assertThat(result.getComponents()).hasSize(2);
        assertThat(result.getComponents().get(0).getName()).isEqualTo("CGST");
        assertThat(result.getComponents().get(1).getName()).isEqualTo("SGST");
    }

    @Test
    @DisplayName("Petrol Multi-Component Tax Calculation for ₹1,000 spending in Karnataka")
    void testFuelTaxCalculation() {
        MultiComponentCalculator calculator = new MultiComponentCalculator();

        TaxSource source = TaxSource.builder()
                .id(UUID.randomUUID())
                .name("PPAC Bulletin")
                .url("https://ppac.gov.in")
                .retrievedAt(LocalDate.now())
                .build();

        TaxRule fuelRule = TaxRule.builder()
                .id(UUID.randomUUID())
                .categoryId("petrol")
                .taxType("EXCISE_VAT")
                .rate(new BigDecimal("41.5000"))
                .state("Karnataka")
                .calculationMethod("MULTI_COMPONENT")
                .source(source)
                .components(List.of(
                        TaxRuleComponent.builder().componentName("CENTRAL_EXCISE").rateType("FLAT_PER_UNIT").rateValue(new BigDecimal("19.9000")).build(),
                        TaxRuleComponent.builder().componentName("KARNATAKA_VAT").rateType("PERCENTAGE").rateValue(new BigDecimal("25.9200")).build()
                ))
                .build();

        Expense expense = Expense.builder()
                .id(UUID.randomUUID())
                .amount(new BigDecimal("1000.00"))
                .expenseDate(LocalDate.now())
                .state("Karnataka")
                .unit("unit")
                .build();

        TaxCalculationResult result = calculator.calculate(expense, fuelRule);

        assertThat(result.getTaxAmount()).isGreaterThan(BigDecimal.ZERO);
        assertThat(result.getComponents()).hasSize(2);
    }
}
