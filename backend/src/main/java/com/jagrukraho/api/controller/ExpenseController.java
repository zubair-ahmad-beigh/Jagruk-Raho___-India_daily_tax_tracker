package com.jagrukraho.api.controller;

import com.jagrukraho.api.dto.ExpenseRequest;
import com.jagrukraho.api.dto.ExpenseResponse;
import com.jagrukraho.api.dto.ParseExpenseRequest;
import com.jagrukraho.api.dto.ParseExpenseResponse;
import com.jagrukraho.api.service.ExpenseService;
import com.jagrukraho.api.service.GeminiParsingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;
    private final GeminiParsingService geminiParsingService;

    @Autowired
    public ExpenseController(ExpenseService expenseService, GeminiParsingService geminiParsingService) {
        this.expenseService = expenseService;
        this.geminiParsingService = geminiParsingService;
    }

    @PostMapping
    public ResponseEntity<ExpenseResponse> createExpense(@Valid @RequestBody ExpenseRequest request) {
        ExpenseResponse response = expenseService.createExpense(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ExpenseResponse>> getExpenses(@RequestParam(defaultValue = "3fa85f64-5717-4562-b3fc-2c963f66afa6") UUID userId) {
        List<ExpenseResponse> responses = expenseService.getExpensesForUser(userId);
        return ResponseEntity.ok(responses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable UUID id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/parse")
    public ResponseEntity<ParseExpenseResponse> parseExpense(@Valid @RequestBody ParseExpenseRequest request) {
        ParseExpenseResponse response = geminiParsingService.parseExpense(request);
        return ResponseEntity.ok(response);
    }
}
