package com.jagrukraho.api.repository;

import com.jagrukraho.api.entity.TaxSource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TaxSourceRepository extends JpaRepository<TaxSource, UUID> {
}
