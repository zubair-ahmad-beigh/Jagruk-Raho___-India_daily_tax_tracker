package com.jagrukraho.api.tax;

import com.jagrukraho.api.dto.TaxCalculationResult;
import com.jagrukraho.api.entity.Expense;
import com.jagrukraho.api.entity.TaxRule;
import com.jagrukraho.api.repository.TaxRuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class TaxRuleResolver {

    private final TaxRuleRepository taxRuleRepository;
    private final List<TaxCalculator> calculators;

    @Autowired
    public TaxRuleResolver(TaxRuleRepository taxRuleRepository, List<TaxCalculator> calculators) {
        this.taxRuleRepository = taxRuleRepository;
        this.calculators = calculators;
    }

    public TaxCalculationResult calculateTax(Expense expense) {
        String categoryId = expense.getCategoryId();
        String state = expense.getState();
        LocalDate date = expense.getExpenseDate() != null ? expense.getExpenseDate() : LocalDate.now();

        List<TaxRule> applicableRules = taxRuleRepository.findApplicableRules(categoryId, state, date);

        if (applicableRules.isEmpty()) {
            throw new IllegalArgumentException("No active tax rule found for category: " + categoryId + " in state: " + state);
        }

        // Match tiered amount if applicable
        TaxRule matchedRule = null;
        BigDecimal amount = expense.getAmount();

        for (TaxRule rule : applicableRules) {
            if ("TIERED_AMOUNT".equalsIgnoreCase(rule.getCalculationMethod())) {
                boolean minSatisfied = rule.getMinAmount() == null || amount.compareTo(rule.getMinAmount()) >= 0;
                boolean maxSatisfied = rule.getMaxAmount() == null || amount.compareTo(rule.getMaxAmount()) <= 0;
                if (minSatisfied && maxSatisfied) {
                    matchedRule = rule;
                    break;
                }
            } else {
                matchedRule = rule;
                break;
            }
        }

        if (matchedRule == null) {
            matchedRule = applicableRules.get(0);
        }

        String method = matchedRule.getCalculationMethod();
        TaxCalculator calculator = calculators.stream()
                .filter(c -> c.supports(method))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("No calculator registered for method: " + method));

        return calculator.calculate(expense, matchedRule);
    }
}
