package com.jagrukraho.api.repository;

import com.jagrukraho.api.entity.TaxRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface TaxRuleRepository extends JpaRepository<TaxRule, UUID> {

    @Query("""
        SELECT r FROM TaxRule r 
        WHERE r.categoryId = :categoryId 
          AND r.active = true 
          AND r.effectiveFrom <= :expenseDate 
          AND (r.effectiveTo IS NULL OR r.effectiveTo >= :expenseDate) 
          AND (r.state = :state OR (r.state IS NULL AND NOT EXISTS (
                SELECT s FROM TaxRule s 
                WHERE s.categoryId = :categoryId 
                  AND s.active = true 
                  AND s.state = :state 
                  AND s.effectiveFrom <= :expenseDate 
                  AND (s.effectiveTo IS NULL OR s.effectiveTo >= :expenseDate)
          )))
        ORDER BY r.minAmount DESC
    """)
    List<TaxRule> findApplicableRules(
        @Param("categoryId") String categoryId,
        @Param("state") String state,
        @Param("expenseDate") LocalDate expenseDate
    );
}
