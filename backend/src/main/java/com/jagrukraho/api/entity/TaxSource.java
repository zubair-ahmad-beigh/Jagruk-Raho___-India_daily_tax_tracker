package com.jagrukraho.api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "tax_sources")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaxSource {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, length = 500)
    private String url;

    @Column(name = "reference_number", length = 100)
    private String referenceNumber;

    @Column(name = "retrieved_at", nullable = false)
    private LocalDate retrievedAt;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "created_at", insertable = false, updatable = false)
    private ZonedDateTime createdAt;
}
