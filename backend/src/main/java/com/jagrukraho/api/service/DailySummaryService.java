package com.jagrukraho.api.service;

import com.jagrukraho.api.dto.DailyTaxSummaryDto;
import com.jagrukraho.api.entity.DailyTaxSummary;
import com.jagrukraho.api.entity.Expense;
import com.jagrukraho.api.entity.TaxCalculation;
import com.jagrukraho.api.repository.DailyTaxSummaryRepository;
import com.jagrukraho.api.repository.ExpenseRepository;
import com.jagrukraho.api.repository.TaxCalculationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.*;

@Service
public class DailySummaryService {

    private final DailyTaxSummaryRepository dailyTaxSummaryRepository;
    private final ExpenseRepository expenseRepository;
    private final TaxCalculationRepository taxCalculationRepository;

    @Autowired
    public DailySummaryService(DailyTaxSummaryRepository dailyTaxSummaryRepository,
                               ExpenseRepository expenseRepository,
                               TaxCalculationRepository taxCalculationRepository) {
        this.dailyTaxSummaryRepository = dailyTaxSummaryRepository;
        this.expenseRepository = expenseRepository;
        this.taxCalculationRepository = taxCalculationRepository;
    }

    @Transactional
    public void updateDailySummary(UUID userId, LocalDate date) {
        List<Expense> dayExpenses = expenseRepository.findByUserIdAndExpenseDateOrderByCreatedAtDesc(userId, date);

        BigDecimal totalSpending = BigDecimal.ZERO;
        BigDecimal totalTax = BigDecimal.ZERO;

        for (Expense exp : dayExpenses) {
            totalSpending = totalSpending.add(exp.getAmount());
            Optional<TaxCalculation> calc = taxCalculationRepository.findByExpenseId(exp.getId());
            if (calc.isPresent()) {
                totalTax = totalTax.add(calc.get().getTaxAmount());
            }
        }

        DailyTaxSummary summary = dailyTaxSummaryRepository.findByUserIdAndSummaryDate(userId, date)
                .orElse(DailyTaxSummary.builder()
                        .userId(userId)
                        .summaryDate(date)
                        .build());

        summary.setTotalSpending(totalSpending);
        summary.setEstimatedTax(totalTax);
        summary.setExpenseCount(dayExpenses.size());

        dailyTaxSummaryRepository.save(summary);
    }

    public DailyTaxSummaryDto getDailySummary(UUID userId, LocalDate date) {
        DailyTaxSummary summary = dailyTaxSummaryRepository.findByUserIdAndSummaryDate(userId, date)
                .orElse(DailyTaxSummary.builder()
                        .userId(userId)
                        .summaryDate(date)
                        .totalSpending(BigDecimal.ZERO)
                        .estimatedTax(BigDecimal.ZERO)
                        .expenseCount(0)
                        .build());

        List<Expense> dayExpenses = expenseRepository.findByUserIdAndExpenseDateOrderByCreatedAtDesc(userId, date);

        Map<String, BigDecimal> taxTypeTotals = new HashMap<>();
        BigDecimal totalTax = summary.getEstimatedTax();

        for (Expense exp : dayExpenses) {
            Optional<TaxCalculation> calc = taxCalculationRepository.findByExpenseId(exp.getId());
            if (calc.isPresent()) {
                String type = calc.get().getTaxType();
                BigDecimal amt = calc.get().getTaxAmount();
                taxTypeTotals.put(type, taxTypeTotals.getOrDefault(type, BigDecimal.ZERO).add(amt));
            }
        }

        List<DailyTaxSummaryDto.TaxCategoryBreakdown> breakdowns = new ArrayList<>();
        for (Map.Entry<String, BigDecimal> entry : taxTypeTotals.entrySet()) {
            Double pct = totalTax.compareTo(BigDecimal.ZERO) > 0 ?
                    entry.getValue().divide(totalTax, 4, RoundingMode.HALF_UP).doubleValue() * 100.0 : 0.0;
            breakdowns.add(DailyTaxSummaryDto.TaxCategoryBreakdown.builder()
                    .taxType(entry.getKey())
                    .amount(entry.getValue())
                    .percentage(pct)
                    .build());
        }

        return DailyTaxSummaryDto.builder()
                .date(date)
                .totalSpending(summary.getTotalSpending())
                .totalEstimatedTax(summary.getEstimatedTax())
                .expenseCount(summary.getExpenseCount())
                .breakdown(breakdowns)
                .build();
    }
}
