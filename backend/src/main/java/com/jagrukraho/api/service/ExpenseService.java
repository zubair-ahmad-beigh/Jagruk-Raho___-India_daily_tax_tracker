package com.jagrukraho.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jagrukraho.api.dto.ExpenseRequest;
import com.jagrukraho.api.dto.ExpenseResponse;
import com.jagrukraho.api.dto.TaxCalculationResult;
import com.jagrukraho.api.entity.Category;
import com.jagrukraho.api.entity.Expense;
import com.jagrukraho.api.entity.TaxCalculation;
import com.jagrukraho.api.repository.CategoryRepository;
import com.jagrukraho.api.repository.ExpenseRepository;
import com.jagrukraho.api.repository.TaxCalculationRepository;
import com.jagrukraho.api.tax.TaxRuleResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;
    private final TaxCalculationRepository taxCalculationRepository;
    private final TaxRuleResolver taxRuleResolver;
    private final DailySummaryService dailySummaryService;
    private final ObjectMapper objectMapper;

    @Autowired
    public ExpenseService(ExpenseRepository expenseRepository,
                          CategoryRepository categoryRepository,
                          TaxCalculationRepository taxCalculationRepository,
                          TaxRuleResolver taxRuleResolver,
                          DailySummaryService dailySummaryService,
                          ObjectMapper objectMapper) {
        this.expenseRepository = expenseRepository;
        this.categoryRepository = categoryRepository;
        this.taxCalculationRepository = taxCalculationRepository;
        this.taxRuleResolver = taxRuleResolver;
        this.dailySummaryService = dailySummaryService;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public ExpenseResponse createExpense(ExpenseRequest request) {
        Expense expense = Expense.builder()
                .userId(request.getUserId())
                .categoryId(request.getCategoryId())
                .description(request.getDescription())
                .amount(request.getAmount())
                .quantity(request.getQuantity() != null ? request.getQuantity() : java.math.BigDecimal.ONE)
                .unit(request.getUnit() != null ? request.getUnit() : "unit")
                .expenseDate(request.getExpenseDate())
                .state(request.getState())
                .build();

        Expense savedExpense = expenseRepository.save(expense);

        // Perform Tax Calculation via Engine
        TaxCalculationResult taxResult = taxRuleResolver.calculateTax(savedExpense);

        String breakdownJson = "";
        try {
            breakdownJson = objectMapper.writeValueAsString(taxResult.getComponents());
        } catch (JsonProcessingException e) {
            breakdownJson = "[]";
        }

        TaxCalculation calculation = TaxCalculation.builder()
                .expenseId(savedExpense.getId())
                .taxRuleId(taxResult.getTaxRuleId())
                .taxType(taxResult.getTaxType())
                .effectiveRate(taxResult.getEffectiveRate())
                .taxAmount(taxResult.getTaxAmount())
                .calculationMethod(taxResult.getCalculationMethod())
                .breakdownJson(breakdownJson)
                .status("ESTIMATED")
                .build();

        taxCalculationRepository.save(calculation);

        // Update Daily Aggregates
        dailySummaryService.updateDailySummary(savedExpense.getUserId(), savedExpense.getExpenseDate());

        return mapToResponse(savedExpense, taxResult);
    }

    public List<ExpenseResponse> getExpensesForUser(UUID userId) {
        List<Expense> expenses = expenseRepository.findByUserIdOrderByExpenseDateDescCreatedAtDesc(userId);
        List<ExpenseResponse> responses = new ArrayList<>();
        for (Expense exp : expenses) {
            Optional<TaxCalculation> calcOpt = taxCalculationRepository.findByExpenseId(exp.getId());
            TaxCalculationResult result = null;
            if (calcOpt.isPresent()) {
                TaxCalculation calc = calcOpt.get();
                result = TaxCalculationResult.builder()
                        .calculationId(calc.getId())
                        .taxRuleId(calc.getTaxRuleId())
                        .taxType(calc.getTaxType())
                        .effectiveRate(calc.getEffectiveRate())
                        .taxAmount(calc.getTaxAmount())
                        .calculationMethod(calc.getCalculationMethod())
                        .status(calc.getStatus())
                        .build();
            }
            responses.add(mapToResponse(exp, result));
        }
        return responses;
    }

    @Transactional
    public void deleteExpense(UUID expenseId) {
        Optional<Expense> expOpt = expenseRepository.findById(expenseId);
        if (expOpt.isPresent()) {
            Expense exp = expOpt.get();
            expenseRepository.deleteById(expenseId);
            dailySummaryService.updateDailySummary(exp.getUserId(), exp.getExpenseDate());
        }
    }

    private ExpenseResponse mapToResponse(Expense expense, TaxCalculationResult taxResult) {
        String categoryName = categoryRepository.findById(expense.getCategoryId())
                .map(Category::getName)
                .orElse(expense.getCategoryId());

        return ExpenseResponse.builder()
                .expenseId(expense.getId())
                .userId(expense.getUserId())
                .categoryId(expense.getCategoryId())
                .categoryName(categoryName)
                .description(expense.getDescription())
                .amount(expense.getAmount())
                .quantity(expense.getQuantity())
                .unit(expense.getUnit())
                .expenseDate(expense.getExpenseDate())
                .state(expense.getState())
                .createdAt(expense.getCreatedAt())
                .taxResult(taxResult)
                .build();
    }
}
