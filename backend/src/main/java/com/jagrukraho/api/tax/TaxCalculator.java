package com.jagrukraho.api.tax;

import com.jagrukraho.api.dto.TaxCalculationResult;
import com.jagrukraho.api.entity.Expense;
import com.jagrukraho.api.entity.TaxRule;

public interface TaxCalculator {
    boolean supports(String calculationMethod);
    TaxCalculationResult calculate(Expense expense, TaxRule rule);
}
