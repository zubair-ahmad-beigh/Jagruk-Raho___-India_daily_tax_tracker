package com.jagrukraho.api.repository;

import com.jagrukraho.api.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, UUID> {
    List<Expense> findByUserIdAndExpenseDateOrderByCreatedAtDesc(UUID userId, LocalDate expenseDate);
    
    List<Expense> findByUserIdAndExpenseDateBetweenOrderByExpenseDateDesc(UUID userId, LocalDate startDate, LocalDate endDate);
    
    List<Expense> findByUserIdOrderByExpenseDateDescCreatedAtDesc(UUID userId);
}
