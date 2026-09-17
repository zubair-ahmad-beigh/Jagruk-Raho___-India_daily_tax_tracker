package com.jagrukraho.api.controller;

import com.jagrukraho.api.entity.TaxRule;
import com.jagrukraho.api.repository.TaxRuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tax-rules")
public class TaxRuleController {

    private final TaxRuleRepository taxRuleRepository;

    @Autowired
    public TaxRuleController(TaxRuleRepository taxRuleRepository) {
        this.taxRuleRepository = taxRuleRepository;
    }

    @GetMapping
    public ResponseEntity<List<TaxRule>> getTaxRules() {
        return ResponseEntity.ok(taxRuleRepository.findAll());
    }
}
