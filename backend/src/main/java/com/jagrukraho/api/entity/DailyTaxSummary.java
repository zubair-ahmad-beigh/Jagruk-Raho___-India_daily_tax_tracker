package com.jagrukraho.api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "daily_tax_summary", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "summary_date"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DailyTaxSummary {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "summary_date", nullable = false)
    private LocalDate summaryDate;

    @Column(name = "total_spending", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalSpending = BigDecimal.ZERO;

    @Column(name = "estimated_tax", nullable = false, precision = 12, scale = 2)
    private BigDecimal estimatedTax = BigDecimal.ZERO;

    @Column(name = "expense_count", nullable = false)
    private Integer expenseCount = 0;

    @Column(name = "created_at", insertable = false, updatable = false)
    private ZonedDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private ZonedDateTime updatedAt;
}
