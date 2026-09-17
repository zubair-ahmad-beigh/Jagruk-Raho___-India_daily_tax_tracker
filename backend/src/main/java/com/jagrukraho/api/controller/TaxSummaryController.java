package com.jagrukraho.api.controller;

import com.jagrukraho.api.dto.DailyTaxSummaryDto;
import com.jagrukraho.api.service.DailySummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.UUID;

@RestController
@RequestMapping("/api/tax")
public class TaxSummaryController {

    private final DailySummaryService dailySummaryService;

    @Autowired
    public TaxSummaryController(DailySummaryService dailySummaryService) {
        this.dailySummaryService = dailySummaryService;
    }

    @GetMapping("/today")
    public ResponseEntity<DailyTaxSummaryDto> getTodaySummary(
            @RequestParam(defaultValue = "3fa85f64-5717-4562-b3fc-2c963f66afa6") UUID userId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        LocalDate summaryDate = date != null ? date : LocalDate.now();
        DailyTaxSummaryDto summary = dailySummaryService.getDailySummary(userId, summaryDate);
        return ResponseEntity.ok(summary);
    }
}
