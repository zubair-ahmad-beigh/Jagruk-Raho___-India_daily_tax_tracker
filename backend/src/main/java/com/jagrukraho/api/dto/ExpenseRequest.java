package com.jagrukraho.api.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseRequest {
    @NotNull(message = "User ID is required")
    private UUID userId;

    @NotNull(message = "Category ID is required")
    private String categoryId;

    @NotNull(message = "Description is required")
    private String description;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be greater than zero")
    private BigDecimal amount;

    private BigDecimal quantity;
    private String unit;

    @NotNull(message = "Expense date is required")
    private LocalDate expenseDate;

    @NotNull(message = "State is required")
    private String state;
}
