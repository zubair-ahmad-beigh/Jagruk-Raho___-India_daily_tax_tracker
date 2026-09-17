package com.jagrukraho.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaxSourceDto {
    private UUID id;
    private String name;
    private String url;
    private String referenceNumber;
    private LocalDate retrievedAt;
    private String notes;
}
