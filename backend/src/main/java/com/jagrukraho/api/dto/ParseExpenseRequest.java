package com.jagrukraho.api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParseExpenseRequest {
    @NotBlank(message = "Raw text input is required")
    private String rawText;
    private String defaultState;
}
