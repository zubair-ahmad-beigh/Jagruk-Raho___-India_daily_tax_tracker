package com.jagrukraho.api.repository;

import com.jagrukraho.api.entity.TaxCalculation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface TaxCalculationRepository extends JpaRepository<TaxCalculation, UUID> {
    Optional<TaxCalculation> findByExpenseId(UUID expenseId);
}
