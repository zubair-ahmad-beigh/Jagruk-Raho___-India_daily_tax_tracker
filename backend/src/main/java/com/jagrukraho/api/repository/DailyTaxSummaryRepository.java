package com.jagrukraho.api.repository;

import com.jagrukraho.api.entity.DailyTaxSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DailyTaxSummaryRepository extends JpaRepository<DailyTaxSummary, UUID> {
    Optional<DailyTaxSummary> findByUserIdAndSummaryDate(UUID userId, LocalDate summaryDate);
    
    List<DailyTaxSummary> findByUserIdAndSummaryDateBetweenOrderBySummaryDateAsc(UUID userId, LocalDate startDate, LocalDate endDate);
}
