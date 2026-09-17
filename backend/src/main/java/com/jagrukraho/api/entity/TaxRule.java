package com.jagrukraho.api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tax_rules")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaxRule {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "category_id", nullable = false, length = 50)
    private String categoryId;

    @Column(name = "hsn_code", length = 20)
    private String hsnCode;

    @Column(name = "sac_code", length = 20)
    private String sacCode;

    @Column(name = "tax_type", nullable = false, length = 50)
    private String taxType;

    @Column(nullable = false, precision = 7, scale = 4)
    private BigDecimal rate;

    @Column(length = 50)
    private String state;

    @Column(name = "calculation_method", nullable = false, length = 50)
    private String calculationMethod;

    @Column(name = "min_amount", precision = 12, scale = 2)
    private BigDecimal minAmount;

    @Column(name = "max_amount", precision = 12, scale = 2)
    private BigDecimal maxAmount;

    @Column(name = "effective_from", nullable = false)
    private LocalDate effectiveFrom;

    @Column(name = "effective_to")
    private LocalDate effectiveTo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "source_id", nullable = false)
    private TaxSource source;

    @Column(nullable = false)
    private Boolean active = true;

    @OneToMany(mappedBy = "taxRule", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @OrderBy("displayOrder ASC")
    @Builder.Default
    private List<TaxRuleComponent> components = new ArrayList<>();

    @Column(name = "created_at", insertable = false, updatable = false)
    private ZonedDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private ZonedDateTime updatedAt;
}
