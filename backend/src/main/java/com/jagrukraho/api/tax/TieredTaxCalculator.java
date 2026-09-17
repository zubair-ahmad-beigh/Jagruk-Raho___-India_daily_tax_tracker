package com.jagrukraho.api.tax;

import com.jagrukraho.api.dto.TaxCalculationResult;
import com.jagrukraho.api.entity.Expense;
import com.jagrukraho.api.entity.TaxRule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TieredTaxCalculator implements TaxCalculator {

    private final TaxInclusiveCalculator delegateCalculator;

    @Autowired
    public TieredTaxCalculator(TaxInclusiveCalculator delegateCalculator) {
        this.delegateCalculator = delegateCalculator;
    }

    @Override
    public boolean supports(String calculationMethod) {
        return "TIERED_AMOUNT".equalsIgnoreCase(calculationMethod);
    }

    @Override
    public TaxCalculationResult calculate(Expense expense, TaxRule rule) {
        TaxCalculationResult result = delegateCalculator.calculate(expense, rule);
        result.setCalculationMethod("TIERED_AMOUNT");
        
        String tieredFormula = String.format("Tiered Rate (%s) applied for purchase amount of ₹%,.2f: %s",
                rule.getRate().stripTrailingZeros().toPlainString() + "%",
                expense.getAmount(),
                result.getFormulaExplained());
        result.setFormulaExplained(tieredFormula);
        return result;
    }
}
