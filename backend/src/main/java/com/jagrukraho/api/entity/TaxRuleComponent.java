package com.jagrukraho.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "tax_rule_components")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaxRuleComponent {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tax_rule_id", nullable = false)
    @JsonIgnore
    private TaxRule taxRule;

    @Column(name = "component_name", nullable = false, length = 50)
    private String componentName;

    @Column(name = "rate_type", nullable = false, length = 20)
    private String rateType; // PERCENTAGE or FLAT_PER_UNIT

    @Column(name = "rate_value", nullable = false, precision = 10, scale = 4)
    private BigDecimal rateValue;

    @Column(name = "display_order")
    private Integer displayOrder = 1;
}
