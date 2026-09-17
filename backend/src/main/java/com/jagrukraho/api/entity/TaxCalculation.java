package com.jagrukraho.api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "tax_calculations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaxCalculation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "expense_id", nullable = false)
    private UUID expenseId;

    @Column(name = "tax_rule_id", nullable = false)
    private UUID taxRuleId;

    @Column(name = "tax_type", nullable = false, length = 50)
    private String taxType;

    @Column(name = "effective_rate", nullable = false, precision = 7, scale = 4)
    private BigDecimal effectiveRate;

    @Column(name = "tax_amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal taxAmount;

    @Column(name = "calculation_method", nullable = false, length = 50)
    private String calculationMethod;

    @Column(name = "breakdown_json", nullable = false, columnDefinition = "TEXT")
    private String breakdownJson;

    @Column(nullable = false, length = 30)
    private String status = "ESTIMATED";

    @Column(name = "created_at", insertable = false, updatable = false)
    private ZonedDateTime createdAt;
}
